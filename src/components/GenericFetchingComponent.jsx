import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useApi } from "../utils/ApiContext";
const MAX_NUMBER_OF_ITEMS = 4;

const GenericFetchingComponent = ({ renderContent, fetchData }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastNetworkSelected, setLastNetworkSelected] = useState("");
  const { api, currentNetwork, apiError } = useApi();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setData(null);
      setError("");
      try {
        if (!api) return;
        if (lastNetworkSelected !== api.network) {
          return;
        }

        const result = await fetchData(api.api);

        setData(result);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError(
          err.message || "Failed to fetch data. Please try again later.",
        );
        setIsLoading(false);
      }
    };

    getData();
  }, [api, fetchData]);

  useEffect(() => {
    if (apiError) {
      if (lastNetworkSelected !== apiError.network) {
        return;
      }
      setError(apiError.msg);
      setIsLoading(false);
    }
  }, [apiError]);

  useEffect(() => {
    console.log("last network selected", currentNetwork);
    setLastNetworkSelected(currentNetwork);
  }, [currentNetwork]);

  if (isLoading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  if (error) {
    return (
      <div className="error-box">
        <h2 className="error-title">Error</h2>
        <p className="error-message">{error}</p>
      </div>
    );
  }
  if (!data || data.length === 0) return <div>No data available</div>;

  const displayData = Array.isArray(data)
    ? isExpanded
      ? data
      : data.slice(0, MAX_NUMBER_OF_ITEMS)
    : data;

  return (
    <div className="list-container">
      {renderContent(displayData)}
      {data.length > MAX_NUMBER_OF_ITEMS && Array.isArray(data) && (
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default GenericFetchingComponent;
