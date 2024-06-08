from nba_api.stats.static import players
import pandas as pd

# Fetch all active NBA players
active_players = players.get_active_players()

# Create a DataFrame
df_players = pd.DataFrame(active_players)

# Add a column for 'team' which will be populated later
df_players['team'] = None

# Save to CSV
df_players.to_csv('nba_active_players.csv', index=False)

print("CSV file created with all active NBA players.")
