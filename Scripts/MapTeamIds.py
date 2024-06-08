from app.models import db, Team
from flask import Flask
import pandas as pd
import os
from dotenv import load_dotenv
from sqlalchemy.engine import URL
from nba_api.stats.static import teams

load_dotenv()
conn_str = (
    "Driver={ODBC Driver 18 for SQL Server};"
    "Server=tcp:nba-stats-database-server.database.windows.net,1433;"
    "Database=nba_stats_database;"
    "Uid=awsomedod;"
    "Pwd=Basila12;"
    "Encrypt=yes;"
    "TrustServerCertificate=no;"
)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = URL.create("mssql+pyodbc", query={"odbc_connect": conn_str})
db.init_app(app)

def insert_data():
    with app.app_context():
		# Fetch all active NBA players
        active_teams = teams.get_teams()

		# Create a DataFrame
        df_teams = pd.DataFrame(active_teams)
        # Assuming df_players is the DataFrame you've already created and contains the NBA API data
        for index, row in df_teams.iterrows():
    		# Find the team by name in the database and update its id
            team = Team.query.filter_by(name = row['full_name']).first()
            if team:
                    team.api_id = row['id']
                    db.session.commit()
    print("added api IDs")
# Call the function to insert data
insert_data()
