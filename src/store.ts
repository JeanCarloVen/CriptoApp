import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getCryptos, fetchCurrentCryptoPrice } from "./services/CryptoServices";

import type { CryptoCurrency, CryptoPrice, Pair } from "./types";

type CryptoStore = {
  cryptocurrencies: CryptoCurrency[];
  result: CryptoPrice;
  loading: boolean;
  fetchCryptos: () => Promise<void>;
  fetchData: (pair: Pair) => Promise<void>;
};

//Gestor de Zustand es similar al useReducer
export const useCriptoStore = create<CryptoStore>()(
  devtools((set) => ({
    cryptocurrencies: [],
    result: {
      IMAGEURL: "",
      PRICE: 0,
      HIGHDAY: 0,
      LOWDAY: 0,
      CHANGEPCT24HOUR: 0,
      LASTUPDATE: 0,
    },
    loading: false,

    //Acciones
    fetchCryptos: async () => {
      const cryptocurrencies = await getCryptos();
      set(() => ({
        cryptocurrencies,
      }));
    },
    fetchData: async (pair) => {
      set(() => ({
        loading: true,
      }));
      const result = await fetchCurrentCryptoPrice(pair);
      set(() => ({
        result,
        loading: false,
      }));
    },
  }))
);
