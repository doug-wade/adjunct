export type Brewery = {
    id: string
    name: string
    breweryType: BreweryType
    address1: string
    address2: string | null
    address3: string | null
    city: string
    stateProvince: string
    postalCode: string
    country: string
    longitude: number
    latitude: number
    phone: string
    websiteUrl: string
    state: string
    street: string
}

export type BreweryType =
| "micro"
| "nano"
| "regional"
| "brewpub"
| "large"
| "planning"
| "bar"
| "contract"
| "proprietor"
| "closed";