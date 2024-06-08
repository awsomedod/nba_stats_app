from nba_api.stats.endpoints import commonplayerinfo
import pandas as pd
import time

# Load the CSV file
df_players = pd.read_csv('nba_active_players.csv')

# Check and fetch team info for players with no team listed
for index, row in df_players[df_players['team'].isnull()].iterrows():
    try:
        player_info = commonplayerinfo.CommonPlayerInfo(player_id=row['id']).get_normalized_dict()
        team_city = player_info['CommonPlayerInfo'][0]['TEAM_CITY']
        team_name = player_info['CommonPlayerInfo'][0]['TEAM_NAME']
        full_team_name = team_city + " " + team_name
        df_players.at[index, 'team'] = full_team_name  # Update the team name in the DataFrame
        print(f"Updated {row['full_name']} with team {full_team_name}")

        # Save progress every few updates to avoid losing data if the script stops
        if index % 5 == 0:
            df_players.to_csv('nba_active_players.csv', index=False)

        # Sleep to respect rate limits
        time.sleep(1)  # Adjust sleep time as necessary based on API's rate limit

    except Exception as e:
        print(f"Error updating player {row['full_name']}: {str(e)}")

# Save the final updated DataFrame to CSV
df_players.to_csv('nba_active_players.csv', index=False)
print("CSV file updated with team data.")
