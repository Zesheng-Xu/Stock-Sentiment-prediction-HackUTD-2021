import React, { Component } from 'react'
import Select from 'react-select'



export default function(props) {
    return (
        <Select options={props.options}/>
    )
}