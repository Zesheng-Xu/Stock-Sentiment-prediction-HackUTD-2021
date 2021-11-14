import React, { Component } from 'react'
import Select from 'react-select'


export default function Searchableselect (props) {
    return (
        <Select
            id="search"
            options={props.options}
            onChange={props.handleChange}
        />
    )
}