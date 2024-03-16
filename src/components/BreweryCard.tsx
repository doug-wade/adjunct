import React from 'react'

const Brewery = ({ brewery }) => (
  <div key={brewery.id} className="my-4">
    <h2 className="text-xl font-bold">{brewery.name}</h2>
    <p>{brewery.street}</p>
    <p>
      {brewery.city}, {brewery.stateProvince} {brewery.postalCode}
    </p>
    <p>{brewery.phone}</p>
    <a href={brewery.websiteUrl}>{brewery.websiteUrl}</a>
  </div>
)

export default Brewery