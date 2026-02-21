from PIL import Image, ImageChops
import os

def crop_content(img, bbox):
    # img: PIL Image
    # bbox: (left, top, right, bottom)
    section = img.crop(bbox)
    # Find bounding box of non-white content in the section
    bg = Image.new(section.mode, section.size, (255, 255, 255))
    diff = ImageChops.difference(section, bg)
    content_bbox = diff.getbbox()
    if content_bbox:
        # Avoid cropping the text label if possible by limiting the height
        # Labels are usually at the bottom of the content
        new_bbox = (content_bbox[0], content_bbox[1], content_bbox[2], content_bbox[3] - 40)
        if new_bbox[3] > new_bbox[1]:
            return section.crop(new_bbox)
    return section

def auto_split():
    img_path = r'C:\Users\dash9\.gemini\antigravity\brain\33a42cd6-3672-4dbf-aec8-e5c0a4c1a282\media__1771685403821.png'
    assets_dir = r'C:\Users\dash9\.gemini\antigravity\scratch\auto-dev\life-loss\assets'
    
    img = Image.open(img_path).convert("RGB")
    w, h = img.size
    
    # Define broad regions
    regions = [
        ('hourglass_spirit.png', (50, 200, 350, 550)),
        ('favicon.png', (380, 400, 480, 520)),
        ('og_image.png', (520, 300, 950, 550))
    ]
    
    for filename, bbox in regions:
        section = img.crop(bbox)
        # Better: find non-white content
        bg = Image.new(section.mode, section.size, (255, 255, 255))
        diff = ImageChops.difference(section, bg)
        # Increase threshold to ignore subtle artifacts
        diff = diff.point(lambda p: p if p > 30 else 0)
        content_bbox = diff.getbbox()
        if content_bbox:
            # The labels are at the bottom. We want to stop before the text starts.
            # The text is usually a separate cluster of pixels below the main image.
            # We'll crop the top part of the bounding box.
            # Based on previous view, the text starts near the bottom of the current crops.
            # Let's crop the bottom 15% of the content bbox which is likely the label.
            height = content_bbox[3] - content_bbox[1]
            crop_h = int(height * 0.82) # Keep top 82%
            final_bbox = (content_bbox[0], content_bbox[1], content_bbox[2], content_bbox[1] + crop_h)
            cropped = section.crop(final_bbox)
            cropped.save(os.path.join(assets_dir, filename))
            print(f"Saved {filename} with bbox {final_bbox}")

if __name__ == "__main__":
    auto_split()
