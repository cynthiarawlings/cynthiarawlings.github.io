import random
import json
import time
import os

# Initialize a dictionary to store user information
user_data = {}

# Define the filename for storing user data
user_data_file = "user_data.json"

# Define the folder for storing conversation files
conversation_folder = "conversations/"

# Create a unique filename for the conversation based on the timestamp
conversation_file = conversation_folder + time.strftime("%Y%m%d%H%M%S") + ".txt"

# Load user data from a file if it exists
try:
    with open(user_data_file, "r") as file:
        user_data = json.load(file)
except FileNotFoundError:
    user_data = {}

# Define a list of responses
responses = [
    "Hello!",
    "How can I help you?",
    "I'm not sure, can you please clarify?",
]

# ANSI escape codes for text color
ANSI_BLUE = "\033[94m"
ANSI_RESET = "\033[0m"

# Function to save user data to a file
def save_user_data():
    with open(user_data_file, "w") as file:
        json.dump(user_data, file)

# Function to save the conversation to a file without escape codes
def save_conversation(user_input, response, filename):
    # Remove ANSI escape codes using a regular expression
    import re
    user_input = re.sub(r'\033\[[0-9;]+m', '', user_input)
    response = re.sub(r'\033\[[0-9;]+m', '', response)

    with open(filename, "a") as file:
        file.write(f"You: {user_input}\n")
        file.write(f"AI: {response}\n")
        # file.write("\n")

# Function to get a response with colored text
def get_colored_response(user_input):
    if "name" in user_data:
        name = user_data["name"]
    else:
        name = "there"
    
    # Check if the user is providing their name
    if "my name is" in user_input.lower():
        user_name = user_input.split("my name is")[1].strip()
        user_data["name"] = user_name
        save_user_data()  # Save the updated data to the file
        response = f"{ANSI_BLUE}Nice to meet you, {user_name}!{ANSI_RESET}"
    else:
        response = f"{ANSI_BLUE}{random.choice(responses)}{ANSI_RESET}"

    # Save the conversation
    save_conversation(user_input, response, conversation_file)
    return response

# Function to load and continue a conversation
def load_conversation(conversation_filename):
    with open(conversation_filename, "r") as file:
        lines = file.readlines()
        for i in range(0, len(lines), 2):
            user_input = lines[i].strip()[4:]
            response = lines[i + 1].strip()[4:]
            if user_input:
                print(f"You: {user_input}")
            if response:
                print(f"{ANSI_BLUE}AI: {response}{ANSI_RESET}")


# Main loop for interacting with the AI
while True:
    # print()
    user_input = input("You: ")
    if user_input.lower() == "exit":
        break
    elif user_input.lower() == "load":
        # Allow the user to load a conversation
        conversation_file = input("Enter the filename of the conversation you want to load: ")
        conversation_file = os.path.join(conversation_folder, conversation_file)
        if os.path.exists(conversation_file):
            load_conversation(conversation_file)
        else:
            print("Conversation not found.")
    else:
        response = get_colored_response(user_input)
        print(f"AI: {response}")
    # print()
