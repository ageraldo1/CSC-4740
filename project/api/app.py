from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS 
from init import create_app

# init 
app = create_app()
api = Api(app)
CORS(app)

# resources
from resources.home import Home
from resources.historical import Historical
from resources.prediction import Prediction

# endpoints
api.add_resource(Home, '/')
api.add_resource(Historical, '/historical/<string:feature>/<string:days>')
api.add_resource(Prediction, '/prediction/<string:feature>/<string:days>')

if __name__ == '__main__':
    app.run(debug=True)    
