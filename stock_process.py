import pandas_datareader as pdr
import pandas as pd
import datetime
from finta import TA
from GoogleNews import GoogleNews

def returnMaxMin(Max, Min,data):
    if(Max > Min):
        print("The closest value to the current date is ")
        print(data["Open"].max())
        return data["Open"].idxmax(),"Rising"
    elif (Min > Max):
        print("The closest value to the current date is ")
        print(data["Close"].min())
        return data["Close"].idxmax(),"Falling"
    else:
        print("There was a problem within the current calculations")
def stock_process(stock):
    start = datetime.datetime(2020,1,1)

    end = datetime.date.today()

    datetime.datetime(2021, 11, 9)



    data = pdr.DataReader(stock, 'yahoo', start, end)

    indicators = pd.DataFrame(index=data.index)
    short_window = 50
    long_window = 200

    #The below mentions the moving average for the short term of 50 days

    indicators['short_avg'] = data['Close'].ewm(span=50, adjust=False).mean()

    #The below mentions the moving average for the first 200 days

    indicators['long_avg'] = data['Close'].ewm(span=200, adjust=False).mean()

    SP = pdr.DataReader('SPY', 'yahoo', start, end)
    SP['sp_percent_change'] = SP['Adj Close'].pct_change(periods=1).astype(float)

    data = data.merge(SP['sp_percent_change'], left_index=True, right_index=True)
    data['percent_change'] = data['Adj Close'].pct_change(periods=1).astype(float)
    # Daily percent change as compared to the S&P 500
    data['relative_change'] = data['percent_change']-data['sp_percent_change']

    # All the below are just indicators we will use in our stock prediction
    indicators = ['SMA', 'SMM', 'SSMA', 'EMA', 'DEMA', 'TEMA',
                  'TRIMA', 'TRIX', 'VAMA', 'ER', 'KAMA', 'ZLEMA', 'WMA', 'HMA',
                  'EVWMA', 'VWAP', 'SMMA', 'MACD', 'PPO', 'VW_MACD', 'EV_MACD',
                  'MOM', 'ROC', 'RSI', 'IFT_RSI']

    Max = data["Open"].idxmax()
    Min = data["Close"].idxmin()

    return returnMaxMin(Max, Min,data)

