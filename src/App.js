import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ListPublicProposals from "./components/PublicProposals";
import ExternalProposal from "./components/ExternalProposals";
import ListCouncilProposals from "./components/CouncilProposals";
import SchedulerList from "./components/Scheduled";
import { Pendulum_WS, Amplitude_WS } from "./constants";
import { ApiProvider } from "./utils/ApiContext";
import AuthorizedUpgrade from "./components/AuthorizedUpgrade";
import OpenReferenda from "./components/OpenReferenda";
import { PendulumNaked, AmplitudeNaked } from "./assets/logos";

function App() {
  const [wsUrls, setWsUrls] = useState(Pendulum_WS);
  const [currentNetwork, setCurrentNetwork] = useState("pendulum");

  const handleDataVersionChange = (newUrl, currentNetwork) => {
    setWsUrls(newUrl);
    setCurrentNetwork(currentNetwork);
  };

  return (
    <ApiProvider wsUrls={wsUrls} currentNetwork={currentNetwork}>
      <div className="App">
        <header className="App-header">
          <button
            className={`network-button ${currentNetwork === "pendulum" ? "selected-network" : ""}`}
            onClick={() => handleDataVersionChange(Pendulum_WS, "pendulum")}
          >
            <PendulumNaked className="network-icon" />
            Pendulum
          </button>
          <button
            className={`network-button ${currentNetwork === "amplitude" ? "selected-network" : ""}`}
            onClick={() => handleDataVersionChange(Amplitude_WS, "amplitude")}
          >
            <AmplitudeNaked className="network-icon" />
            Amplitude
          </button>
        </header>
        <div className="dashboard">
          <div className="panel left-panel">
            <div className="panel-content">
              <h2>Public Proposals</h2>
              <ListPublicProposals />
              <h2>External Proposal</h2>
              <ExternalProposal />
            </div>
          </div>
          <div className="panel right-panel">
            <div className="panel-content">
              <h2>Council Proposals</h2>
              <ListCouncilProposals palletName="council" />
              <h2>Technical Comittee Proposals</h2>
              <ListCouncilProposals palletName="technicalCommittee" />
            </div>
          </div>
        </div>
        <div className="scheduler">
          <div className="scheduler-content">
            <h2>Open Referenda</h2>
            <OpenReferenda />
          </div>
        </div>
        <div className="scheduler">
          <div className="scheduler-content">
            <h2>Authorized Upgrade</h2>
            <AuthorizedUpgrade />
          </div>
        </div>
        <div className="scheduler">
          <div className="scheduler-content">
            <h2>Scheduled Tasks</h2>
            <SchedulerList />
          </div>
        </div>
      </div>
    </ApiProvider>
  );
}

export default App;
