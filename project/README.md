# Project Name


### Repository
___
+ **URL:** https://archive.ics.uci.edu/ml/datasets/individual+household+electric+power+consumption

+ **Attributes:**
    1. date: Date in format dd/mm/yyyy
    2. time: time in format hh:mm:ss
    3 .global_active_power: household global minute-averaged active power (in kilowatt)
    4. global_reactive_power: household global minute-averaged reactive power (in kilowatt)
    5. voltage: minute-averaged voltage (in volt)
    6. global_intensity: household global minute-averaged current intensity (in ampere)
    7. sub_metering_1: energy sub-metering No. 1 (in watt-hour of active energy). It corresponds to the kitchen, containing mainly a dishwasher, an oven and a microwave (hot plates are not electric but gas powered).
    8. sub_metering_2: energy sub-metering No. 2 (in watt-hour of active energy). It corresponds to the laundry room, containing a washing-machine, a tumble-drier, a refrigerator and a light.
    9. sub_metering_3: energy sub-metering No. 3 (in watt-hour of active energy). It corresponds to an electric water-heater and an air-conditioner.

+ **Notes:**
    1. (global_active_power*1000/60 - sub_metering_1 - sub_metering_2 - sub_metering_3) represents the active energy consumed every minute (in watt hour) in the household by electrical equipment not measured in sub-meterings 1, 2 and 3.

    2. The dataset contains some missing values in the measurements (nearly 1,25% of the rows). All calendar timestamps are present in the dataset but for some timestamps, the measurement values are missing: a missing value is represented by the absence of value between two consecutive semi-colon attribute separators. For instance, the dataset shows missing values on April 28, 2007.



### Resources
___

+ **Significance of ACF and PACF Plots In Time Series Analysis:** https://towardsdatascience.com/significance-of-acf-and-pacf-plots-in-time-series-analysis-2fa11a5d10a8
