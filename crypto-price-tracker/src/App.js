import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Provider } from "react-redux";
import store, { setInitialAssets, updatePrices } from "./redux/store"; 
import Table from "./components/Table/Table"; 

async function fetchInitialAssets() {
  const response = await fetch("/data.json");
  const data = await response.json();
  return data;
}

function useLivePriceUpdater() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function initializeData() {
      const initialData = await fetchInitialAssets();
      dispatch(setInitialAssets(initialData));
    }

    initializeData();

    const interval = setInterval(() => {
      dispatch(updatePrices());
    }, 2000); 

    return () => clearInterval(interval); 
  }, [dispatch]);
}

function App() {
  useLivePriceUpdater();

  const assets = useSelector((state) => state.crypto);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Crypto Price Tracker</h1>
      <Table assets={assets} />
    </div>
  );
}

function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default AppWrapper;
