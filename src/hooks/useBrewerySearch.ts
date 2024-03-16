import { useEffect, useState } from "react"
import { Brewery } from "../types"
import { useBreweryStore } from "./useBreweryStore"

const useBrewerySearch = (queryParams: URLSearchParams) => {
    const [results, setResults] = useState<Brewery[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        if (queryParams.toString() === "") {
            return
        }

        setLoading(true)
        fetch(`https://api.openbrewerydb.org/breweries?${queryParams.toString()}`)
            .then((response) => response.json())
            .then((data) => {
                setResults(data)
                setLoading(false)
            })
            .catch((error) => {
                setError(error)
                setLoading(false)
            })
    }, [queryParams])

    return { results, loading, error }
}

export { useBrewerySearch }