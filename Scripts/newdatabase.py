from app.models import db, Player, Team, SeasonStats
from flask import Flask
import csv
from dotenv import load_dotenv
from sqlalchemy.engine import URL
from sqlalchemy import text

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


def safe_int(value):
    try:
        return int(value) if value.strip() else None
    except ValueError:
        return None

def safe_float(value):
    try:
        return float(value) if value.strip() else None
    except ValueError:
        return None

def insert_data():
    with app.app_context():

        def create_tables():
            db.create_all()
            db.session.commit()
        create_tables()
        
        # Load player and team stats from CSV files.
        for year in range(1990, 2025):  # Adjust years as necessary
            file_name = f'NBA_Stats/NBA_{year}_per_game_stats.csv'
            with open(file_name, newline='', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    player = Player.query.filter_by(name=row['Player']).first()
                    if not player:
                        player = Player(name=row['Player'])
                        db.session.add(player)
                    
                    team = Team.query.filter_by(year=year, team_name=row['Tm']).first()
                    if not team:
                        team = Team(year=year, team_name=row['Tm'])
                        db.session.add(team)
                    
                    stats = SeasonStats(
                        player=player,
                        team=team,
                        pos=row['Pos'],
                        age=safe_int(row['Age']),
                        G=safe_int(row['G']),
                        GS=safe_int(row['GS']),
                        MP=safe_float(row['MP']),
                        FG=safe_float(row['FG']),
                        FGA=safe_float(row['FGA']),
                        FG_perc=safe_float(row['FG%']),
                        threep=safe_float(row['3P']),
                        threepa=safe_float(row['3PA']),
                        threep_perc=safe_float(row['3P%']),
                        twop=safe_float(row['2P']),
                        twopa=safe_float(row['2PA']),
                        twop_perc=safe_float(row['2P%']),
                        eFG_perc=safe_float(row['eFG%']),
                        FT=safe_float(row['FT']),
                        FTA=safe_float(row['FTA']),
                        FT_perc=safe_float(row['FT%']),
                        ORB=safe_float(row['ORB']),
                        DRB=safe_float(row['DRB']),
                        TRB=safe_float(row['TRB']),
                        AST=safe_float(row['AST']),
                        STL=safe_float(row['STL']),
                        BLK=safe_float(row['BLK']),
                        TOV=safe_float(row['TOV']),
                        PF=safe_float(row['PF']),
                        PTS=safe_float(row['PTS'])
                    )
                    db.session.add(stats)
                    print(f'{year,  row['Player']}')
            db.session.commit()   
        db.session.commit()

# Call the function to insert data
insert_data()
