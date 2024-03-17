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
| 'micro'
| 'nano'
| 'regional'
| 'brewpub'
| 'large'
| 'planning'
| 'bar'
| 'contract'
| 'proprietor'
| 'closed';

export interface UseBrewerySearchParams {
    city?: string | null
    name?: string | null
    state?: string | null
    postalCode?: number | null
    type?: BreweryType[] | null
    location?: GeolocationPosition | null
}

type BreweryJson = {
    id: string;
    name: string;
    brewery_type: string;
    address_1: string;
    address_2: string | null;
    address_3: string | null;
    city: string;
    state_province: string;
    postal_code: string;
    country: string;
    longitude: string;
    latitude: string;
    phone: string;
    website_url: string;
    state: string;
    street: string;
}