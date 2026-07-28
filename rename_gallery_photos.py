"""
rename_gallery_photos.py
Renames all gallery photos in /public/photos/ from cryptic filenames
to SEO-friendly slugs based on their title in GalleryGrid.js
"""
import os
import shutil

PHOTOS_DIR = r"d:\NPM-Website\npm-website\public\photos"

# Complete mapping: old filename → new slug filename (preserving extension)
RENAME_MAP = {
    "shifting-packing-sofa.jpg":                          "premium-cushion-sofa-wrapping.jpg",
    "shifting-truck-loading.jpg":                          "safe-container-vehicle-loading.jpg",
    "shifting-office-move.jpg":                            "seamless-corporate-office-shifting.jpg",
    "shifting-car-carrier.jpg":                            "safe-car-carrier-shifting.jpg",
    "shifting-warehouse-racks.jpg":                        "palletized-storage-warehousing.jpg",
    "shifting-packaging-boxes.jpg":                        "waterproof-cardboard-packaging.jpg",
    "shifting-kitchen-wrapping.jpg":                       "fragile-kitchenware-wrapping.jpg",
    "shifting-furniture-reassembly.jpg":                   "destination-bed-reassembly.jpg",
    "shifting-team-loading.jpg":                           "team-loading-operations.jpg",
    "shifting-crew-uniform.jpg":                           "uniform-packing-crew.jpg",
    "shifting-truck-side.jpg":                             "gps-tracked-container-fleet.jpg",
    "shifting-heavy-furniture.jpg":                        "heavy-furniture-shifting.jpg",
    "shifting-safe-transport.jpg":                         "secure-cargo-stacking-layout.jpg",
    "shifting-double-packing.jpg":                         "dual-layer-bubble-wrapping.jpg",
    "shifting-apartment-shift.jpg":                        "apartment-residential-relocation.jpg",
    "shifting-doorstep-delivery.jpg":                      "doorstep-unloading-setup.jpg",
    "bike-packing.jpg":                                    "bike-relocation-packing.jpg",
    "img-20230911-wa0002.jpg":                             "national-logistics-transit.jpg",
    "img-20231005-wa0049.jpg":                             "national-packing-operations.jpg",
    "img-20250121-wa0024.jpg":                             "relocation-packing-standards.jpg",
    "img-20250121-wa0031.jpg":                             "cargo-loading-dispatch.jpg",
    "img-20250121-wa0033.jpg":                             "container-loading-process.jpg",
    "img-20250121-wa0035.jpg":                             "multi-layer-packing-process.jpg",
    "img-20250121-wa0036.jpg":                             "goods-dispatch-transit.jpg",
    "img-20250714-wa0024.jpg":                             "national-shifting-crew.jpg",
    "img-20250714-wa0025.jpg":                             "secure-shifting-operations.jpg",
    "img-20250717-wa0018.jpg":                             "direct-container-loading.jpg",
    "img-20250725-wa0015.jpg":                             "household-goods-packing.jpg",
    "img-20250806-wa0009.jpg":                             "direct-route-dispatch.jpg",
    "img-20250807-wa0027.jpg":                             "doorstep-relocation-setup.jpg",
    "img-20251118-wa0029.jpg":                             "premium-wrapping-materials.jpg",
    "img-20251231-wa0020.jpg":                             "safe-warehousing-facilities.jpg",
    "img-20260309-wa0012.jpg":                             "gps-cargo-container-fleet.jpg",
    "img-20260309-wa0013.jpg":                             "furniture-wrapping-process.jpg",
    "img-20260309-wa0018.jpg":                             "highway-transit-stacking.jpg",
    "img-20260309-wa0025.jpg":                             "doorstep-offloading-crew.jpg",
    "img-20260309-wa0028.jpg":                             "heavy-duty-box-wrapping.jpg",
    "img-20260309-wa0030.jpg":                             "national-relocation-services.jpg",
    "img20260222143558.jpg":                               "palletized-storage-system.jpg",
    "img20260222144818_01.jpg":                            "secure-warehouse-racking.jpg",
    "img20260222160629.jpg":                               "national-cargo-operations.jpg",
    "img20260411150250.jpg":                               "highway-container-loading.jpg",
    "img20260411151841.jpg":                               "national-dispatch-teams.jpg",
    "img20260411152042.jpg":                               "interstate-cargo-relocation.jpg",
    "img20260428145155.jpg":                               "gps-shifting-fleet.jpg",
    "img20260428204927.jpg":                               "direct-interstate-shipping.jpg",
    "img_20260322_124603.jpg":                             "safe-packaging-process.jpg",
    "img_9473.jpg":                                        "loading-cargo-operations.jpg",
    "whatsapp-image-2023-09-12-at-16.40.34.jpg":           "secure-vehicle-carrier.jpg",
    "whatsapp-image-2025-11-22-at-09.09.14_f0cbaab8.jpg":  "fragile-packing-standards.jpg",
}

print("=" * 60)
print("NPM Gallery Photo Rename Script")
print("=" * 60)

renamed = 0
skipped = 0
not_found = 0

for old_name, new_name in RENAME_MAP.items():
    old_path = os.path.join(PHOTOS_DIR, old_name)
    new_path = os.path.join(PHOTOS_DIR, new_name)

    if not os.path.exists(old_path):
        print(f"  NOT FOUND: {old_name}")
        not_found += 1
        continue

    if os.path.exists(new_path):
        print(f"  SKIP (already exists): {new_name}")
        skipped += 1
        continue

    os.rename(old_path, new_path)
    print(f"  OK  {old_name}  ->  {new_name}")
    renamed += 1

print()
print(f"Done. Renamed: {renamed} | Skipped: {skipped} | Not found: {not_found}")
