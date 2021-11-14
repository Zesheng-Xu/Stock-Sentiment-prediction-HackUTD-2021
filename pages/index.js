import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import SearchableSelect from "../components/SearchableSelect";
import React, { useState } from "react";
import companyNames from "../data/names.json";
import tickers from "../data/tickers.json";
import tickerLookup from "../data/name.json";
import Results from "../components/Results";
import { ToggleButton, ButtonGroup, Button } from "react-bootstrap";

export default function Home() {
  const [value, setValue] = useState("");
  // const [type, setType] = useState("ticker")
  const [isResult, setResult] = useState(false);
  const [ticker, setTicker] = useState("");
  const [radioValue, setRadioValue] = useState("ticker");

  const radios = [
    { name: "Ticker", value: "ticker" },
    { name: "Company Name", value: "name" },
  ];

  const handleSubmit = (evt) => {
    console.log("help");
    evt.preventDefault();

    if (value != "") {
      if (radioValue == "name") {
        setTicker(tickerLookup[value]["Symbol"]);
      } else {
        setTicker(value);
      }
      setResult(true);
    }
  };

  const handleChange = (e) => {
    setValue(e.value);
    setResult(false);
  };

  // const handleTypeChange = e => {
  //   setType(e.target.value)
  // }

  return (
    <div className={styles.container}>
      <title>Stock Rec</title>
      <h1 className={styles.title}>Stock Rec</h1>
      <form className={styles.tickerForm} onSubmit={handleSubmit}>
        {/* <label htmlFor="searchType">Ticker or Name: </label>
        <select name="search" id="searchType" onChange={handleTypeChange}>
         <option value="ticker">Ticker</option>
         <option value="name">Company Name</option>
        </select> */}

        <ButtonGroup className={styles.tickerFormSelect}>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={idx % 2 ? "outline-dark" : "outline-dark"}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>

        <SearchableSelect
          options={radioValue == "ticker" ? tickers : companyNames}
          handleChange={handleChange}
        />
        <Button type="submit" variant="dark" className={styles.submitButton}>
          Submit
        </Button>
      </form>

      {isResult ? (
        <Results ticker={ticker} />
      ) : (
        <div className={styles.resContainer}></div>
      )}
    </div>
  );
}
