# Data Mining Project

### **Topic** 
___
Forecasting electricity consumption for a household using machine learning algorithms based on a multi-step time series electricity consumption dataset.


### **Abstract** 
___
This project is an exercise in working with a multivariate time series[1] dataset. This data represents power-related variables that in turn could be used to model and even forecast future electricity consumption. 
The scope of this project includes forecasting, data pre-processing, data visualization, and time series modeling.

### **Introduction** 
___
Electric energy consumption is the form of energy consumption that uses electric energy. Electric energy consumption is the actual energy demand made on the existing electricity supply. Global electricity consumption has continued to go up rapidly at a rate faster than energy consumption. Given the rise of smart electricity meters and the wide adoption of electricity generation technology like solar panels, there is a wealth of electricity usage data available. Energy consumption forecasting facilitates electricity demand management and utilities load
planning. 

Time series forecasting [2] is a technique for the prediction of events through a sequence of time. The technique is used across many fields of study, from geology to behavior to economics. The techniques predict future events by analyzing the trends of the past, on the assumption that future trends will hold similar to historical trends.

The Household Power Consumption dataset [3] is a multivariate time series dataset that describes the electricity consumption for a single household over four years.The data was collected between December 2006 and November 2010 and observations of power consumption within the household were collected every minute.

### **Previous Research** 
____
There are many ways to tackle the forecasting problem. The individual household electric power consumption dataset allows us to use a univariate approach or a multivariate approach. Additional data analysis is required in order to determine the best approach for the problem. In the case of a univariate approach, we can use the exponential smoothing algorithm [4]. Exponential smoothing was proposed in the late 1950s (Brown, 1959; Holt, 1957; Winters, 1960), and has motivated some of the most successful forecasting methods. Forecasts produced using exponential smoothing methods are weighted averages of past observations, with the weights decaying exponentially as the observations get older. In the case of a multivariate approach, a model called vector autoregression is recommended. Vector autoregression (VAR) [5] is a stochastic process model used to capture the linear interdependencies among multiple time series. VAR models generalize the univariate autoregressive model (AR model) by allowing for more than one evolving variable.

### **New Methods** 
___
**1. Visualizing time series:** Phase to identify all the underlying patterns related to the series like trend and seasonality.

**2. Stationarising time series:** A stationary time series is one whose statistical properties such as mean, variance, autocorrelation, etc. are all constant over time. Most statistical forecasting methods are based on the assumption that the time series can be rendered approximately stationary through the use of mathematical transformations.

**3. Find the best parameters for the model:** Determinate the optimal parameters for forecasting models based on stationary series.

**4. Fit the model:** Fit several models to learn the pattern of the series.

**5. Predictions:** Predict the future and evaluate the best results using different measurements.


### **References** 
___
1. Recursive and direct multi-step forecasting: the best of both worlds.
Souhaib Ben Taieb and Rob J Hyndman. [online]
Available at : https://robjhyndman.com/papers/rectify.pdf

2. Chatfield, C. (2001). Time-series forecasting. Chapman & Hall/CRC. Retrieved from https://search.ebscohost.com/login.aspx?direct=true&AuthType=ip,shib&db=cat06552a&AN=gsu.9911050973402952&site=eds-live&scope=site.

3. Individual household electric power consumption Data Set. [online]
Available at : https://archive.ics.uci.edu/ml/datasets/individual+household+electric+power+consumption

4. Holt, C. E. (1957). Forecasting seasonals and trends by exponentially weighted averages (O.N.R. Memorandum No. 52). Carnegie Institute of Technology, Pittsburgh USA. [online]
Available at : https://doi.org/10.1016/j.ijforecast.2003.09.015

5. Modeling and Forecasting for Multivariate Time Series Using a Vector Autoregression Model. [online]
Available at : http://en.cnki.com.cn/Article_en/CJFDTotal-ZGWT201401016.htm
