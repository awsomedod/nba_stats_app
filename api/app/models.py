from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
import json

bcrypt = Bcrypt()
db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    favorite_players = db.relationship('Player', secondary='user_favorite_players', back_populates='fans')
    favorite_teams = db.relationship('Team', secondary='user_favorite_teams', back_populates='fans')

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

class Player(db.Model):
    __tablename__ = 'players'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    picture_data = db.Column(db.LargeBinary)  # New column for storing picture data
    season_stats = db.relationship('SeasonStats', backref='player', lazy='dynamic')
    fans = db.relationship('User', secondary='user_favorite_players', back_populates='favorite_players')

class Team(db.Model):
    __tablename__ = 'teams'
    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, nullable=False)
    team_name = db.Column(db.String(255), nullable=False)
    picture_data = db.Column(db.LargeBinary)  # New column for storing picture data
    players = db.relationship('SeasonStats', backref='team', lazy='dynamic')
    fans = db.relationship('User', secondary='user_favorite_teams', back_populates='favorite_teams')

class User_Favorite_Players(db.Model):
    __tablename__ = 'user_favorite_players'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey('players.id', ondelete='CASCADE'), primary_key=True)

class User_Favorite_Teams(db.Model):
    __tablename__ = 'user_favorite_teams'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id', ondelete='CASCADE'), primary_key=True)

class SeasonStats(db.Model):
    __tablename__ = 'season_stats'
    id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey('players.id'))
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'))
    pos = db.Column(db.String(50))
    age = db.Column(db.Integer)
    G = db.Column(db.Integer)
    GS = db.Column(db.Integer)
    MP = db.Column(db.Float)
    FG = db.Column(db.Float)
    FGA = db.Column(db.Float)
    FG_perc = db.Column(db.Float)
    threep = db.Column(db.Float)
    threepa = db.Column(db.Float)
    threep_perc = db.Column(db.Float)
    twop = db.Column(db.Float)
    twopa = db.Column(db.Float)
    twop_perc = db.Column(db.Float)
    eFG_perc = db.Column(db.Float)
    FT = db.Column(db.Float)
    FTA = db.Column(db.Float)
    FT_perc = db.Column(db.Float)
    ORB = db.Column(db.Float)
    DRB = db.Column(db.Float)
    TRB = db.Column(db.Float)
    AST = db.Column(db.Float)
    STL = db.Column(db.Float)
    BLK = db.Column(db.Float)
    TOV = db.Column(db.Float)
    PF = db.Column(db.Float)
    PTS = db.Column(db.Float)