import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from '../styles/Home.module.css'
import { db } from "../firebase";
import Link from 'next/link'

// Get a list of companies from your database
async function getCompanies() {
  var companiesRef = db.ref("companies");
  companiesRef.on("value", (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
}

const rec = "BUY";

export default function Results(props) {
  return (
    <div id={getCompanies()}>
      <h2 className={styles.nameTicker}>Name/TICKER {props.ticker}</h2>
      <h1 className={rec == "BUY" ? styles.buy : styles.sell}>{rec}</h1>
      <p className={styles.infoHeader}>Stock Price</p>
      <p className={styles.infoBody}>$50.00</p>
      <p className={styles.infoHeader}>Stock Weighting</p>
      <p className={styles.infoBody}>10</p>
      <p className={styles.infoHeader}>Market Cap</p>
      <p className={styles.infoBody}>1T</p>
      <p className={styles.infoHeader}>Sentiment/Social Media</p>
      <p className={styles.infoBody}>Positive</p>
      <Link href="./"><a>Back</a></Link>
    </div>
  );
}
