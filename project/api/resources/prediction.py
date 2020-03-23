from flask_restful import Resource
from models.prediction import PredictionModel

class Prediction(Resource):
     def get(self, feature, days):
         return { 'predictions' : PredictionModel.get_prediction(feature, days) }, 200         
