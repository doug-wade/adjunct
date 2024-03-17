import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist, createJSONStorage } from 'zustand/middleware'
import merge from 'lodash.merge'
import { Brewery } from '../types'

type State = {
  breweries: Record<string, Brewery>;
};

type Actions = {
  addBreweries: (newBreweries: Brewery[]) => void;
  replaceBreweries: (newBreweries: Brewery[]) => void;
};

export const useBreweryStore = create<State & Actions>()(
    persist(
        immer((set) => ({
            breweries: {},
            addBreweries: (newBreweries: Brewery[]) =>
                set((state) => {
                    newBreweries.forEach((brewery) => {
                        state.breweries[brewery.id] = brewery
                    })
                }),
            replaceBreweries: (newBreweries: Brewery[]) =>
                set((state) => {
                    state.breweries = {}
                    newBreweries.forEach((brewery) => {
                        state.breweries[brewery.id] = brewery
                    })
                }),
        })),
        {
            name: 'breweries',
            storage: createJSONStorage(() => localStorage),
            merge: (initial, persisted) => {
                return merge(initial, persisted, { deep: true })
            },
        }
    )
)
