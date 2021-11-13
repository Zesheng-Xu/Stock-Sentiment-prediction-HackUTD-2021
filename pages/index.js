import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SearchableSelect from '../components/SearchableSelect'
import React, { useState } from 'react'


const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]



export default function Home() {

  const [value, setValue] = useState("chocolate")

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(`Submitting ${value}`)
    //will handle submission of user's selected ticker
  }

  const handleChange = e => {
    setValue(e.value)
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>

        <SearchableSelect
          options={options}
          handleChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  )
}
