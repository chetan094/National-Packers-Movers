"""
update_supabase_gallery_srcs.py
Updates every gallery_images record in Supabase from old filename → new filename.
Run once only.
"""
import urllib.request
import json
import time

SUPABASE_URL = "https://sgsaucmxuztrmtiojksa.supabase.co"
ANON_KEY     = "sb_publishable_tRQxgxH3vLbRJkAXdWVk9w_hPqGG3I7"

# Complete old → new mapping (same as rename_gallery_photos.py)
RENAME_MAP = {
    "/photos/shifting-packing-sofa.jpg":                         "/photos/premium-cushion-sofa-wrapping.jpg",
    "/photos/shifting-truck-loading.jpg":                         "/photos/safe-container-vehicle-loading.jpg",
    "/photos/shifting-office-move.jpg":                           "/photos/seamless-corporate-office-shifting.jpg",
    "/photos/shifting-car-carrier.jpg":                           "/photos/safe-car-carrier-shifting.jpg",
    "/photos/shifting-warehouse-racks.jpg":                       "/photos/palletized-storage-warehousing.jpg",
    "/photos/shifting-packaging-boxes.jpg":                       "/photos/waterproof-cardboard-packaging.jpg",
    "/photos/shifting-kitchen-wrapping.jpg":                      "/photos/fragile-kitchenware-wrapping.jpg",
    "/photos/shifting-furniture-reassembly.jpg":                  "/photos/destination-bed-reassembly.jpg",
    "/photos/shifting-team-loading.jpg":                          "/photos/team-loading-operations.jpg",
    "/photos/shifting-crew-uniform.jpg":                          "/photos/uniform-packing-crew.jpg",
    "/photos/shifting-truck-side.jpg":                            "/photos/gps-tracked-container-fleet.jpg",
    "/photos/shifting-heavy-furniture.jpg":                       "/photos/heavy-furniture-shifting.jpg",
    "/photos/shifting-safe-transport.jpg":                        "/photos/secure-cargo-stacking-layout.jpg",
    "/photos/shifting-double-packing.jpg":                        "/photos/dual-layer-bubble-wrapping.jpg",
    "/photos/shifting-apartment-shift.jpg":                       "/photos/apartment-residential-relocation.jpg",
    "/photos/shifting-doorstep-delivery.jpg":                     "/photos/doorstep-unloading-setup.jpg",
    "/photos/bike-packing.jpg":                                   "/photos/bike-relocation-packing.jpg",
    "/photos/img-20230911-wa0002.jpg":                            "/photos/national-logistics-transit.jpg",
    "/photos/img-20231005-wa0049.jpg":                            "/photos/national-packing-operations.jpg",
    "/photos/img-20250121-wa0024.jpg":                            "/photos/relocation-packing-standards.jpg",
    "/photos/img-20250121-wa0031.jpg":                            "/photos/cargo-loading-dispatch.jpg",
    "/photos/img-20250121-wa0033.jpg":                            "/photos/container-loading-process.jpg",
    "/photos/img-20250121-wa0035.jpg":                            "/photos/multi-layer-packing-process.jpg",
    "/photos/img-20250121-wa0036.jpg":                            "/photos/goods-dispatch-transit.jpg",
    "/photos/img-20250714-wa0024.jpg":                            "/photos/national-shifting-crew.jpg",
    "/photos/img-20250714-wa0025.jpg":                            "/photos/secure-shifting-operations.jpg",
    "/photos/img-20250717-wa0018.jpg":                            "/photos/direct-container-loading.jpg",
    "/photos/img-20250725-wa0015.jpg":                            "/photos/household-goods-packing.jpg",
    "/photos/img-20250806-wa0009.jpg":                            "/photos/direct-route-dispatch.jpg",
    "/photos/img-20250807-wa0027.jpg":                            "/photos/doorstep-relocation-setup.jpg",
    "/photos/img-20251118-wa0029.jpg":                            "/photos/premium-wrapping-materials.jpg",
    "/photos/img-20251231-wa0020.jpg":                            "/photos/safe-warehousing-facilities.jpg",
    "/photos/img-20260309-wa0012.jpg":                            "/photos/gps-cargo-container-fleet.jpg",
    "/photos/img-20260309-wa0013.jpg":                            "/photos/furniture-wrapping-process.jpg",
    "/photos/img-20260309-wa0018.jpg":                            "/photos/highway-transit-stacking.jpg",
    "/photos/img-20260309-wa0025.jpg":                            "/photos/doorstep-offloading-crew.jpg",
    "/photos/img-20260309-wa0028.jpg":                            "/photos/heavy-duty-box-wrapping.jpg",
    "/photos/img-20260309-wa0030.jpg":                            "/photos/national-relocation-services.jpg",
    "/photos/img20260222143558.jpg":                              "/photos/palletized-storage-system.jpg",
    "/photos/img20260222144818_01.jpg":                           "/photos/secure-warehouse-racking.jpg",
    "/photos/img20260222160629.jpg":                              "/photos/national-cargo-operations.jpg",
    "/photos/img20260411150250.jpg":                              "/photos/highway-container-loading.jpg",
    "/photos/img20260411151841.jpg":                              "/photos/national-dispatch-teams.jpg",
    "/photos/img20260411152042.jpg":                              "/photos/interstate-cargo-relocation.jpg",
    "/photos/img20260428145155.jpg":                              "/photos/gps-shifting-fleet.jpg",
    "/photos/img20260428204927.jpg":                              "/photos/direct-interstate-shipping.jpg",
    "/photos/img_20260322_124603.jpg":                            "/photos/safe-packaging-process.jpg",
    "/photos/img_9473.jpg":                                       "/photos/loading-cargo-operations.jpg",
    "/photos/whatsapp-image-2023-09-12-at-16.40.34.jpg":          "/photos/secure-vehicle-carrier.jpg",
    "/photos/whatsapp-image-2025-11-22-at-09.09.14_f0cbaab8.jpg": "/photos/fragile-packing-standards.jpg",
}

HEADERS = {
    "apikey": ANON_KEY,
    "Authorization": f"Bearer {ANON_KEY}",
    "Content-Type": "application/json",
}

def supabase_request(method, path, data=None):
    url = f"{SUPABASE_URL}{path}"
    body = json.dumps(data).encode("utf-8") if data else None
    req = urllib.request.Request(url, data=body, headers=HEADERS, method=method)
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode("utf-8"))

def patch_record(record_id, new_src):
    url = f"{SUPABASE_URL}/rest/v1/gallery_images?id=eq.{record_id}"
    body = json.dumps({"src": new_src}).encode("utf-8")
    headers = dict(HEADERS)
    headers["Prefer"] = "return=representation"
    req = urllib.request.Request(url, data=body, headers=headers, method="PATCH")
    with urllib.request.urlopen(req) as resp:
        return resp.status

print("=" * 60)
print("Supabase gallery_images src update script")
print("=" * 60)

# Step 1: Fetch all records
print("\nFetching all gallery_images records...")
records = supabase_request("GET", "/rest/v1/gallery_images?select=id,src&order=display_order.asc")
print(f"Found {len(records)} records.\n")

updated   = 0
skipped   = 0
not_found = 0

for rec in records:
    rec_id  = rec["id"]
    old_src = rec["src"]

    # Skip if it's already a full URL (Supabase CDN or external)
    if old_src.startswith("http"):
        print(f"  SKIP (external URL): {old_src[:80]}")
        skipped += 1
        continue

    if old_src in RENAME_MAP:
        new_src = RENAME_MAP[old_src]
        status = patch_record(rec_id, new_src)
        print(f"  OK  {old_src}  ->  {new_src}")
        updated += 1
        time.sleep(0.05)  # small delay to avoid rate limit
    else:
        print(f"  NO MAP: {old_src}")
        not_found += 1

print()
print(f"Done. Updated: {updated} | Skipped (external): {skipped} | No mapping: {not_found}")
