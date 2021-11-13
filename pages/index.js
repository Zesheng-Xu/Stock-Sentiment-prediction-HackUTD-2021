import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SearchableSelect from '../components/SearchableSelect'
import React, {useState} from 'react'


const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]



export default function Home() {
  
  const [value, setValue] = useState("")

  const handleSubmit = (evt) => {
    evt.preventDefault();
   //will handle submission of user's selected ticker
  }

  const handleChange = (evt) => {
    setValue({value: evt.target.value})
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <SearchableSelect options={options} onChange={handleChange}/>
        <button>Submit</button>
      </form>
    </div>
  )
}
