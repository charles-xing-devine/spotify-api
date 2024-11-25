from flask import Flask, request, jsonify
from transformers import pipeline
from collections import Counter
import nltk
nltk.download('punkt')

# Ensure NLTK punkt tokenizer is available
nltk.download('punkt')
from nltk.tokenize import sent_tokenize

app = Flask(__name__)

# Load the NLP model
emotion_classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base")

# Define the mapping of model emotions to main categories
emotion_mapping = {
    "joy": "happy",
    "happiness": "happy",
    "sadness": "sad",
    "anger": "angry",
    "fear": "angry",
    "calm": "relaxed",
    "love": "excited",
    "surprise": "excited"
}

@app.route("/")
def home():
    return "Welcome. Processing emotions from text input."

@app.route("/analyze", methods=["POST"])
def analyze_emotion():
    data = request.json
    text = data.get("text", "")  # Accept a single text input (paragraph, sentence, etc.)
    if not text:
        return jsonify({"error": "No text provided."}), 400

    # Tokenize text into sentences
    sentences = sent_tokenize(text)

    if len(sentences) == 1:
        # Single sentence case: Analyze and return its emotion
        emotion = emotion_classifier(sentences[0])
        model_emotion = emotion[0]["label"]
        main_emotion = emotion_mapping.get(model_emotion.lower(), "unknown")
        return jsonify({
            "input_type": "single_sentence",
            "sentence": sentences[0],
            "emotion": main_emotion,
            "model_emotion": model_emotion,
            "confidence": emotion[0]["score"]
        })
    else:
        # Paragraph case: Analyze each sentence and determine the overall emotion
        all_emotions = []
        for sentence in sentences:
            emotion = emotion_classifier(sentence)
            model_emotion = emotion[0]["label"]
            main_emotion = emotion_mapping.get(model_emotion.lower(), "unknown")
            all_emotions.append(main_emotion)

        # Determine the overall emotion
        overall_emotion = Counter(all_emotions).most_common(1)[0][0]

        return jsonify({
            "input_type": "paragraph",
            "sentences": sentences,
            "sentence_emotions": all_emotions,
            "overall_emotion": overall_emotion
        })

if __name__ == "__main__":
    app.run(debug=True)
