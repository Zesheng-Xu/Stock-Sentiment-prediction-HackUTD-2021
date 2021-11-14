import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

export default function ResultsChild(props) {
  
  return (
    <div className={styles.resContainer}>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title className={styles.nameTicker}>
            Name/TICKER {props.ticker}
          </Card.Title>
          <Card.Title className={props.decision == "BUY" ? styles.buy : styles.sell}>
            {props.decision}
          </Card.Title>
          <Card.Subtitle className={styles.infoHeader}>
            Stock Price
          </Card.Subtitle>
          <Card.Text className={styles.infoBody}>$ </Card.Text>
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
