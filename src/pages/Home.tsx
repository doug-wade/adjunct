import React from "react";

import Link from "../components/Link";

function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Welcome!</h1>
      <Link href="/search">Search</Link>
      <Link href="/nearby">Nearby</Link>
    </>
  );
}

export default Home;
