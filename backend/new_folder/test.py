import cv2
import time
import numpy as np
import requests
from ultralytics import YOLO

PIXELS_PER_MM = 6

def classify_size(diameter_mm: float) -> str:
    if diameter_mm < 40.0:
        return "Small"
    elif 40.0 <= diameter_mm <= 60.0:
        return "Medium"
    else:
        return "Large"

model = YOLO("best.pt")

# --- THE URL LOGIC ---
image_url = "https://res.cloudinary.com/dxfbqi5zp/image/upload/v1789142453/images.jpg"
print(f"Downloading image from: {image_url}")

response = requests.get(image_url)
image_array = np.asarray(bytearray(response.content), dtype=np.uint8)
image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

results = model.predict(source=image, conf=0.25, iou=0.40, imgsz=1024, agnostic_nms=True)

print("\n--- GRADING RESULTS ---")

for r in results:
    for box in r.boxes:
        x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
        
        width_px = x2 - x1
        height_px = y2 - y1
        diameter_px = max(width_px, height_px)
        diameter_mm = diameter_px / PIXELS_PER_MM
        
        size_category = classify_size(diameter_mm)
        
        cls_id = int(box.cls[0])
        raw_name = model.names[cls_id].upper()
        if "HANH_TAY" in raw_name or "HEALTHY" in raw_name:
            raw_name = "HEALTHY"
            
        label = f"{raw_name} | {size_category} ({diameter_mm:.1f}mm)"
        print(f"Detected: {label}")
        
        box_color = (150, 0, 0) 
        text_color = (255, 255, 255)
        box_thickness = 3 
        font = cv2.FONT_HERSHEY_SIMPLEX
        font_scale = 0.6
        font_thickness = 2
        
        cv2.rectangle(image, (x1, y1), (x2, y2), box_color, box_thickness)
        
        (text_width, text_height), baseline = cv2.getTextSize(label, font, font_scale, font_thickness)
        
        cv2.rectangle(image, (x1, y1 - text_height - 15), (x1 + text_width + 10, y1), box_color, -1)
        
        cv2.putText(image, label, (x1 + 5, y1 - 5), font, font_scale, text_color, font_thickness)

timestamp = int(time.time()) 
output_filename = f"graded_onion_{timestamp}.jpg"

cv2.imwrite(output_filename, image)
print("-" * 25)
print(f"Success! Check your folder for: {output_filename}")