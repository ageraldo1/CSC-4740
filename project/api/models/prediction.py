import pickle
from config import ML_REPOSITORY


class PredictionModel():
    @classmethod
    def get_prediction(cls, feature, days):
        try:
            result = []
            model_location = ML_REPOSITORY + feature + '.pkl'

            model = pickle.load(open(model_location, 'rb'))

            predictions = model.make_future_dataframe(periods=int(days), freq='D', include_history=False)
            forecast = model.predict(predictions)

            for i in range(len(forecast)):
                result.append({
                    'x'          : str(forecast.loc[i, "ds"].date()),
                    'yhat'       : forecast.loc[i, "yhat"],
                    'yhat_lower' : forecast.loc[i, "yhat_lower"],
                    'yhat_upper' : forecast.loc[i, "yhat_upper"]
                })
            return result
        except:
            return []
