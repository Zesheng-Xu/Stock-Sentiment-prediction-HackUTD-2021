import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SearchableSelect from '../components/SearchableSelect'
import React, { useState } from 'react'
import companyNames from '../data/names.json'
import tickers from '../data/tickers.json'
import tickerLookup from '../data/name.json'

/*const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]*/



export default function Home() {

  const [value, setValue] = useState("")
  const [type, setType] = useState("ticker")

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const submitVal = value
    if(type == "name") {
      submitVal = tickerLookup[value]["Symbol"]
    }
    //will handle submission of user's selected ticker
  }

  const handleChange = e => {
    setValue(e.value)
  }

  const handleTypeChange = e => {
    setType(e.target.value)
  }

  return (
    <div className={styles.container}>
      <form
        className={styles.tickerForm}
        onSubmit={handleSubmit}>
        
        <label for="searchType">Ticker or Name: </label>
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
        <button className={styles.submitButton}>Submit</button>
      </form>
    </div>
  )
}
