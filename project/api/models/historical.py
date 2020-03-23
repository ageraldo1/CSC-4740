from db import db
from datetime import datetime
from dateutil.relativedelta import relativedelta

class HistoricalModel(db.Model):
    __tablename__ = 'energy'
    __table_args__ = {'extend_existing': True}
    
    index =  db.Column(db.Integer, primary_key=True)

    @classmethod
    def get_data(cls, feature, days):
        try:
            result = []

            last_datapoint = datetime.strptime(HistoricalModel.query.with_entities(db.func.max(db.func.Date(HistoricalModel.datetime))).scalar(), '%Y-%m-%d')
            cutoff_date = last_datapoint - relativedelta(days=int(days)) 

            for item in HistoricalModel.query.filter(db.func.Date(HistoricalModel.datetime) > cutoff_date).all():
                result.append({
                    'x' : str(item.datetime.date()),
                    'y' : item.__getattribute__(feature)
                })                

            return result
        except:
            return []

