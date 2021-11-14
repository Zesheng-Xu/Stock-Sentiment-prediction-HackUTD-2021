import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import nltk
nltk.download('wordnet')
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('stopwords')
from GoogleNews import GoogleNews
import math
import random
import pandas as pd

import datetime as datetime
from anal import anal_titles
from stock_process import  stock_process




global eventData

def google_news_search(stock,date):
    date_in = datetime.datetime.strptime(date,"%Y-%m-%d")
    date_in = date_in.strftime("%m/%d/%Y")

    days = datetime.timedelta(14)
    date_start = datetime.datetime.strptime(date_in,"%m/%d/%Y") - days
    googlenews = GoogleNews(start=date_start.strftime("%m/%d/%Y"), end=date_in)
    googlenews.search("\""+stock.upper()+"\"")
    result = googlenews.result()
    for i in range(2, 3):
        googlenews.getpage(i)
        result += googlenews.result()

    df=pd.DataFrame(result)
    print(df)
    titles = df["title"].values.tolist()
    media = df["media"].values.tolist()
    return titles, media


def calculate_weight(senti, media, target):
    print(senti)

    # initial a default weight
    unique = []

    total = len(media);
    weight_total = 0;

    for i in media:
        if i not in unique:
            unique.append(i)
    apperance = [0] * len(unique)
    weight = [0] * len(unique)
    refined_weight = [0] * len(unique)

    for i in range(0, len(unique) - 1):
        apperance[i] = media.count(unique[i])

    for i in range(0, len(weight) - 1):
        weight[i] = float(apperance[i] / total)

    # find total
    for i in range(0, len(unique) - 1):
        for x in range(0, len(senti) - 1):
            if media[x] == unique[i]:
                refined_weight[i] += senti[x] * weight[i]
                weight_total += senti[x] * weight[i]
    print(total)
    print(apperance)
    print(weight)
    print(unique)
    print(weight_total)

    print("After tunning the code:")

    if (weight_total < target - 0.1 * target):


        while (weight_total < (0.9 * target)):
            for i in range(0, len(refined_weight) - 1):
                loss = (target - weight_total)
                print("refined weight", refined_weight)
                if refined_weight[i] !=0 and refined_weight[i] !=0.0:
                    gradient_descent = ((1 / refined_weight[i])) / len(refined_weight)
                else:
                    gradient_descent = random.uniform(0-target,target)
                print("GD Value is : ", gradient_descent)
                refined_weight[i] = refined_weight[i] + math.fabs(0.01 * loss * gradient_descent)
                print(gradient_descent)

            weight_total = sum(refined_weight)

    elif (weight_total > target * 1.1):
        print(weight_total)

        while (weight_total > (target + target* 0.1)):
            for i in range(0, len(refined_weight) - 1):
                loss = (weight_total - target)
                print("refined weight",refined_weight)
                if refined_weight[i] != 0 and refined_weight[i] != 0.0:
                    gradient_descent = ((1 / refined_weight[i])) / len(refined_weight)
                else:
                    gradient_descent = random.uniform(0-target,target)
                    print("GD Value is : ", gradient_descent)
                refined_weight[i] = refined_weight[i] - math.fabs(0.01 * loss * gradient_descent)
                print(gradient_descent)

            weight_total = sum(refined_weight)

    print(weight_total)
    if (weight_total >= 0):
        most_influencing_factor = max(refined_weight)
        most_influencing_media = unique[refined_weight.index(max(refined_weight))]
    else:
        most_influencing_factor = min(refined_weight)
        most_influencing_media = unique[refined_weight.index(min(refined_weight))]
    return refined_weight, weight_total, most_influencing_factor, most_influencing_media, unique


def listener(event):
    # (event.event_type)  # can be 'put' or 'patch'
    print(event.path)  # relative to the reference, it seems
    eventData = event.data  # new data at /reference/event.path
    print(eventData)
    print(event.path.strip("/"))
    if(event.path != "/"):
        callback(event.path.strip("/"))


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


def to_firebase(name,total_eval ,factor, max_media, final):

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

                  # "Stock": stock_price,
                  "Total Sentiment score":total_eval,
                  "Highest Sentiment score from past": factor,
                  "Corresponding Influencer from past": max_media,
                  "Predicted Sentiment score from recent": final,
                  "Total Sentiment Opinion": decision
            }

                })

def callback(data):
    if(data.isupper()):
        date_tosearch, status =stock_process(data);
        title_train,media_train = google_news_search(data,date_tosearch.strftime("%Y-%m-%d"))
        title, media = google_news_search(data,datetime.date.today().strftime("%Y-%m-%d"))

        print(title)
        sentti_train = anal_titles(title_train)
        sentti_predict = anal_titles(title)

        print("sent rating",(sentti_train))
        if(status == "Rising"):
            weight, total_eval, factor, max_media, unique_medias = (calculate_weight(sentti_train, media_train, 0.5))
        elif(status == "Falling"):
            weight, total_eval, factor, max_media, unique_medias = (calculate_weight(sentti_train, media_train, -0.5))

        final_sent = 0;
        for i in range(0, len(sentti_predict)):
            for x in range(0,len(unique_medias)-1):
                if media[i] == unique_medias[x]:
                    final_sent += sentti_predict[i] * weight[x]


        print("Total Weighting:", total_eval)
        print("Weight factors:", weight)
        print("Most influencing factor:", factor)
        print("Most influencing Media:", max_media)
        print("Predicted Sentiment score", final_sent)
        # parse_yahoo('ALGN')

        to_firebase(data,total_eval ,factor, max_media, final_sent,)

# Press the green button in the gutter to run the script.
def main():
    cred = credentials.Certificate('cert.json')

    # Initialize the app with a service account, granting admin privileges
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://hackutd-viii-2021-default-rtdb.firebaseio.com'
    })

    # As an admin, the app has access to read and write all data, regradless of Security Rules
    ref = db.reference('companies')
    data = ""

    try:
        print(ref.listen(listener))
        # data = eventData.strip("/")
        # print("data here:")
        # print(data)
    except:
        SystemError

    while True:
        1+1



# See PyCharm help at https://www.jetbrains.com/help/pycharm/
if __name__ == '__main__':
    main()