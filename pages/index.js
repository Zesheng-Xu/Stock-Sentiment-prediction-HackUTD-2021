import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SearchableSelect from '../components/SearchableSelect'
import React, { useState } from 'react'
import companyNames from '../data/names.json'
import tickers from '../data/tickers.json'
import tickerLookup from '../data/name.json'
import Results from '../components/Results'
import Button from "react-bootstrap/Button"


export default function Home() {

  const [value, setValue] = useState("")
  const [type, setType] = useState("ticker")
  const [isResult, setResult] = useState(false)
  const [ticker, setTicker] = useState("")

  
  const handleSubmit = (evt) => {
    console.log("help");
    evt.preventDefault();
    
    if(type == "name") {
      setTicker(tickerLookup[value]["Symbol"])
    } else {
      setTicker(value)
    }
    //will handle submission of user's selected ticker
    setResult(true)
  }

  const handleChange = e => {
    setValue(e.value)
    setResult(false)
  }

  const handleTypeChange = e => {
    setType(e.target.value)
  }

  return (
    <div className={styles.container}>
      <form
        className={styles.tickerForm}
        onSubmit={handleSubmit}>
        
        <label htmlFor="searchType">Ticker or Name: </label>
        <select name="search" id="searchType" onChange={handleTypeChange}>
         <option value="ticker">Ticker</option>
         <option value="name">Company Name</option>
        </select>

        <SearchableSelect
          options={
            (type == "ticker" ? tickers : companyNames)
          }
          handleChange={handleChange}
        />
        <Button type="submit" variant="dark" className={styles.submitButton}>Submit</Button>
      </form>

      {
        (isResult)? (<Results ticker={ticker} />) : (<div 
        className={styles.resContainer}></div>) 
      }
    </div>
  )
}
