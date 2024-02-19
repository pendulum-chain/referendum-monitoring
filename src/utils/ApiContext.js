import React, { createContext, useContext, useState, useEffect } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";

const ApiContext = createContext();

export const ApiProvider = ({ children, wsUrl, currentNetwork }) => {
  const [api, setApi] = useState(null);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    setApi(null);
    setApiError(null);

    const initApi = async () => {
      let networkWhenSelected = currentNetwork;
      try {
        const provider = new WsProvider(wsUrl);

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("Timeout: Failed to initialize API")),
            10000,
          ),
        );

        const apiPromise = ApiPromise.create({ provider });

        const api = await Promise.race([apiPromise, timeoutPromise]);

        setApi({ api, network: networkWhenSelected });
      } catch (error) {
        console.log("failed to initialize API");
        console.error(error);
        setApiError({
          msg: "Failed to initialize API",
          network: networkWhenSelected,
        });
      }
    };

    initApi();
  }, [currentNetwork, wsUrl]);

  return (
    <ApiContext.Provider value={{ api, currentNetwork, apiError }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
