import styles from "../styles/Home.module.css";
import Card from "react-bootstrap/Card";
import ticker from "../data/ticker.json";

function decisionStyling(decision, attribute) {
  if (attribute == "border") {
    switch (decision) {
      case "BUY":
        return "success";
      case "SELL":
        return "danger";
      case "UNCERTAIN":
        return "warning";
      default:
        return "secondary";
    }
  } else if (attribute == "text") {
    switch (decision) {
      case "BUY":
        return styles.buy;
      case "SELL":
        return styles.sell;
      case "UNCERTAIN":
        return styles.uncertain;
      default:
        return styles.hiddenText;
    }
  }
  return;
}

export default function ResultsChild(props) {
  return (
    <div className={styles.resContainer}>
      <Card
        border={decisionStyling(props.decision, "border")}
        style={{ width: "30rem", borderWidth: "3px" }}
      >
        <Card.Body>
          <Card.Title className={styles.nameName}>
            {ticker[props.ticker]["Name"]}
          </Card.Title>
          <Card.Title className={styles.nameTicker}>{props.ticker}</Card.Title>
          <Card.Subtitle className={styles.infoHeader}>
            Stock Price
          </Card.Subtitle>
          <Card.Text className={styles.infoBody}>$
          {props.stock}</Card.Text>
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
          <Card.Title className={decisionStyling(props.decision, "text")}>
            {props.decision}
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}
