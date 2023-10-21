import nltk
import random

# # Set the NLTK data path to a specific directory where the data will be stored
# nltk.data.path.append("path/to/nltk_data")

# Download the 'vader_lexicon' resource
nltk.download('vader_lexicon')


# # Download the NLTK dataset (if not already downloaded)
# nltk.download("vader_lexicon")

from nltk.sentiment.vader import SentimentIntensityAnalyzer

# Initialize the SentimentIntensityAnalyzer
sia = SentimentIntensityAnalyzer()

# Load and preprocess the dataset
def load_dataset(file_path):
    dataset = []
    with open(file_path, "r") as file:
        for line in file:
            text, label = line.strip().split()
            dataset.append((text, label))
    return dataset

# Perform sentiment analysis
def classify_sentiment(text):
    sentiment_scores = sia.polarity_scores(text)
    if sentiment_scores["compound"] >= 0.05:
        return "positive"
    elif sentiment_scores["compound"] <= -0.05:
        return "negative"
    else:
        return "neutral"

# Main function
def main():
    dataset = load_dataset("sentiment_dataset.txt")

    # Shuffle the dataset
    random.shuffle(dataset)

    # Test the classifier
    for text, label in dataset:
        prediction = classify_sentiment(text)
        print(f"Text: {text}")
        print(f"Label: {label}")
        print(f"Predicted: {prediction}")
        print()

if __name__ == "__main__":
    main()
