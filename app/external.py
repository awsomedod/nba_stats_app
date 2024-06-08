from nba_api.stats.endpoints import playergamelog, teamgamelog

def get_player_current_season_average_stats(player_id):
	stats = playergamelog.PlayerGameLog(player_id=player_id).get_normalized_dict()['PlayerGameLog']
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
	averages['GP'] = total_games
	return averages
	
def get_team_current_season_average_stats(team_id):
	stats = teamgamelog.TeamGameLog(team_id=team_id).get_normalized_dict()['TeamGameLog']
	total_games = len(stats)
	total_stats = {}
	for stat in ["W",
            "L",
            "W_PCT",
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
            "PTS"]:
		total_stats[stat] = sum([float(game[stat]) for game in stats if game[stat] is not None])
		win_pct = stats[0]["W_PCT"]
		total_wins = sum(1 for game in stats if game['WL'] == 'W')
		total_losses = sum(1 for game in stats if game['WL'] == 'L')
	averages = {stat: total_stats[stat] / total_games for stat in total_stats}
	averages['W_PCT'] = win_pct
	averages['W'] = total_wins
	averages['L'] = total_losses
	return averages
