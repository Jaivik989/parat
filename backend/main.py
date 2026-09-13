from fastapi import FastAPI, UploadFile, File
from fastapi.staticfiles import StaticFiles

from inference import predict_image

import os
import uuid


app = FastAPI(
    title="Onion Quality Detection API",
    description="AI backend for onion detection and quality classification",
    version="1.0.0"
)


# Create folders if they don't exist
os.makedirs("uploads", exist_ok=True)
os.makedirs("results", exist_ok=True)


# Make result images accessible through HTTP
app.mount(
    "/results",
    StaticFiles(directory="results"),
    name="results"
)


@app.get("/")
def home():

    return {
        "status": "running",
        "message": "Onion Quality Detection API is working"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    # Generate unique filename
    file_id = str(uuid.uuid4())

    input_path = f"uploads/{file_id}.jpg"
    output_path = f"results/{file_id}.jpg"

    # Save uploaded image
    contents = await file.read()

    with open(input_path, "wb") as f:
        f.write(contents)

    # Run model
    result = predict_image(
        input_path,
        output_path
    )

    # URL that mobile app can use
    result["result_image"] = f"/results/{file_id}.jpg"

    # testing 
    @app.post("/test")
    async def test(data: dict):

        print("Received from Hoppscotch:", data)

        return {
            "message": "Data received successfully",
            "received_data": data
        }
    return result