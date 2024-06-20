import requests
from nba_api.stats.static import players
import os
import csv

# Fetch all players
player_dict = players.get_players()

# Create a directory to save player headshots
os.makedirs('nba_player_headshots', exist_ok=True)

# Dictionary to map player names to their image paths
player_images = {}


# Open the CSV file in write mode initially to write the header
with open('players_without_images.csv', 'w', newline='') as csvfile:
    csvwriter = csv.writer(csvfile)
    csvwriter.writerow(['Player Name', 'Player ID'])

# Download each player's headshot
for player in player_dict:
    player_name = player['full_name']
    player_id = player['id']
    
    # Construct URL for the headshot
    # Note: This URL pattern might change, check the NBA API documentation or website for the correct pattern
    image_url = f"https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/{player_id}.png"
    
    try:
        response = requests.get(image_url)
        # Check if the response was successful
        if response.status_code == 200:
            image_path = f'nba_player_headshots/{player_name}.png'
            with open(image_path, 'wb') as img_file:
                img_file.write(response.content)
            player_images[player_name] = image_path
            print(f"Downloaded image for {player_name} (ID: {player_id})")
        else:
            player_images[player_name] = 'No image available'
            print(f"No image available for {player_name} (ID: {player_id})")
            with open('players_without_images.csv', 'a', newline='') as csvfile:
                csvwriter = csv.writer(csvfile)
                csvwriter.writerow([player_name, player_id])
    except Exception as e:
        print(f"Failed to download image for {player_name} (ID: {player_id}): {e}")
        player_images[player_name] = 'Failed to download image'
        with open('players_without_images.csv', 'a', newline='') as csvfile:
            csvwriter = csv.writer(csvfile)
            csvwriter.writerow([player_name, player_id])

# Print the dictionary containing the mapping of player names to image paths or status
print(player_images)