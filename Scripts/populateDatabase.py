from app.models import db, Player, Team
from flask import Flask
import pandas as pd
import os
from dotenv import load_dotenv
from sqlalchemy.engine import URL

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

df = pd.read_csv('nba_active_players.csv')

def insert_data():
    with app.app_context():
        for _, row in df.iterrows():
            # Check if the team exists
            team = Team.query.filter_by(name=row['team']).first()
            if not team:
                team = Team(name=row['team'])
                db.session.add(team)
                db.session.commit()
            
            # Create and add new player
            new_player = Player(name=row['full_name'], team=team)
            db.session.add(new_player)
        
        db.session.commit()

# Call the function to insert data
insert_data()
