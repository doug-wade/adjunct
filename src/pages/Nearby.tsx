import React, { useEffect } from "react";

import { useLocation } from "../hooks/useLocation";
import { useBreweryStore } from "../hooks/useBreweryStore";

import BreweryScatterPlot from "../components/BreweryScatterPlot";
import BreweryList from "../components/BreweryList";

function App() {
  const { location } = useLocation();
  const { addBreweries, breweries } = useBreweryStore();

  useEffect(() => {
    if (location !== null) {
      fetch(
        `https://api.openbrewerydb.org/breweries?by_dist=${location.coords.latitude},${location.coords.longitude}`
      )
        .then((response) => response.json())
        .then((data) => {
          addBreweries(data);
        });
    }
  }, [location]);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Nearby Breweries</h1>

      {!breweries && <p>Loading...</p>}

      {breweries && <BreweryScatterPlot />}

      {breweries && <BreweryList />}
    </>
  );
}

export default App;
