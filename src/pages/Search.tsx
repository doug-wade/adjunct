import React, { useEffect, useState } from 'react'

import BreweryList from '../components/BreweryList'
import SearchForm from '../components/SearchForm'
import { useBrewerySearch } from '../hooks/useBrewerySearch'
import { useBreweryStore } from '../hooks/useBreweryStore'
import BreweryScatterPlot from '../components/BreweryScatterPlot'
import { UseBrewerySearchParams } from '../types'

function Search() {
    const [searchParams, setSearchParams] = useState<UseBrewerySearchParams>({})
    const [{ data, isLoading, isError }, setUrl] = useBrewerySearch()
    const { addBreweries, breweries } = useBreweryStore()

    useEffect(() => {
        addBreweries(data.results)
    }, [data.results])

    useEffect(() => {
        setUrl(searchParams)
    }, [searchParams, setUrl])

    return (
        <>
            <h1 className="text-3xl font-bold underline">Brewery Search</h1>
            <SearchForm onSubmit={setSearchParams} />
            {isLoading && <p>Loading...</p>}
            {isError && <p>Loading...</p>}
            {breweries && <BreweryScatterPlot />}
            {breweries && <BreweryList />}
        </>
    )
}

export default Search
