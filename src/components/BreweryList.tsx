import React from "react"
import { useBreweryStore } from "../hooks/useBreweryStore"
import BreweryCard from "./BreweryCard"

export default () => {
    const { breweries } = useBreweryStore()

    return Object.values(breweries).map((brewery) => <BreweryCard key={brewery.id} brewery={brewery} />)
}