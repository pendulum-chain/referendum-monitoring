import React from "react";
import GenericFetchingComponent from "./GenericFetchingComponent";

const fetchData = async (api) => {
  const data = await api.query.democracy.nextExternal();

  if (!data.toHuman()) {
    return null;
  }

  const extractedValue = data.toHuman();
  console.log(extractedValue[0].Lookup);
  if (extractedValue[0].Lookup) {
    return extractedValue[0].Lookup.hash_;
  }

  return null;
};

const renderContent = (data) => (
  <ul>
    <div className="value-container">
      <span className="label">Hash:</span>
      <span> {data}</span>
    </div>
  </ul>
);

const ExternalProposal = ({ palletName }) => {
  return (
    <GenericFetchingComponent
      fetchData={fetchData}
      renderContent={renderContent}
    />
  );
};

export default ExternalProposal;
