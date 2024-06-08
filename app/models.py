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
    api_id = db.Column(db.Integer, unique=True)
    name = db.Column(db.String(255), nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id', ondelete='SET NULL'))
    team = db.relationship('Team', back_populates='players')
    fans = db.relationship('User', secondary='user_favorite_players', back_populates='favorite_players')

class Team(db.Model):
    __tablename__ = 'teams'
    id = db.Column(db.Integer, primary_key=True)
    api_id = db.Column(db.Integer, unique=True)
    name = db.Column(db.String(255), nullable=False)
    players = db.relationship('Player', back_populates='team')
    fans = db.relationship('User', secondary='user_favorite_teams', back_populates='favorite_teams')

class User_Favorite_Players(db.Model):
    __tablename__ = 'user_favorite_players'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey('players.id', ondelete='CASCADE'), primary_key=True)

class User_Favorite_Teams(db.Model):
    __tablename__ = 'user_favorite_teams'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id', ondelete='CASCADE'), primary_key=True)