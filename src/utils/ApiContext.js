import React, { createContext, useContext, useState, useEffect } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";

const ApiContext = createContext();

export const ApiProvider = ({ children, wsUrl, currentNetwork }) => {
  const [api, setApi] = useState(null);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    setApi(null);
    setApiError(null);
    console.log("ApiProvider: wsUrl", wsUrl);
    const initApi = async () => {
      let networkWhenSelected = currentNetwork;
      let provider = null;
      for (let i = 0; i < wsUrl.length; i++) {
        try {
          
          console.log(`Trying to initialize API with ${wsUrl[i]}`)
          provider = new WsProvider(wsUrl[i]);

          provider.on('error', () => {
            console.log(`Error with provider for URL: ${wsUrl[i]}`);
            provider.disconnect(); 
            provider = null; 
          });
         
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(
              () => reject(new Error("Timeout: Failed to initialize API")),
              10000, 
            ),
          );

          const apiPromise = ApiPromise.create({ provider });

          const api = await Promise.race([apiPromise, timeoutPromise]);

          return setApi({ api, network: networkWhenSelected });
        } catch (error) {
          console.log(`Failed to initialize API with ${wsUrl[i]}`);
          console.error(error);

          if (i === wsUrl.length - 1) {
            setApiError({
              msg: "Failed to initialize API with all provided URLs",
              network: networkWhenSelected,
            });
          }
        }
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
