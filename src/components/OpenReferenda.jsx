import React from 'react';
import GenericFetchingComponent from './GenericFetchingComponent';

const fetchData = async (api) => {
    const data = await api.query.democracy.referendumInfoOf.entries();

    // parse hash
    let extractedReferenda = data.map((item) => {
        let referenudmParsed = item[1].toHuman()
        if (!referenudmParsed.Ongoing) {
            return null;
        }

        let proposalHash

        if (referenudmParsed.Ongoing.proposal.Lookup) {
            proposalHash = referenudmParsed.Ongoing.proposal.Lookup.hash_
        }
        console.log(proposalHash)
        return {
            proposalHash,
        }
    }).filter(item => item !== null && item.proposalHash !== null);

    return extractedReferenda
};


const renderContent = (data) => (
  <ul>
    {data.map((referenda, index) => (
      <li key={index}><span className="label">Hash: </span><span>{referenda.proposalHash}</span></li>
    ))}
  </ul>
);

const OpenReferenda = () => {
  return (
    <GenericFetchingComponent fetchData={fetchData} renderContent={renderContent} />
  );
};

export default OpenReferenda;

