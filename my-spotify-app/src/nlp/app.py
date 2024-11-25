from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Load the NLP model
emotion_classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base")

@app.route("/")
def home():
    return "Welcome to the Emotion Analysis API! Use the /analyze endpoint to analyze emotions."

@app.route("/analyze", methods=["POST"])
def analyze_emotion():
    data = request.json
    sentence = data.get("sentence", "")
    if not sentence:
        return jsonify({"error": "No sentence provided"}), 400

    # Predict emotion
    emotion = emotion_classifier(sentence)
    return jsonify({"emotion": emotion[0]})

if __name__ == "__main__":
    app.run(debug=True)
