import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
import { camelCaseKeys } from "json-case-convertor-ts";
import merge from "lodash.merge";
import { Brewery } from "../types";

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
};

type State = {
  breweries: Record<string, Brewery>;
};

type Actions = {
  addBreweries: (newBreweries: [BreweryJson]) => void;
  replaceBreweries: (newBreweries: [BreweryJson]) => void;
};

const parseBrewery = (breweryJson: BreweryJson): Brewery => {
  const brewery = camelCaseKeys<Brewery>(breweryJson);
  brewery.latitude = parseFloat(breweryJson.latitude);
  brewery.longitude = parseFloat(breweryJson.longitude);

  return brewery;
};

export const useBreweryStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      breweries: {},
      addBreweries: (newBreweries: [BreweryJson]) =>
        set((state) => {
          newBreweries.forEach((breweryJson) => {
            const brewery = camelCaseKeys<Brewery>(breweryJson);
            brewery.latitude = parseFloat(breweryJson.latitude);
            brewery.longitude = parseFloat(breweryJson.longitude);

            state.breweries[brewery.id] = brewery;
          });
        }),
      replaceBreweries: (newBreweries: [BreweryJson]) =>
        set((state) => {
          state.breweries = {};
          newBreweries.forEach((breweryJson) => {
            const brewery = parseBrewery(breweryJson);

            state.breweries[brewery.id] = brewery;
          });
        }),
    })),
    {
      name: "breweries",
      storage: createJSONStorage(() => localStorage),
      merge: (initial, persisted) => {
        return merge(initial, persisted, { deep: true });
      },
    }
  )
);
