import React from "react";
import GenericFetchingComponent from "./GenericFetchingComponent";

const fetchData = async (api) => {
  const data = await api.query.democracy.publicProps();
  // parse hash
  let extractedHashes = data
    .toHuman()
    .map((item) => {
      // Destructure to get the BoundedCallOf<T> value
      let [, boundedCall,] = item;

      if (boundedCall.Lookup) {
        return boundedCall.Lookup.hash_;
      }
      return null;
    })
    .filter((hash) => hash !== null);

  return extractedHashes;
};

const renderContent = (data) => (
  <ul>
    {data.map((hash, index) => (
      <li key={index}>
        <span className="label">Hash: </span>
        <span>{hash}</span>
      </li>
    ))}
  </ul>
);

const ListPublicProposals = () => {
  return (
    <GenericFetchingComponent
      fetchData={fetchData}
      renderContent={renderContent}
    />
  );
};

export default ListPublicProposals;
