import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

import json
cred = credentials.Certificate("cert.json")
app = firebase_admin.initialize_app(cred, {'databaseURL':"https://hackutd-viii-2021-default-rtdb.firebaseio.com/"})
list = {"companies"}
def set_up():

    ref = db.reference("/")
    if(ref.get() == None):

            ref = db.reference("/companies")
            return;

    for item in list:
        for key,value in ref.get().items():
                exist = False;
                for key_2, value_2 in value.items():
                    print(key_2)
                    if(key_2==item):
                        exist = True
        if not exist:
            ref.set("/"+item )


def to_firebase(name,stock_price,total_eval ,factor, max_media, final):

    ref = db.reference("companies")
    decision = ""
    if(factor * total_eval <= 0):

            decision = "Volatile - Divided"
    elif total_eval < -0.5 :
            decision = "Strong Negative"
    elif total_eval > 0.5:
            decision = "Strong Positive"
    else:
        decision = "No Decisive Opinion"
    ref.update(
        {
            name.upper():
            {

                  "Stock": stock_price,
                  "Total Sentiment score":total_eval,
                  "Highest Sentiment score from past": factor,
                  "Corresponding Influencer from past": max_media,
                  "Predicted Sentiment score from recent": final,
                  "Total Sentiment Opinion": decision
            }

                })
