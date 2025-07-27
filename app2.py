from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS
import random

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app)

# Load HuggingFace emotion classifier
emotion_classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", return_all_scores=True)

# Define credibility scoring logic
def calculate_credibility(emotion, likes, retweets, replies):
    # Add random fluctuation
    fluctuation = random.uniform(0.9, 1.1)
    likes = min(likes, 1_000_000)
    retweets = min(retweets, 100_000)
    replies = min(replies, 100_000)

    # Normalize engagement
    engagement_score = (likes + 2 * retweets + 1.5 * replies) / 10  # arbitrary scaling

    # Score emotion
    emotion_weights = {
        'joy': 1.2,
        'love': 1.1,
        'optimism': 1.0,
        'neutral': 0.9,
        'anger': 0.6,
        'sadness': 0.7,
        'disgust': 0.5,
        'fear': 0.6,
        'surprise': 0.8
    }
    emotion_boost = emotion_weights.get(emotion, 0.9)

    credibility = engagement_score * emotion_boost * fluctuation
    return round(credibility, 2)

def normalize(value, max_value):
    return min(value / max_value, 1.0)  # Ensure values don't exceed 1.0

def calculate_influenceiq(credibility, engagement_score):
    # Normalize using more realistic scaling
    normalized_cred = normalize(credibility, 200)
    normalized_engagement = normalize(engagement_score, 50000)

    # Weighted sum, adjust weights if necessary
    final_score = (0.6 * normalized_cred + 0.4 * normalized_engagement) * 100
    return round(final_score, 2)

# Route to generate and evaluate mock influencers dynamically
@app.route('/mock-influencers', methods=['GET'])
def mock_influencers():
    influencer_names = [f'influencer_{i+1}' for i in range(10)]  # Ensure names are sequential

    mock_influencers = []

    for idx, name in enumerate(influencer_names):
        text = random.choice([
            "Inspiring my audience daily.",
            "This new post means a lot to me.",
            "Can't believe how far I've come!",
            "I do it for the fans.",
            "Another milestone!"
        ])

        likes = random.randint(100, 100000)
        retweets = random.randint(10, 10000)
        replies = random.randint(5, 5000)

        # Choose a random emotion for the influencer's main post
        emotions = ['joy', 'love', 'optimism', 'neutral', 'anger', 'sadness', 'disgust', 'fear', 'surprise']
        emotion = random.choice(emotions)

        # Select a news event affecting the influencer
        news = random.choice([
            {"headline": "Raised $1M for charity", "impact": 1.1},
            {"headline": "Accused of copying content", "impact": 0.8},
            {"headline": "Won a major award", "impact": 1.2},
            {"headline": "Viral for wrong reasons", "impact": 0.7},
            {"headline": "Started a helpful podcast", "impact": 1.05},
            {"headline": "Leaked controversial post", "impact": 0.75},
            {"headline": "Received backlash over recent tweet", "impact": 0.65},
            {"headline": "Collaboration with a brand", "impact": 1.15}
        ])

        # Calculate credibility score
        credibility_score = calculate_credibility(emotion, likes, retweets, replies)
        engagement_score = round((likes + retweets + replies) / 3, 2)

        # Adjust credibility based on news impact
        credibility_score *= news['impact']
        credibility_score = round(credibility_score, 2)

        # Compute final InfluenceIQ score
        influenceiq_score = calculate_influenceiq(credibility_score, engagement_score)

        mock_influencers.append({
            "name": name,  # Explicitly set influencer name
            "text": text,
            "likes": likes,
            "retweets": retweets,
            "replies": replies,
            "emotion": emotion,
            "credibility_score": credibility_score,
            "influenceiq_score": influenceiq_score,
            "news": news['headline']
        })

    return jsonify(mock_influencers)

if __name__ == '__main__':
    app.run(debug=True)
