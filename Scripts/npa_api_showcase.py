from nba_api.stats.endpoints import playergamelog, teamgamelog
import pandas as pd
import time

stats = playergamelog.PlayerGameLog(player_id=203937).get_normalized_dict()['PlayerGameLog']
total_games = len(stats)
total_stats = {}
for stat in ["MIN",
            "FGM",
            "FGA",
            "FG_PCT",
            "FG3M",
            "FG3A",
            "FG3_PCT",
            "FTM",
            "FTA",
            "FT_PCT",
            "OREB",
            "DREB",
            "REB",
            "AST",
            "STL",
            "BLK",
            "TOV",
            "PF",
            "PTS",
            "PLUS_MINUS",]:
	total_stats[stat] = sum([float(game[stat]) for game in stats if game[stat] is not None])
averages = {stat: total_stats[stat] / total_games for stat in total_stats}
print(averages)

team_log = teamgamelog.TeamGameLog(team_id=1610612742)
team_stats = team_log.get_normalized_dict()['TeamGameLog']


# Calculating averages
total_games = len(team_stats)
total_stats = {}
for stat in ['PTS', 'REB', 'AST', 'STL', 'BLK']:
	total_stats[stat] = sum([float(game[stat]) for game in team_stats if game[stat] is not None])

averages = {stat: total_stats[stat] / total_games  for stat in total_stats}
print(averages)

# Check and fetch team info for players with no team listed
# for index, row in df_players[df_players['team'].isnull()].iterrows():
#     try:
#         player_info = commonplayerinfo.CommonPlayerInfo(player_id=row['id']).get_normalized_dict()
#         team_city = player_info['CommonPlayerInfo'][0]['TEAM_CITY']
#         team_name = player_info['CommonPlayerInfo'][0]['TEAM_NAME']
#         full_team_name = team_city + " " + team_name
#         df_players.at[index, 'team'] = full_team_name  # Update the team name in the DataFrame
#         print(f"Updated {row['full_name']} with team {full_team_name}")

#         # Save progress every few updates to avoid losing data if the script stops
#         if index % 5 == 0:
#             df_players.to_csv('nba_active_players.csv', index=False)

#         # Sleep to respect rate limits
#         time.sleep(1)  # Adjust sleep time as necessary based on API's rate limit

#     except Exception as e:
#         print(f"Error updating player {row['full_name']}: {str(e)}")

# # Save the final updated DataFrame to CSV
# df_players.to_csv('nba_active_players.csv', index=False)
# print("CSV file updated with team data.")
