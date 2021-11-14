# -*- coding: utf-8 -*-
"""
Created on Sat Nov 13 21:04:27 2021

@author: wanda
"""

import matplotlib.pyplot as plt
import numpy as np
import math
import nltk
from nltk import word_tokenize, pos_tag
from nltk.corpus import stopwords, wordnet
from nltk.stem import WordNetLemmatizer
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import pandas as pd
import re

pd.set_option('max_colwidth', 10)


#The function below splits the texts from either paragraph into sections that 
#can be used to attach sentiments to individually

def split_text(text, n=1):
    
    length = len(text)
    size = math.floor(length / n)
    start = np.arange(0, length, size)
    
    split_list = []
    for piece in range(n):
        split_list.append(text[start[piece]:start[piece]+size])
    return split_list

#Cleans the text of all special characters (and, for my sanity, the mix-matched way the
# text uses quotations marks)

def clean_text(dirty_text):
    cleaned_text = re.sub('[`]', "'", dirty_text)
    cleaned_text = re.sub('[^A-Za-z]+', ' ', cleaned_text)
    return cleaned_text

#tokenizes the text, removes stopwords, and tags the words to their POS
    
pos_dict = {'J':wordnet.ADJ, 'V':wordnet.VERB, 'N':wordnet.NOUN, 'R':wordnet.ADV}
def token_stop_pos(fixed_text):
    tags = pos_tag(word_tokenize(fixed_text))
    newlist = []
    for word, tag in tags:
        if word.lower() not in set(stopwords.words('english')):
            newlist.append(tuple([word, pos_dict.get(tag[0])]))
    return newlist
    
   

#The function below, Lemma, creates a list for the lemmas gained from the stem words
# we were able to find from the text. 

wordnet_lemmatizer = WordNetLemmatizer()

def lemmatize(pos_data):
    lemma_rew = " "
    for word, pos in pos_data:
        if not pos:
            lemma = word
            lemma_rew = lemma_rew + " " + lemma
        else:
            lemma = wordnet_lemmatizer.lemmatize(word, pos=pos)
            lemma_rew = lemma_rew + " " + lemma
    return lemma_rew

#The below functions are intended to return the sentiments found from the use of 
# TextBlob. They were not used because of their ineffectiveness

   
#The vader functions below perform the same tasks as the TextBlob functions above
# except they are to be used instead because of their effectiveness when it comes to literature

analyzer = SentimentIntensityAnalyzer()
def vadersentimentanalysis(review):
    vs = analyzer.polarity_scores(review)
    return vs['compound']

def vader_analysis(compound):
    if compound >= 0.5:
        return 'Positive'
    elif compound <= -0.5 :
        return 'Negative'
    else:
        return 'Neutral'

#The below is simply just the read in, pre-processing, and returning of sentiments 
# as intended as the purpose of the program
def anal_titles(data):
    df = pd.DataFrame(data, columns = ["column"])

    df['Cleaned text'] = df['column'].apply(clean_text)
    df['POS tagged'] = df['Cleaned text'].apply(token_stop_pos)
    df['Lemma'] = df['POS tagged'].apply(lemmatize)

    final_data = pd.DataFrame(df[['column', 'Lemma']])

    df['Vader Sentiment'] = df['column'].apply(vadersentimentanalysis)
    df['Vader Analysis'] = df['Vader Sentiment'].apply(vader_analysis)

    print(df.head())
    print(df['Vader Sentiment'].mean())
    return(df['Vader Sentiment'].values.tolist())
