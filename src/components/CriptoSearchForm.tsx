import { currencies } from "../data"
import { useCriptoStore } from "../store"
import { useState, type ChangeEvent } from "react"
import type { Pair } from "../types"
import ErrorMessage from "./ErrorMessage"

function CriptoSearchForm() {

    const cryptocurrencies = useCriptoStore((state) => state.cryptocurrencies)
    const fetchData = useCriptoStore((state) => state.fetchData)

    const [pair, setPair] = useState<Pair>({
        currency: "",
        criptocurrency: ""
    })

    const  [error, setError ]= useState('')

    const handleChange = ( e: ChangeEvent<HTMLSelectElement>) => {
        setPair({
            ...pair,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(Object.values(pair).includes('')){
            setError('Todos los campos son obligatorios')
            return
        }
        setError('')
        //consultar la api.
        fetchData(pair)

    }

    return (
        <form
            className="form"
            onSubmit={ handleSubmit }
        >
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className='field'>
                <label htmlFor="currency">Moneda </label>
                <select
                    name="currency"
                    id="currency"
                    onChange={ handleChange }
                    value={pair.currency}
                >
                    <option>
                        -- Selecciona --
                    </option>
                    {currencies.map(currency => (
                        <option key={currency.code} value={currency.code}>{currency.name}</option>
                    ))}

                </select>
            </div>

            <div className='field'>
                <label htmlFor="criptocurrency">CriptoMoneda </label>
                <select
                    name="criptocurrency"
                    id="criptocurrency"
                    onChange={ handleChange }
                    value={pair.criptocurrency}
                >
                    <option>
                        -- Selecciona --
                    </option>
                    {cryptocurrencies.map( crypto => (
                        
                        <option 
                            key={crypto.CoinInfo.FullName}
                            value={crypto.CoinInfo.Name}
                        >{crypto.CoinInfo.FullName}</option>
                    ))}
                </select>
            </div>

            <input type="submit" value="Cotizar" />
        </form>
    )
}

export default CriptoSearchForm