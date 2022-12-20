import datetime as dt
import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify

#set up flask
app = Flask(__name__)

#flask routes
@app.route("/")
def home():
    """List all available api routes"""
    return (
        render_template("Templates/index.html")
    ) 

if __name__ == "__main__":
    app.run(debug=True)