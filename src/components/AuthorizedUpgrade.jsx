// ListPublicProposals.js
import React from 'react';
import GenericFetchingComponent from './GenericFetchingComponent';

// Function to fetch and process data
const fetchData = async (api) => {
  const data = await api.query.parachainSystem.authorizedUpgrade();

  if (!data.toHuman()) {
    return null
  }
  
  let processedHash = data.toHuman().codeHash
  
  return processedHash;
};

// Function to render each item
const renderContent = (hash) => (
  <div className="value-container">
      <span className="label">Code hash:</span><span> {hash}</span>
  </div>
);

const AuthorizedUpgrade = () => {
  return (
    <GenericFetchingComponent fetchData={fetchData} renderContent={renderContent} />
  );
};

export default AuthorizedUpgrade;