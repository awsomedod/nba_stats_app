from nba_api.stats.static import teams
import pandas as pd

# Fetch all active NBA players
active_teams = teams.get_teams()

# Create a DataFrame
df_teams = pd.DataFrame(active_teams)


print(df_teams)