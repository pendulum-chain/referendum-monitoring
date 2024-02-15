import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListPublicProposals from './components/PublicProposals';
import ExternalProposal from './components/ExternalProposals';
import ListCouncilProposals from './components/CouncilProposals';
import SchedulerList from './components/Scheduled';
import {Pendulum_WS, Amplitude_WS} from "./constants";
import { ApiProvider } from './utils/ApiContext';
import AuthorizedUpgrade from './components/AuthorizedUpgrade';

function App() {
  const [wsUrl, setWsUrl] = useState(Pendulum_WS);
  const [currentNetwork, setCurrentNetwork] = useState("pendulum");

  const handleDataVersionChange = (newUrl, currentNetwork) => {
    setWsUrl(newUrl); 
    setCurrentNetwork(currentNetwork)
  };

  return (
    <ApiProvider wsUrl={wsUrl}  currentNetwork={currentNetwork}>
      <div className="App">
      <header className="App-header">
          <button
            className={currentNetwork === "pendulum" ? "selected-network" : ""}
            onClick={() => handleDataVersionChange(Pendulum_WS, "pendulum")}
          >
            Pendulum
          </button>
          <button
            className={currentNetwork === "amplitude" ? "selected-network" : ""}
            onClick={() => handleDataVersionChange(Amplitude_WS, "amplitude")}
          >
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
              <ListCouncilProposals palletName="council"  />
              <h2>Technical Comittee Proposals</h2>
              <ListCouncilProposals  palletName="technicalCommittee"  />
            </div>
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
            <SchedulerList/>
          </div>
        </div>
      </div>
    </ApiProvider>
  );
}

export default App;