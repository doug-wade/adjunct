import { useEffect, useState } from 'react'
import { camelCaseKeys } from 'json-case-convertor-ts'

import { Brewery, BreweryJson, UseBrewerySearchParams } from '../types'

const parseBrewery = (breweryJson: BreweryJson): Brewery => {
    const brewery = camelCaseKeys<Brewery>(breweryJson)
    brewery.latitude = parseFloat(breweryJson.latitude)
    brewery.longitude = parseFloat(breweryJson.longitude)
  
    return brewery
}

const parseResponse = (data: BreweryJson[]): Brewery[] => {
    return data.map(parseBrewery)
}

const getUrlFromParams = (jsonParams: UseBrewerySearchParams): string => {
    const params = new URLSearchParams()

    if (jsonParams.city) {
        params.set('by_city', jsonParams.city)
    }

    if (jsonParams.name) {
        params.set('by_name', jsonParams.name)
    }

    if (jsonParams.state) {
        params.set('by_state', jsonParams.state)
    }

    if (jsonParams.postalCode) {
        params.set('by_postal', jsonParams.postalCode.toString())
    }

    if (!!jsonParams.type && jsonParams.type.length > 0) {
        params.set('by_type', jsonParams.type.join(','))
    }

    if (jsonParams.location) {
        params.set('by_dist', `${jsonParams.location.coords.latitude},${jsonParams.location.coords.longitude}`)
    }

    const stringified = params.toString()
    if (stringified === '') {
        return stringified
    }

    return `https://api.openbrewerydb.org/breweries?${stringified}`
}

const useBrewerySearch = (jsonParams: UseBrewerySearchParams) => {
    const [results, setResults] = useState<Brewery[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        setLoading(true)
        setError(null)
        setResults([])

        const url = getUrlFromParams(jsonParams)

        if (url === '') {
            return
        }

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setResults(parseResponse(data))
            })
            .catch(setError)
            .finally(() => {
                setLoading(false)
            })
    }, [results, setResults, loading, setLoading, error, setError, jsonParams])

    return { results, loading, error }
}

export { useBrewerySearch }