from app.models import db, Player
from flask import Flask
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

# Path to the folder containing the player headshots
headshots_folder = 'nba_player_headshots'

# Get a list of all files in the headshots folder
headshot_files = os.listdir(headshots_folder)

def insert_data():
    with app.app_context():
        for filename in headshot_files:
            player_name, ext = os.path.splitext(filename)
            
            if ext.lower() != '.png':
                print(f"skipped {filename}")
                continue  # Skip non-png files

            # Read the binary data of the image
            with open(os.path.join(headshots_folder, filename), 'rb') as file:
                image_data = file.read()

            # Find the player in the database
            player = Player.query.filter_by(name=player_name).first()

            # If not found, try adding an asterisk
            if not player:
                player = Player.query.filter_by(name=player_name + '*').first()

            if player:
                if '*' in player.name:
                    player.name = player.name.replace('*', '')
                    print(f"Removed asterisk from name: {player.name}")
                # Update the picture_data column with the binary data
                player.picture_data = image_data
                db.session.commit()
                print(f"Updated {player_name} with image data")
            else:
                print(f"Player {player_name} not found in the database")
                
# Call the function to insert data
insert_data()
