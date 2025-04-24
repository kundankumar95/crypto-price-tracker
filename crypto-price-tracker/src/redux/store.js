import { createSlice, configureStore } from "@reduxjs/toolkit";
import bitcoin from "../components/assets/Bitcoin.png";
import ethereum from "../components/assets/Ethereum.png";
import tether from "../components/assets/Tether.png";
import xrp from "../components/assets/xrp.png";
import bnb from "../components/assets/bnb.png";
import solana from "../components/assets/solana.png";
import graph from "../components/assets/graph.png";
import graphImage from "../components/assets/graphImg.png";
import image1 from "../components/assets/image1.png";
import image2 from "../components/assets/image2.png";
import image3 from "../components/assets/image3.png";
import image4 from "../components/assets/image4.png";

const logoMapping = {
  Bitcoin: bitcoin,
  Ethereum: ethereum,
  Tether: tether,
  XRP: xrp,
  BNB: bnb,
  Solana: solana,
  graphImage: graphImage,
  
};

const graphMapping = {
  Bitcoin: image1,
  Ethereum: image2,
  Tether: image3,
  XRP: image4,
  BNB: graphImage,
  Solana: graphImage,
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: [],
  reducers: {
    setInitialAssets: (state, action) => {
      return action.payload.map((asset) => ({
        ...asset,
        logo: logoMapping[asset.name] || graph,
        chart: graph,
        graph: graphMapping[asset.name],
      }));
    },
    updatePrices: (state) => {
      return state.map((asset) => {
        const getRandom = (min, max) =>
          (Math.random() * (max - min) + min).toFixed(2);
        return {
          ...asset,
          price: +(asset.price * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2),
          percentChange1h: +getRandom(-1, 1),
          percentChange24h: +getRandom(-3, 3),
          volume24h: `${+(
            parseFloat(asset.volume24h) *
            (1 + (Math.random() - 0.5) * 0.1)
          ).toFixed(2)}B`,
        };
      });
    },
  },
});

export const { setInitialAssets, updatePrices } = cryptoSlice.actions;

const store = configureStore({
  reducer: {
    crypto: cryptoSlice.reducer,
  },
});

export default store;
