import os
import pandas as pd

# Directory containing the CSV files
data_dir = "NBA_Stats"

# Mapping of team abbreviations to full team names with city and year
team_mapping_1950s = {
    "AND": "Anderson Packers",
    "BLB": "Baltimore Bullets",
    "BOS": "Boston Celtics",
    "CHS": "Chicago Stags",
    "CIN": "Cincinnati Royals",
    "DET": "Detroit Pistons",
    "DNN": "Denver Nuggets",
    "FTW": "Fort Wayne Pistons",
    "INO": "Indianapolis Olympians",
    "MLH": "Milwaukee Hawks",
    "MNL": "Minneapolis Lakers",
    "NYK": "New York Knicks",
    "PHW": "Philadelphia Warriors",
    "ROC": "Rochester Royals",
    "SHE": "Sheboygan Red Skins",
    "STB": "St. Louis Bombers",
    "STL": "St. Louis Hawks",
    "SYR": "Syracuse Nationals",
    "TOT": "Total",
    "TRI": "Tri-Cities Blackhawks",
    "WAT": "Waterloo Hawks",
    "WSC": "Washington Capitols",
}

team_mapping_1960s = {
    "BAL": "Baltimore Bullets",
    "BOS": "Boston Celtics",
    "CHI": "Chicago Bulls",
    "CHP": "Chicago Packers",
    "CHZ": "Chicago Zephyrs",
    "CIN": "Cincinnati Royals",
    "DET": "Detroit Pistons",
    "LAL": "Los Angeles Lakers",
    "MNL": "Minneapolis Lakers",
    "NYK": "New York Knicks",
    "PHI": "Philadelphia 76ers",
    "PHW": "Philadelphia Warriors",
    "SDR": "San Diego Rockets",
    "SEA": "Seattle SuperSonics",
    "SFW": "San Francisco Warriors",
    "STL": "St. Louis Hawks",
    "SYR": "Syracuse Nationals",
    "TOT": "Total" 
}

team_mapping_1970s = {
    "ATL": "Atlanta Hawks",
    "BAL": "Baltimore Bullets",
    "BOS": "Boston Celtics",
    "BUF": "Buffalo Braves",
    "CAP": "Capital Bullets",
    "CHI": "Chicago Bulls",
    "CIN": "Cincinnati Royals",
    "CLE": "Cleveland Cavaliers",
    "DEN": "Denver Nuggets",
    "DET": "Detroit Pistons",
    "GSW": "Golden State Warriors",
    "HOU": "Houston Rockets",
    "IND": "Indiana Pacers",
    "KCK": "Kansas City Kings",
    "KCO": "Kansas City-Omaha Kings",
    "LAL": "Los Angeles Lakers",
    "MIL": "Milwaukee Bucks",
    "NJN": "New Jersey Nets",
    "NOJ": "New Orleans Jazz",
    "NYK": "New York Knicks",
    "NYN": "New York Nets",
    "PHI": "Philadelphia 76ers",
    "PHO": "Phoenix Suns",
    "POR": "Portland Trail Blazers",
    "SAS": "San Antonio Spurs",
    "SDC": "San Diego Clippers",
    "SDR": "San Diego Rockets",
    "SEA": "Seattle SuperSonics",
    "SFW": "San Francisco Warriors",
    "TOT": "Total",
    "WSB": "Washington Bullets"
}

team_mapping_1980s = {
    "ATL": "Atlanta Hawks",
    "BOS": "Boston Celtics",
    "CHH": "Charlotte Hornets",
    "CHI": "Chicago Bulls",
    "CLE": "Cleveland Cavaliers",
    "DAL": "Dallas Mavericks",
    "DEN": "Denver Nuggets",
    "DET": "Detroit Pistons",
    "GSW": "Golden State Warriors",
    "HOU": "Houston Rockets",
    "IND": "Indiana Pacers",
    "KCK": "Kansas City Kings",
    "LAC": "Los Angeles Clippers",
    "LAL": "Los Angeles Lakers",
    "MIA": "Miami Heat",
    "MIL": "Milwaukee Bucks",
    "NJN": "New Jersey Nets",
    "NYK": "New, York Knicks",
    "PHI": "Philadelphia 76ers",
    "PHO": "Phoenix Suns",
    "POR": "Portland Trail Blazers",
    "SAC": "Sacramento Kings",
    "SAS": "San Antonio Spurs",
    "SDC": "San Diego Clippers",
    "SEA": "Seattle SuperSonics",
    "TOT": "Total",
    "UTA": "Utah Jazz",
    "WSB": "Washington Bullets"
}

team_mapping_1990s = {
    "ATL": "Atlanta Hawks",
    "BOS": "Boston Celtics",
    "CHH": "Charlotte Hornets",
    "CHI": "Chicago Bulls",
    "CLE": "Cleveland Cavaliers",
    "DAL": "Dallas Mavericks",
    "DEN": "Denver Nuggets",
    "DET": "Detroit Pistons",
    "GSW": "Golden State Warriors",
    "HOU": "Houston Rockets",
    "IND": "Indiana Pacers",
    "LAC": "Los Angeles Clippers",
    "LAL": "Los Angeles Lakers",
    "MIA": "Miami Heat",
    "MIL": "Milwaukee Bucks",
    "MIN": "Minnesota Timberwolves",
    "NJN": "New Jersey Nets",
    "NYK": "New York Knicks",
    "ORL": "Orlando Magic",
    "PHI": "Philadelphia 76ers",
    "PHO": "Phoenix Suns",
    "POR": "Portland Trail Blazers",
    "SAC": "Sacramento Kings",
    "SAS": "San Antonio Spurs",
    "SEA": "Seattle SuperSonics",
    "TOR": "Toronto Raptors",
    "TOT": "Total",
    "UTAF": "Utah Jazz",
    "VAN": "Vancouver Grizzlies",
    "WAS": "Washington Wizards",
    "WSB": "Washington Bullets"
}

team_mapping_2000s = {
    "ATL": "Atlanta Hawks",
    "BOS": "Boston Celtics",
    "CHA": "Charlotte Bobcats",
    "CHH": "Charlotte Hornets",
    "CHI": "Chicago Bulls",
    "CLE": "Cleveland Cavaliers",
    "DAL": "Dallas Mavericks",
    "DEN": "Denver Nuggets",
    "DET": "Detroit Pistons",
    "GSW": "Golden State Warriors",
    "HOU": "Houston Rockets",
    "IND": "Indiana Pacers",
    "LAC": "Los Angeles Clippers",
    "LAL": "Los Angeles Lakers",
    "MEM": "Memphis Grizzlies",
    "MIA": "Miami Heat",
    "MIL": "Milwaukee Bucks",
    "MIN": "Minnesota Timberwolves",
    "NJN": "New Jersey Nets",
    "NOH": "New Orleans Hornets",
    "NOK": "New Orleans/Oklahoma City Hornets",
    "NYK": "New York Knicks",
    "OKC": "Oklahoma City Thunder",
    "ORL": "Orlando Magic",
    "PHI": "Philadelphia 76ers",
    "PHO": "Phoenix Suns",
    "POR": "Portland Trail Blazers",
    "SAC": "Sacramento Kings",
    "SAS": "San Antonio Spurs",
    "SEA": "Seattle SuperSonics",
    "TOR": "Toronto Raptors",
    "TOT": "Total",
    "UTA": "Utah Jazz",
    "VAN": "Vancouver Grizzlies",
    "WAS": "Washington Wizards"
}


team_mapping_2010s = {
    "ATL": "Atlanta Hawks",
    "BOS": "Boston Celtics",
    "BRK": "Brooklyn Nets",
    "CHA": "Charlotte Hornets",
    "CHI": "Chicago Bulls",
    "CHO": "Charlotte Bobcats",
    "CLE": "Cleveland Cavaliers",
    "DAL": "Dallas Mavericks",
    "DEN": "Denver Nuggets",
    "DET": "Detroit Pistons",
    "GSW": "Golden State Warriors",
    "HOU": "Houston Rockets",
    "IND": "Indiana Pacers",
    "LAC": "Los Angeles Clippers",
    "LAL": "Los Angeles Lakers",
    "MEM": "Memphis Grizzlies",
    "MIA": "Miami Heat",
    "MIL": "Milwaukee Bucks",
    "MIN": "Minnesota Timberwolves",
    "NJN": "New Jersey Nets",
    "NOH": "New Orleans Hornets",
    "NOP": "New Orleans Pelicans",
    "NYK": "New York Knicks",
    "OKC": "Oklahoma City Thunder",
    "ORL": "Orlando Magic",
    "PHI": "Philadelphia 76ers",
    "PHO": "Phoenix Suns",
    "POR": "Portland Trail Blazers",
    "SAC": "Sacramento Kings",
    "SAS": "San Antonio Spurs",
    "TOR": "Toronto Raptors",
    "TOT": "Total",
    "UTA": "Utah Jazz",
    "WAS": "Washington Wizards"
}

team_mapping_2020s = {
    "ATL": "Atlanta Hawks",
    "BOS": "Boston Celtics",
    "BRK": "Brooklyn Nets",
    "CHI": "Chicago Bulls",
    "CHO": "Charlotte Hornets",
    "CLE": "Cleveland Cavaliers",
    "DAL": "Dallas Mavericks",
    "DEN": "Denver Nuggets",
    "DET": "Detroit Pistons",
    "GSW": "Golden State Warriors",
    "HOU": "Houston Rockets",
    "IND": "Indiana Pacers",
    "LAC": "Los Angeles Clippers",
    "LAL": "Los Angeles Lakers",
    "MEM": "Memphis Grizzlies",
    "MIA": "Miami Heat",
    "MIL": "Milwaukee Bucks",
    "MIN": "Minnesota Timberwolves",
    "NOP": "New Orleans Pelicans",
    "NYK": "New York Knicks",
    "OKC": "Oklahoma City Thunder",
    "ORL": "Orlando Magic",
    "PHI": "Philadelphia 76ers",
    "PHO": "Phoenix Suns",
    "POR": "Portland Trail Blazers",
    "SAC": "Sacramento Kings",
    "SAS": "San Antonio Spurs",
    "TOR": "Toronto Raptors",
    "TOT": "Total",
    "UTA": "Utah Jazz",
    "WAS": "Washington Wizards"
}

team_mapping = {}
all_mappings = [team_mapping_1950s, team_mapping_1960s, team_mapping_1970s, team_mapping_1980s, team_mapping_1990s, team_mapping_2000s, team_mapping_2010s, team_mapping_2020s]

for mapping in all_mappings:
    team_mapping.update(mapping)

# Print the combined mapping
print(team_mapping)





# Function to update team abbreviations to full team names with city and year
def update_team_names(file_path, year):
    df = pd.read_csv(file_path)
    df["Tm"] = df["Tm"].map(lambda x: f"{team_mapping.get(x, x)} {year-1}-{year}" if x in team_mapping else x)
    df.to_csv(file_path, index=False)

# Iterate over all CSV files in the directory
for filename in os.listdir(data_dir):
    if filename.endswith(".csv"):
        year = int(filename.split('_')[1]) + 1  # Extract the year from the filename
        file_path = os.path.join(data_dir, filename)
        update_team_names(file_path, year)

print("Team names updated successfully!")
