import os
from PIL import Image

def compress_image(file_path, max_width, quality=83):
    try:
        orig_size = os.path.getsize(file_path)
        with Image.open(file_path) as img:
            fmt = img.format
            
            # Check if resize is needed
            if img.width > max_width:
                ratio = max_width / float(img.width)
                new_height = int(float(img.height) * float(ratio))
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            
            # Save based on format
            if fmt == 'JPEG' or file_path.lower().endswith(('.jpg', '.jpeg')):
                if img.mode in ('RGBA', 'P', 'LA'):
                    img = img.convert('RGB')
                img.save(file_path, 'JPEG', quality=quality, optimize=True)
            elif fmt == 'PNG' or file_path.lower().endswith('.png'):
                if img.mode == 'RGBA':
                    img.save(file_path, 'PNG', optimize=True)
                else:
                    img = img.convert('P', palette=Image.Palette.ADAPTIVE, colors=256)
                    img.save(file_path, 'PNG', optimize=True)
            elif fmt == 'WEBP' or file_path.lower().endswith('.webp'):
                img.save(file_path, 'WEBP', quality=quality, method=6)
                
        new_size = os.path.getsize(file_path)
        reduction = (orig_size - new_size) / orig_size * 100
        print(f"Compressed {os.path.basename(file_path)}: {orig_size/1024:.1f}KB -> {new_size/1024:.1f}KB ({reduction:.1f}% saved)")
    except Exception as e:
        print(f"Error compressing {file_path}: {e}")

# Directories to process
target_dirs = [
    (r"d:\NPM-Website\npm-website\public\photos", 1200),
    (r"d:\NPM-Website\npm-website\public\photos\raw_backup", 1200),
    (r"d:\NPM-Website\npm-website\public\images", 1600),
    (r"d:\NPM-Website\npm-website\public\images\branches", 1600)
]

print("Starting global image compression script...")
for directory, max_width in target_dirs:
    if not os.path.exists(directory):
        print(f"Directory {directory} does not exist. Skipping.")
        continue
    print(f"\nProcessing directory: {directory} (Max Width: {max_width}px)")
    for filename in os.listdir(directory):
        if filename.lower() in ('logo.png', 'file.svg', 'globe.svg', 'next.svg', 'vercel.svg', 'window.svg'):
            continue
        file_path = os.path.join(directory, filename)
        if os.path.isdir(file_path):
            continue
        ext = os.path.splitext(filename)[1].lower()
        if ext in ('.jpg', '.jpeg', '.png', '.webp'):
            compress_image(file_path, max_width)

print("\nAll target images compressed successfully!")
