from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Load your phishing detection model and vectorizer
model = joblib.load('phishing_model.pkl')
vectorizer = joblib.load('vectorizer.pkl')

@app.route('/analyze', methods=['POST'])
def analyze():
    url = request.json.get('url')
    # Transform the URL using the vectorizer
    url_tfidf = vectorizer.transform([url])
    # Perform URL analysis using your model
    prediction = model.predict(url_tfidf)[0]
    result = 'Phishing' if prediction == 1 else 'Safe'
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)