import styles from "../styles/Home.module.css";
import { db } from "../firebase";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ResultsChild from './ResultsChild'

const initData = {
  'Corresponding Influencer from past': '',
  'Highest Sentiment score from past': 0,
  'Predicted Sentiment score from recent': 0,
  'Total Sentiment Opinion': '',
  'Total Sentiment score': 0,
};

// Get a list of companies from your database
async function sendTickerToDB(ticker) {
  var companiesRef = db.ref("companies")
  companiesRef.child(ticker).set(initData)
}

async function listenForData(ticker, setData) {
  var companiesRef = db.ref("companies")
  companiesRef.child(ticker).on('value', (snapshot) => {
    setData(snapshot.val())
  });
}



export default function Results(props) {

  const [data, setData] = useState(initData)

  useEffect(() => {
    sendTickerToDB(props.ticker)
    listenForData(props.ticker, setData)
  }, []);

  return (
    <div>
      <ResultsChild
        ticker={props.ticker}
        influencer={data['Corresponding Influencer from past']}
        highsent={data['Highest Sentiment score from past']}
        predsent={data['Predicted Sentiment score from recent']}
        opinion={data['Total Sentiment Opinion']}
        total={data['Total Sentiment score']}
      />
    </div>

  );
}
