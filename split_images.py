from PIL import Image
import os

def crop_and_save():
    img_path = r'C:\Users\dash9\.gemini\antigravity\brain\33a42cd6-3672-4dbf-aec8-e5c0a4c1a282\media__1771685403821.png'
    assets_dir = r'C:\Users\dash9\.gemini\antigravity\scratch\auto-dev\life-loss\assets'
    
    if not os.path.exists(assets_dir):
        os.makedirs(assets_dir)
        
    img = Image.open(img_path)
    
    # Icon (Left square)
    # Estimated: x: 95-315, y: 300-520
    icon = img.crop((95, 300, 315, 520))
    icon.save(os.path.join(assets_dir, 'hourglass_spirit.png'))
    
    # Favicon (Middle small)
    # Estimated: x: 390-460, y: 420-490
    favicon = img.crop((390, 420, 460, 490))
    favicon.save(os.path.join(assets_dir, 'favicon.png'))
    
    # OG Image (Right rectangle)
    # Estimated: x: 545-360, y: 360-520 -> Wait, 545 to 905
    og = img.crop((545, 360, 905, 520))
    og.save(os.path.join(assets_dir, 'og_image.png'))
    
    print("Files saved to:", assets_dir)

if __name__ == "__main__":
    crop_and_save()
