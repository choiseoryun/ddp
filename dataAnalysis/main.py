from flask import Flask, jsonify, send_from_directory
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
json_file_path = './drive/filtered_stock_predictions.json'
image_file_path = './drive/images'
# 5000번 포트에서 실행
@app.route('/')
def home():
    return "hello, world"

@app.route('/predict', methods=['GET'])
def predict():
    with open(json_file_path, 'r', encoding='utf-8') as f:
        stock_data = json.load(f)
    top_10_predictions = stock_data[:10] 
    return jsonify({"predictions": top_10_predictions})

@app.route('/image')
def image():
    image_path = './drive/images'
    image_file = 'graph1.png'
    return send_from_directory(image_path, image_file)


if __name__ == "__main__":
    app.run(debug=True)