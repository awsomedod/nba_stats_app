from .models import db, User, Player, Team, SeasonStats

def get_player_all_season_average(player: Player):
    # Initialize an empty list to store season stats data
    all_season_stats = []
    
    # Iterate through each season stats record for the player
    # Make sure to fetch all related records
    for season in player.season_stats.all():
        # Fetch the team using the team_id from the season stats
        team = Team.query.get(season.team_id)
        
        # Construct a dictionary for each season including the required details
        stats_dict = {
            'team_name': team.team_name,
            'team_id' : season.team_id,
            'points': season.PTS,
            'pos': season.pos,
            'age': season.age,
            'games': season.G,
            'games_started': season.GS,
            'minutes_played': season.MP,
            'field_goals': season.FG,
            'field_goal_attempts': season.FGA,
            'field_goal_percentage': season.FG_perc,
            'three_point_field_goals': season.threep,
            'three_point_attempts': season.threepa,
            'three_point_percentage': season.threep_perc,
            'two_point_field_goals': season.twop,
            'two_point_attempts': season.twopa,
            'two_point_percentage': season.twop_perc,
            'effective_field_goal_percentage': season.eFG_perc,
            'free_throws': season.FT,
            'free_throw_attempts': season.FTA,
            'free_throw_percentage': season.FT_perc,
            'offensive_rebounds': season.ORB,
            'defensive_rebounds': season.DRB,
            'total_rebounds': season.TRB,
            'assists': season.AST,
            'steals': season.STL,
            'blocks': season.BLK,
            'turnovers': season.TOV,
            'personal_fouls': season.PF,
            'points': season.PTS
        }
        
        # Append the constructed dictionary to the list
        all_season_stats.append(stats_dict)
    
    # Return the list containing all the season stats data
    return all_season_stats

	
# def get_team_current_season_average_stats(team_id):
# 	stats = teamgamelog.TeamGameLog(team_id=team_id).get_normalized_dict()['TeamGameLog']
# 	total_games = len(stats)
# 	total_stats = {}
# 	for stat in ["W",
#             "L",
#             "W_PCT",
#             "FGM",
#             "FGA",
#             "FG_PCT",
#             "FG3M",
#             "FG3A",
#             "FG3_PCT",
#             "FTM",
#             "FTA",
#             "FT_PCT",
#             "OREB",
#             "DREB",
#             "REB",
#             "AST",
#             "STL",
#             "BLK",
#             "TOV",
#             "PF",
#             "PTS"]:
# 		total_stats[stat] = sum([float(game[stat]) for game in stats if game[stat] is not None])
# 		win_pct = stats[0]["W_PCT"]
# 		total_wins = sum(1 for game in stats if game['WL'] == 'W')
# 		total_losses = sum(1 for game in stats if game['WL'] == 'L')
# 	averages = {stat: total_stats[stat] / total_games for stat in total_stats}
# 	averages['W_PCT'] = win_pct
# 	averages['W'] = total_wins
# 	averages['L'] = total_losses
# 	return averages
