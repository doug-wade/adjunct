import React, { useEffect, useState } from 'react'

import BreweryList from '../components/BreweryList'
import SearchForm from '../components/SearchForm'
import { useBrewerySearch } from '../hooks/useBrewerySearch'
import { useBreweryStore } from '../hooks/useBreweryStore'
import BreweryScatterPlot from '../components/BreweryScatterPlot'
import { UseBrewerySearchParams } from '../types'

function Search() {
    const [searchParams, setSearchParams] = useState<UseBrewerySearchParams>({})
    const { results } = useBrewerySearch(searchParams)
    const { addBreweries, breweries } = useBreweryStore()

    useEffect(() => {
        addBreweries(results)
    }, [results])

    return (
        <>
            <h1 className="text-3xl font-bold underline">Brewery Search</h1>
            <SearchForm onSubmit={setSearchParams} />
            {!breweries && <p>Loading...</p>}
            {breweries && <BreweryScatterPlot />}
            {breweries && <BreweryList />}
        </>
    )
}

export default Search
