import styles from "../styles/Home.module.css";
import { db } from "../firebase";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ResultsChild from './ResultsChild'

const initData = {
  Decision: "",
  'Sentiment relevance': 0,
  'Sentiment score': 0,
  Stock: 0
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
    console.log(snapshot.val())
  });
}



export default function Results(props) {

  const [data, setData] = useState(initData)

  useEffect(() => {
    sendTickerToDB(props.ticker)
    listenForData(props.ticker, setData)
    console.log("Called use effect")
  }, []);

  return (
    <div>
      <ResultsChild
        ticker={props.ticker}
        decision={data.Decision}
      />

      {console.log(data)}
    </div>

  );
}
