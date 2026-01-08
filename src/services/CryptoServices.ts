import axios from 'axios'
import { CryptoCurrenciesResponseSchema, CryptoPriceSchema } from '../schema/crypto-schema'
import type { Pair } from '../types'

export async function getCryptos(){
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
    const {data: {Data}} = await axios(url)

    //Validación de datos
    const result = CryptoCurrenciesResponseSchema.safeParse(Data)
    //console.log(result)
    if(result.success){
        return result.data
    }
}

export async function fetchCurrentCryptoPrice(pair: Pair){
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.criptocurrency}&tsyms=${pair.currency}`

    const {data: {DISPLAY}} = await axios(url)

    //Validación de datos
    const result = CryptoPriceSchema.safeParse(DISPLAY[pair.criptocurrency][pair.currency]  )
    console.log(result)
    if(result.success){
        return result.data
    }
}