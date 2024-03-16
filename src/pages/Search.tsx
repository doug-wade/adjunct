import React, { useEffect, useState } from "react";

import BreweryList from "../components/BreweryList";
import SearchForm from "../components/SearchForm";
import { useBrewerySearch } from "../hooks/useBrewerySearch";
import { useBreweryStore } from "../hooks/useBreweryStore";
import BreweryScatterPlot from "../components/BreweryScatterPlot";

function App() {
  const [searchParams, setSearchParams] = useState(new URLSearchParams());
  const { results } = useBrewerySearch(searchParams);
  const { replaceBreweries, breweries } = useBreweryStore();

  useEffect(() => {
    replaceBreweries(results);
  }, [results]);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Brewery Search</h1>
      <SearchForm onSubmit={setSearchParams} />

      {!breweries && <p>Loading...</p>}

      {breweries && <BreweryScatterPlot />}

      {breweries && <BreweryList />}
    </>
  );
}

export default App;
