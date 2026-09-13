from ultralytics import YOLO
import cv2

MODEL_PATH = "models/best.pt"

model = YOLO(MODEL_PATH)


def predict_image(image_path, output_path):

    results = model(image_path, conf=0.1)

    counts = {
        "total_count": 0,
        "healthy": 0,
        "rotten": 0,
        "sprouted": 0,
        "small": 0,
        "medium": 0,
        "large": 0
    }                                                                                                                   

    # Load original image
    image = cv2.imread(image_path)

    for result in results:

        for box in result.boxes:

            class_id = int(box.cls[0])
            confidence = float(box.conf[0])
            class_name = result.names[class_id]

            # Only accept the 3 classes our YOLO model knows
            if class_name not in ["healthy", "rotten", "sprouted"]:
                continue

            # --------------------------------
            # QUALITY COUNT
            # --------------------------------

            counts[class_name] += 1

            # --------------------------------
            # BOUNDING BOX
            # --------------------------------

            x1, y1, x2, y2 = map(
                int,
                box.xyxy[0].tolist()
            )

            # --------------------------------
            # SIZE CALCULATION
            # --------------------------------

            width = x2 - x1
            height = y2 - y1

            area = width * height

            # Temporary size thresholds
            if area < 10000:

                size = "small"
                counts["small"] += 1

            elif area < 30000:

                size = "medium"
                counts["medium"] += 1

            else:

                size = "large"
                counts["large"] += 1

            # --------------------------------
            # TOTAL COUNT
            # --------------------------------

            counts["total_count"] += 1

            # --------------------------------
            # DRAW BOUNDING BOX
            # --------------------------------

            cv2.rectangle(
                image,
                (x1, y1),
                (x2, y2),
                (0, 255, 0),
                3
            )

            # --------------------------------
            # LABEL
            # --------------------------------

            label = f"{class_name} | {size} | {confidence * 100:.2f}%"

            (text_width, text_height), baseline = cv2.getTextSize(
                label,
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                2
            )

            # Prevent label background from going outside image
            label_y1 = max(0, y1 - text_height - baseline - 10)

            cv2.rectangle(
                image,
                (x1, label_y1),
                (x1 + text_width + 10, y1),
                (0, 255, 0),
                -1
            )

            cv2.putText(
                image,
                label,
                (x1 + 5, y1 - 5),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                (0, 0, 0),
                2
            )

    # Save annotated image
    cv2.imwrite(output_path, image)

    # Return ONLY the counts
    return counts