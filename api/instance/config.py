import os
from dotenv import load_dotenv
from sqlalchemy.engine import URL

load_dotenv()
conn_str = (
    "Driver={ODBC Driver 18 for SQL Server};"
    "Server=tcp:nba-stats-database-server.database.windows.net,1433;"
    "Database=nba_stats_database;"
    "Uid=awsomedod;"
    f"Pwd={os.getenv("DATABASE_CONNECTION_STRING_PASSWORD")};"
    "Encrypt=yes;"
    "TrustServerCertificate=no;"
    "Connection Timeout=30;"
)

SQLALCHEMY_DATABASE_URI = URL.create("mssql+pyodbc", query={"odbc_connect": conn_str})
SQLALCHEMY_TRACK_MODIFICATIONS = False
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')