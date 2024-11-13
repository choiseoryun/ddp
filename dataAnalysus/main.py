from flask import Flask



app = Flask(__name__)

# 5000번 포트에서 실행
@app.route('/')
def home():
    return "hello, world"

@app.route('/predict')
def predict():
    return "durl"

if __name__ == "__main__":
    app.run(debug=True)