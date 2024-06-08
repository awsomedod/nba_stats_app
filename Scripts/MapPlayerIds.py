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

            
            # Create and add new player
            player = Player.query.filter_by(name=row['full_name']).first()
            player.api_id = row['id']
            db.session.commit()

# Call the function to insert data
insert_data()
