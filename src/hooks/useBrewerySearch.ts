import { useEffect, useState } from 'react'
import { camelCaseKeys } from 'json-case-convertor-ts'

import { Brewery, BreweryJson, UseBrewerySearchParams } from '../types'

export type UseBrewerySearchResult = {
    data: { results: Brewery[] };
    isLoading: boolean;
    isError: boolean;
}

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

const useBrewerySearch: () => [UseBrewerySearchResult, (jsonParams: UseBrewerySearchParams) => void] = () => {
    const [data, setData] = useState<{ results: Brewery[] }>({ results: [] })
    const [url, setUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
  
    useEffect(() => {
        const fetchData = async () => {
            if (url === '') {
                return
            }

            setIsError(false)
            setIsLoading(true)

            try {
                const result = await fetch(url)
                const json = await result.json()
                const response = parseResponse(json)
  
                setData({ results: response })
            } catch (error) {
                setIsError(true)
            }
  
            setIsLoading(false)
        }
  
        fetchData()
    }, [url])

    const setUrlFromJsonParams = (jsonParams: UseBrewerySearchParams) => {
        const url = getUrlFromParams(jsonParams)
        setUrl(url)
    }

    return [{ data, isLoading, isError }, setUrlFromJsonParams]
}

export { useBrewerySearch }