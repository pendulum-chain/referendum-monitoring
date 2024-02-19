import React from "react";
import GenericFetchingComponent from "./GenericFetchingComponent";
import { useApi } from "../utils/ApiContext";

const OpenReferenda = () => {
  const { api, currentNetwork } = useApi();

  const fetchData = async (api) => {
    const data = await api.query.democracy.referendumInfoOf.entries();
    const lastHeader = await api.rpc.chain.getHeader();

    const currentBlockNumber = Number(
      lastHeader.toHuman().number.replaceAll(",", ""),
    );

    let extractedReferenda = data
      .map(([key, info]) => {
        let parsedIndex = key.toHuman()[0];
        const referendaInfo = info.toHuman();
        if (!referendaInfo.Ongoing) {
          return null;
        }

        let proposalHash;
        if (referendaInfo.Ongoing.proposal.Lookup) {
          proposalHash = referendaInfo.Ongoing.proposal.Lookup.hash_;
        }

        const endBlock = Number(referendaInfo.Ongoing.end.replaceAll(",", ""));
        const blocksRemaining = endBlock - currentBlockNumber;
        const timeRemaining = blocksRemaining * 12;

        return {
          proposalHash,
          endBlock: referendaInfo.Ongoing.end,
          timeRemaining,
          index: parsedIndex,
        };
      })
      .filter((item) => item !== null && item.proposalHash !== null);

    return extractedReferenda;
  };

  function formatTimeRemaining(seconds) {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  }

  let baseUrl;
  if (currentNetwork === "pendulum") {
    baseUrl = "https://pendulum.polkassembly.io";
  } else if (currentNetwork === "amplitude") {
    baseUrl = "https://amplitude.polkassembly.io";
  } else {
    throw Error("Invalid network name");
  }

  const renderContent = (data) => (
    <ul>
      {data.map((referenda, index) => (
        <li key={index}>
          <span className="label">Hash:</span>
          <span>
            <a
              href={`${baseUrl}/referendum/${referenda.index}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {referenda.proposalHash}
            </a>
          </span>
          <span></span>
          <span className="label">End Block:</span>
          <span>{referenda.endBlock}</span>
          <span className="label">Time Remaining:</span>
          <span>{formatTimeRemaining(referenda.timeRemaining)}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <GenericFetchingComponent
      fetchData={fetchData}
      renderContent={renderContent}
    />
  );
};

export default OpenReferenda;
