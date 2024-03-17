import { useState, useEffect } from 'react'
import { useBreweryStore } from './useBreweryStore'

interface Data {
  datasets: {
    label: string;
    data: { x: number; y: number }[];
    backgroundColor: string;
  }[];
}

const defaultData = {
    datasets: [
        {
            backgroundColor: 'rgba(75,192,192,0.4)',
            label: 'Breweries',
            data: [],
        },
    ],
}

const options = {
    scales: {
        y: {
            beginAtZero: false,
        },
    },
    plugins: {
        tooltip: {
            callbacks: {
                title: ([item]) => item.raw.label,
            },
        },
    },
}

export const useScatterData = () => {
    const [data, setData] = useState<Data>(defaultData)
    const { breweries } = useBreweryStore()

    useEffect(() => {
        setData((prevState) => {
            const breweryPoints = Object.values(breweries).map((brewery) => ({
                x: brewery.longitude,
                y: brewery.latitude,
                label: brewery.name,
            }))

            return {
                ...prevState,
                datasets: [
                    {
                        ...prevState.datasets[0],
                        data: breweryPoints,
                    },
                    ...prevState.datasets.slice(1),
                ],
            }
        })
    }, [breweries])

    return { data, options }
}
