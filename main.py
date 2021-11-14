
import nltk
nltk.download('wordnet')
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('stopwords')
from GoogleNews import GoogleNews
import math
import random
import pandas as pd
import Firebase_modules as FM
import datetime as datetime
from anal import anal_titles





def google_news_search(stock,date):
    date_in = datetime.datetime.strptime(date,"%Y-%m-%d")
    date_in = date_in.strftime("%m/%d/%Y")

    days = datetime.timedelta(14)
    date_start = datetime.datetime.strptime(date_in,"%m/%d/%Y") - days
    googlenews = GoogleNews(start=date_start.strftime("%m/%d/%Y"), end=date_in)
    googlenews.search("\""+stock.upper()+"\"")
    result = googlenews.result()
    for i in range(2, 5):
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




# Press the green button in the gutter to run the script.
def main():

    title_train,media_train = google_news_search("uber",'2014-01-02')
    title, media = google_news_search("uber",datetime.date.today().strftime("%Y-%m-%d"))

    sentti_train = anal_titles(title_train)
    sentti_predict = anal_titles(title)

    print("sent rating",(sentti_train))
    weight, total_eval, factor, max_media, unique_medias = (calculate_weight(sentti_train, media_train, 0.5))

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
    FM.to_firebase("UBER",810,total_eval ,factor, max_media, final_sent)

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
if __name__ == '__main__':
    main()