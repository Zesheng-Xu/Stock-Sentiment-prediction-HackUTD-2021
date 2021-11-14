import styles from "../styles/Home.module.css";
import Card from "react-bootstrap/Card";
import ticker from "../data/ticker.json";

function decisionStyling(decision, attribute) {
  if (attribute == "border") {
    switch (decision) {
      case "Strong Positive":
        return "success";
      case "Strong Negative":
        return "danger";
      case "Volatile - Divided":
        return "warning";
      default:
        return "secondary";
    }
  } else if (attribute == "text") {
    switch (decision) {
      case "Strong Positive":
        return styles.buy;
      case "Strong Negative":
        return styles.sell;
      case "Volatile - Divided":
        return styles.uncertain;
      default:
        return styles.hiddenText;
    }
  } else if (attribute == "decision") {
    switch (decision) {
      case "Strong Positive":
        return "BUY";
      case "Strong Negative":
        return "SELL";
      case "Volatile - Divided":
        return "UNCERTAIN";
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
        border={decisionStyling(props.opinion, "border")}
        style={{ width: "30rem", borderWidth: "3px" }}
      >
        <Card.Body>
          <Card.Title className={styles.nameName}>
            {ticker[props.ticker]["Name"]}
          </Card.Title>
          <Card.Title className={styles.nameTicker}>{props.ticker}</Card.Title>
          <Card.Subtitle className={styles.infoHeader}>
            Corresponding Influencer from past
          </Card.Subtitle>
          <Card.Text className={styles.infoBody}>{props.influencer}</Card.Text>
          <Card.Subtitle className={styles.infoHeader}>
            Highest Sentiment score from past
          </Card.Subtitle>
          <Card.Text className={styles.infoBody}>{props.highsent}</Card.Text>
          <Card.Subtitle className={styles.infoHeader}>
            Predicted Sentiment score from recent
          </Card.Subtitle>
          <Card.Text className={styles.infoBody}>{props.predsent}</Card.Text>
          <Card.Subtitle className={styles.infoHeader}>
            Total Sentiment Opinion
          </Card.Subtitle>
          <Card.Text className={styles.infoBody}>{props.opinion}</Card.Text>
          <Card.Subtitle className={styles.infoHeader}>
            Total Sentiment score
          </Card.Subtitle>
          <Card.Text className={styles.infoBody}>{props.total}</Card.Text>
          <Card.Title className={decisionStyling(props.opinion, "text")}>
            {decisionStyling(props.opinion, "decision")}
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}
