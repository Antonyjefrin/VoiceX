from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import os
import numpy as np
import easyocr 

app = Flask(__name__)
CORS(app)

# ✅ Initialize EasyOCR reader
reader = easyocr.Reader(['en'])  # Specify language (English)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400

    # ✅ Save uploaded file temporarily
    temp_path = os.path.join('uploads', file.filename)
    file.save(temp_path)

    # ✅ Read the image using OpenCV
    ocr_image = cv2.imread(temp_path)

    # ✅ Convert to grayscale (improves OCR accuracy)
    ocr_image_gray = cv2.cvtColor(ocr_image, cv2.COLOR_BGR2GRAY)

    # ✅ Apply Adaptive Thresholding
    binary_image = cv2.adaptiveThreshold(ocr_image_gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                         cv2.THRESH_BINARY, 11, 2)

    # ✅ Debugging: Save processed image to check clarity
    cv2.imwrite("debug_processed.png", binary_image)

    # ✅ Run EasyOCR on the processed image
    extracted_text = reader.readtext(binary_image, detail=0)  # `detail=0` returns only text

    # ✅ Clean up temporary file
    os.remove(temp_path)

    return jsonify({'message': 'File processed successfully', 'extracted_text': " ".join(extracted_text)}), 200

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(debug=True)
