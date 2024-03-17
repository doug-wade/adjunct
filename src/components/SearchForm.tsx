import React from 'react'
import { useForm } from 'react-hook-form'
import { BreweryType } from '../types'

interface SearchFormProps {
  onSubmit: (data: IFormInput) => void;
}

interface IFormInput {
  city: string;
  name: string;
  state: string;
  postalCode: number;
  type: BreweryType[];
}

const SearchForm = ({ onSubmit }: SearchFormProps) => {
    const { register, handleSubmit } = useForm<IFormInput>()

    return (
        <div className="w-full max-w-xs">
            <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <label className="my-8">
          Name
                    <input className="input" type="text" {...register('name')} />
                </label>
                <label className="my-8">
          City
                    <input className="input" type="text" {...register('city')} />
                </label>
                <label className="my-8">
          Postal Code
                    <input
                        className="input"
                        type="number"
                        {...register('postalCode', { min: 0, max: 99999 })}
                    />
                </label>
                <label className="my-8">
          Type
                    <select className="select" multiple={true} {...register('type')}>
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
    )
}

export default SearchForm
