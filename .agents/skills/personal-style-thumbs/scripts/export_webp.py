from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageOps


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Resize a selected candidate and export an optimized WebP."
    )
    parser.add_argument("--input", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--width", type=int, default=1440)
    parser.add_argument("--height", type=int, default=810)
    parser.add_argument("--quality", type=int, default=82)
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    if args.width <= 0 or args.height <= 0:
        raise SystemExit("Width and height must be positive integers.")
    if not 1 <= args.quality <= 100:
        raise SystemExit("Quality must be between 1 and 100.")
    if not args.input.is_file():
        raise SystemExit(f"Input file does not exist: {args.input}")

    with Image.open(args.input) as source:
        image = ImageOps.exif_transpose(source)
        source_ratio = image.width / image.height
        target_ratio = args.width / args.height
        ratio_error = abs(source_ratio - target_ratio) / target_ratio
        if ratio_error > 0.01:
            raise SystemExit(
                "Input aspect ratio does not match the requested output. "
                "Regenerate the candidate or agree on a crop before export."
            )
        if image.width < args.width or image.height < args.height:
            raise SystemExit(
                "Input is smaller than the requested output. Regenerate at a "
                "larger size instead of upscaling."
            )

        flattened = Image.new("RGB", image.size, "white")
        if image.mode in {"RGBA", "LA"} or "transparency" in image.info:
            alpha_source = image.convert("RGBA")
            flattened.paste(alpha_source, mask=alpha_source.getchannel("A"))
        else:
            flattened.paste(image.convert("RGB"))

        resized = flattened.resize((args.width, args.height), Image.Resampling.LANCZOS)
        args.output.parent.mkdir(parents=True, exist_ok=True)
        resized.save(
            args.output,
            format="WEBP",
            quality=args.quality,
            method=6,
            optimize=True,
        )

    with Image.open(args.output) as result:
        result.verify()
    with Image.open(args.output) as result:
        if result.size != (args.width, args.height):
            raise SystemExit("Export validation failed: unexpected dimensions.")

    print(
        f"Exported {args.output} at {args.width}x{args.height}, "
        f"{args.output.stat().st_size} bytes"
    )


if __name__ == "__main__":
    main()
