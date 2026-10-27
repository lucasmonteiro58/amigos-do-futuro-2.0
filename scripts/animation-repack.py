"""Losslessly repacks the canvas animation spritesheets in src/assets/animations.

Each frame is trimmed to its visible (non transparent) area and identical frames are stored
once, then everything is packed into a sheet whose sides stay within MAX_SIDE when possible. The JSON keeps the
TexturePacker format (trimmed/spriteSourceSize/sourceSize) that BaseAnimation understands,
and the result is checked pixel by pixel against the original frames before being written.

Usage: python3 scripts/animation-repack.py [animation dirs...]   (requires Pillow)
Afterwards run `oxipng -o max --strip safe` on the sheets to restore palette compression.
"""
import glob
import hashlib
import json
import os
import sys

from PIL import Image

Image.MAX_IMAGE_PIXELS = None
MAX_SIDE = 4096
PADDING = 2


def crop(image, rect):
    return image.crop((rect['x'], rect['y'], rect['x'] + rect['w'], rect['y'] + rect['h']))


def shelf_pack(sizes):
    """Shelf packing tried at several sheet widths. Prefers sheets whose largest side fits
    in MAX_SIDE (a GPU texture limit), then the smallest area."""
    widest = max(w for w, _ in sizes)
    candidates = [shelf_pack_at(sizes, width) for width in range(widest, 2 * MAX_SIDE + 1, 16)]
    return min(candidates, key=lambda c: (max(max(c[1]), MAX_SIDE), c[1][0] * c[1][1]))


def shelf_pack_at(sizes, max_width):
    """Places (w, h) boxes in rows, tallest first. Returns positions and sheet size."""
    order = sorted(range(len(sizes)), key=lambda i: -sizes[i][1])
    positions = [None] * len(sizes)
    x = y = row_height = width = 0
    for i in order:
        w, h = sizes[i]
        if x and x + w > max_width:
            y += row_height + PADDING
            x = row_height = 0
        positions[i] = (x, y)
        x += w + PADDING
        width = max(width, x - PADDING)
        row_height = max(row_height, h)
    return positions, (width, y + row_height)


def repack(directory):
    png_path = os.path.join(directory, 'sprite.png')
    json_path = os.path.join(directory, 'sprite.json')
    data = json.load(open(json_path))
    source_sheet = Image.open(png_path)
    sheet = source_sheet.convert('RGBA')
    # palette sheets are repacked with the same palette indices, so the PNG stays small
    paletted = source_sheet.mode == 'P'
    pixels = source_sheet if paletted else sheet

    originals = []
    unique = {}
    for frame in data['frames']:
        if frame.get('rotated') or frame.get('trimmed'):
            print(f'  skipped {directory}: already trimmed or rotated frames')
            return
        image = crop(sheet, frame['frame'])
        originals.append(image)
        box = image.getchannel('A').getbbox() or (0, 0, 1, 1)
        trimmed = crop(pixels, frame['frame']).crop(box)
        key = hashlib.md5(trimmed.tobytes() + repr(box).encode()).hexdigest()
        unique.setdefault(key, (trimmed, box))
        frame['_key'] = key

    keys = list(unique)
    positions, size = shelf_pack([unique[k][0].size for k in keys])
    if paletted:
        packed = Image.new('P', size, transparent_index(source_sheet))
        packed.putpalette(source_sheet.getpalette())
        packed.info['transparency'] = source_sheet.info['transparency']
    else:
        packed = Image.new('RGBA', size, (0, 0, 0, 0))
    placed = {}
    for key, (x, y) in zip(keys, positions):
        packed.paste(unique[key][0], (x, y))
        placed[key] = (x, y)

    for frame, original in zip(data['frames'], originals):
        key = frame.pop('_key')
        image, box = unique[key]
        x, y = placed[key]
        w, h = image.size
        source = {'w': original.width, 'h': original.height}
        frame['frame'] = {'x': x, 'y': y, 'w': w, 'h': h}
        frame['trimmed'] = True
        frame['spriteSourceSize'] = {'x': box[0], 'y': box[1], 'w': w, 'h': h}
        frame['sourceSize'] = source

        rebuilt = Image.new('RGBA', original.size, (0, 0, 0, 0))
        rebuilt.paste(crop(packed, frame['frame']).convert('RGBA'), (box[0], box[1]))
        # fully transparent pixels may differ only in their (invisible) color channels
        if rebuilt.tobytes() != original.tobytes() and not same_visible(rebuilt, original):
            raise SystemExit(f'pixel mismatch in {directory} {frame["filename"]}')

    before = sheet.width * sheet.height
    if size[0] * size[1] >= before or max(size) > max(sheet.size):
        print(f'  kept {directory}: repacking would not make it smaller')
        return
    data.setdefault('meta', {})['size'] = {'w': size[0], 'h': size[1]}
    packed.save(png_path, optimize=True, **({'transparency': packed.info['transparency']} if paletted else {}))
    json.dump(data, open(json_path, 'w'), indent=1)
    print(f'  {directory}: {sheet.size} -> {size}, {len(data["frames"])} frames / {len(keys)} unique, '
          f'{100 * size[0] * size[1] / before:.0f}% of the pixels')


def transparent_index(image):
    transparency = image.info['transparency']
    if isinstance(transparency, int):
        return transparency
    return next(i for i, alpha in enumerate(transparency) if alpha == 0)


def same_visible(a, b):
    for pa, pb in zip(a.get_flattened_data(), b.get_flattened_data()):
        if pa != pb and not (pa[3] == 0 and pb[3] == 0):
            return False
    return True


if __name__ == '__main__':
    dirs = sys.argv[1:] or sorted(
        os.path.dirname(p) for p in glob.glob('src/assets/animations/**/sprite.json', recursive=True)
    )
    for d in dirs:
        repack(d)
