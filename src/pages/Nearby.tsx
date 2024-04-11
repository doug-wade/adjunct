import React, { useEffect } from 'react'

import { useLocation } from '../hooks/useLocation'
import { useBreweryStore } from '../hooks/useBreweryStore'

import BreweryScatterPlot from '../components/BreweryScatterPlot'
import BreweryList from '../components/BreweryList'
import { useBrewerySearch } from '../hooks/useBrewerySearch'

function Nearby() {
    const location = useLocation()
    const { addBreweries, breweries } = useBreweryStore()
    const [{ data, isLoading, isError }, setUrl] = useBrewerySearch()

    useEffect(() => {
        addBreweries(data.results)
    }, [data])

    useEffect(() => {
        if (location !== null) {
            setUrl(location)
        }
    }, [location, setUrl])

    return (
        <>
            <h1 className="text-3xl font-bold underline">Nearby Breweries</h1>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error...</p>}
            {breweries && <BreweryScatterPlot />}
            {breweries && <BreweryList />}
        </>
    )
}

export default Nearby
