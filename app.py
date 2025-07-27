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
    return min(value / max_value, 1.0)

def calculate_influenceiq(credibility, engagement_score):
    # Normalize both to 0–1 range
    normalized_cred = normalize(credibility, 100)  # Adjust 100 as upper bound
    normalized_engagement = normalize(engagement_score, 100)

    # Weighted sum → scale to 0–100
    final_score = (0.5 * normalized_cred + 0.5 * normalized_engagement) * 100
    return round(final_score, 2)

# Define the API endpoint
@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    text = data.get("text", "")
    likes = int(data.get("likes", 0))
    retweets = int(data.get("retweets", 0))
    replies = int(data.get("replies", 0))

    # Run emotion analysis
    emotion_results = emotion_classifier(text)[0]
    emotion = max(emotion_results, key=lambda x: x['score'])['label']

    # Calculate scores
    credibility_score = calculate_credibility(emotion, likes, retweets, replies)
    engagement_score = round((likes + retweets + replies) / 3, 2)

    # Mock Instagram comments
    mock_instagram_comments = [
        "Absolutely love their content!",
        "Not really a fan of this post.",
        "This is inspiring and helpful.",
        "Meh, I've seen better.",
        "Such a positive vibe!"
    ]

    # Analyze emotions of mock Instagram comments
    comment_emotions = [emotion_classifier(comment)[0] for comment in mock_instagram_comments]
    top_emotions = [max(result, key=lambda x: x['score'])['label'] for result in comment_emotions]

    # Assign simple weights for Instagram comment emotion boosting
    insta_emotion_weights = {
        'joy': 1.1,
        'love': 1.1,
        'optimism': 1.05,
        'neutral': 1.0,
        'anger': 0.85,
        'sadness': 0.9,
        'disgust': 0.8,
        'fear': 0.85,
        'surprise': 1.0
    }

    # Compute average multiplier from Instagram comments
    multipliers = [insta_emotion_weights.get(e, 1.0) for e in top_emotions]
    avg_multiplier = sum(multipliers) / len(multipliers)

    # Apply it to credibility score
    credibility_score *= avg_multiplier
    credibility_score = round(credibility_score, 2)

    # Recalculate InfluenceIQ score after adjustment
    influenceiq_score = calculate_influenceiq(credibility_score, engagement_score)

    return jsonify({
        "emotion": emotion,
        "credibility_score": credibility_score,
        "influenceiq_score": influenceiq_score
    })

# Route to generate and evaluate mock influencers dynamically
@app.route('/mock-influencers', methods=['GET'])
def mock_influencers():
    influencer_names = [f'influencer_{i+1}' for i in range(10)]

    # Simulate a set of mock news events with emotional weights
    news_events = [
        {"headline": "Raised $1M for charity", "impact": 1.1},
        {"headline": "Accused of copying content", "impact": 0.8},
        {"headline": "Won a major award", "impact": 1.2},
        {"headline": "Viral for wrong reasons", "impact": 0.7},
        {"headline": "Started a helpful podcast", "impact": 1.05},
        {"headline": "Leaked controversial post", "impact": 0.75},
        {"headline": "Received backlash over recent tweet", "impact": 0.65},
        {"headline": "Collaboration with a brand", "impact": 1.15}
    ]

    mock_influencers = []

    for name in influencer_names:
        # Random text and metrics
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

        # Randomly select an emotion (positive, neutral, or negative)
        emotions = ['joy', 'love', 'optimism', 'neutral', 'anger', 'sadness', 'disgust', 'fear', 'surprise']
        emotion = random.choice(emotions)

        # Random news impact
        news = random.choice(news_events)

        # Analyze tweet emotion
        credibility_score = calculate_credibility(emotion, likes, retweets, replies)
        engagement_score = round((likes + retweets + replies) / 3, 2)

        # Analyze Instagram comment sentiment
        instagram_comments = random.sample([
            "Love their content!",
            "So wholesome!",
            "Cringe...",
            "Very helpful.",
            "Not impressed.",
            "Pure motivation.",
            "This made my day.",
            "Why is this viral?"
        ], 5)

        comment_emotions = [emotion_classifier(comment)[0] for comment in instagram_comments]
        top_emotions = [max(result, key=lambda x: x['score'])['label'] for result in comment_emotions]

        insta_emotion_weights = {
            'joy': 1.1, 'love': 1.1, 'optimism': 1.05, 'neutral': 1.0,
            'anger': 0.85, 'sadness': 0.9, 'disgust': 0.8, 'fear': 0.85, 'surprise': 1.0
        }
        multipliers = [insta_emotion_weights.get(e, 1.0) for e in top_emotions]
        avg_multiplier = sum(multipliers) / len(multipliers)

        # Apply Instagram + News sentiment impact
        credibility_score *= avg_multiplier * news['impact']
        credibility_score = round(credibility_score, 2)
        influenceiq_score = calculate_influenceiq(credibility_score, engagement_score)

        mock_influencers.append({
            "name": name,
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
