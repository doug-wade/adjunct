import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useBrewerySearch } from "../hooks/useBrewerySearch";
import { BreweryType } from "../types";

interface IFormInput {
  city: string;
  name: string;
  state: string;
  postalCode: number;
  type: BreweryType[];
}

const formParamPairs = [
  ["by_city", "city"],
  ["by_name", "name"],
  ["by_state", "state"],
  ["by_postal", "postalCode"],
];

const SearchForm = ({ onSubmit }) => {
  const [searchParams, setSearchParams] = useState(new URLSearchParams());
  const { register, handleSubmit } = useForm<IFormInput>();

  const submitHandler: SubmitHandler<IFormInput> = (data) => {
    const params = new URLSearchParams();

    formParamPairs.forEach(([param, key]) => {
      if (data[key]) {
        params.set(param, data[key]);
      }
    });

    if (data.type.length > 0) {
      params.set("by_type", data.type.join(","));
    }

    onSubmit(params);
  };

  return (
    <div className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(submitHandler)}
      >
        <label className="my-8">
          Name
          <input className="input" type="text" {...register("name")} />
        </label>
        <label className="my-8">
          City
          <input className="input" type="text" {...register("city")} />
        </label>
        <label className="my-8">
          Postal Code
          <input
            className="input"
            type="number"
            {...register("postalCode", { min: 0, max: 99999 })}
          />
        </label>
        <label className="my-8">
          Type
          <select className="select" multiple={true} {...register("type")}>
            <option>micro</option>
            <option>nano</option>
            <option>regional</option>
            <option>brewpub</option>
            <option>planning</option>
            <option>contract</option>
            <option>proprietor</option>
            <option>closed</option>
          </select>
        </label>
        <input className="my-4 btn btn-primary" type="submit" />
      </form>
    </div>
  );
};

export default SearchForm;
