import styles from "../styles/Home.module.css";
import { db } from "../firebase";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

const initData = {
  Decision: 0,
  'Sentiment relevance': 0,
  'Sentiment score': 0,
  Stock: 0
};

// Get a list of companies from your database
async function sendTickerToDB(ticker) {
  var companiesRef = db.ref("companies");
  // reading data:
  /*companiesRef.on("value", (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });*/
  companiesRef.child(ticker).set(data);
  companiesRef.child(ticker).on('value', (snapshot) => {
    setData(snapshot.val());
    console.log(data);
  });
}

const rec = "BUY";

export default function Results(props) {
  const [data, setData] = useState(initData)
  useEffect(() => {
    sendTickerToDB(props.ticker);
  });

  return (
    <div className={styles.resContainer}>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title className={styles.nameTicker}>
            Name/TICKER {props.ticker}
          </Card.Title>
          <Card.Title className={rec == "BUY" ? styles.buy : styles.sell}>
            {rec}
          </Card.Title>
          <Card.Subtitle className={styles.infoHeader}>
            Stock Price
          </Card.Subtitle>
          <Card.Text className={styles.infoBody}>$ {data.Stock}</Card.Text>
          <Card.Subtitle className={styles.infoHeader}>
            Stock Weighting
          </Card.Subtitle>
          <Card.Text className={styles.infoBody}>10</Card.Text>
          <Card.Subtitle className={styles.infoHeader}>
            Market Cap
          </Card.Subtitle>
          <Card.Text className={styles.infoBody}>1T</Card.Text>
          <Card.Subtitle className={styles.infoHeader}>
            Sentiment/Social Media
          </Card.Subtitle>
          <Card.Text className={styles.infoBody}>Positive</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
