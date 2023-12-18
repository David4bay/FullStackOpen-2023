/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react'
import SingleCountry from '../SingleCountry/SingleCountry'

const Results = ({searchedCountries, loading}) => {

    if (loading) {
        return <p>Loading...</p>
    }

    if (searchedCountries?.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    if (searchedCountries?.length === 1) {
        {searchedCountries?.map(({info}) => <SingleCountry key={info?.name.common.toString()} country={info} /> )}
    }

    console.log(searchedCountries)

    return (
    <>
    {searchedCountries?.map((info) => (
        <SingleCountry 
        key={info?.name.common} 
        info={info} 
        country={info} 
        />
    ))}
    </>
    )
}

export default Results