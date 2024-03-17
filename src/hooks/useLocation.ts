import { useEffect, useState } from 'react'

const spaceNeedle = {
    coords: {
        accuracy: 1339.523815243145,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        latitude: 47.6205,
        longitude: -122.3493,
        speed: null,
    },
    timestamp: new Date().getTime(),
}

export const useLocation = () => {
    const [location, setLocation] = useState<GeolocationPosition | null>(null)

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log('setting location')
                setLocation(position)
            }, () => {
                setLocation(spaceNeedle)
            })
        } else {
            setLocation(spaceNeedle)
        }
    }, [])

    return { location }
}
