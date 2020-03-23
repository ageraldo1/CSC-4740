from flask_restful import Resource
from models.historical import HistoricalModel

class Historical(Resource):
     def get(self, feature, days):
         return { 'historical' : HistoricalModel.get_data(feature, days)}, 200
