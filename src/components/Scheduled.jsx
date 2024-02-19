import React from "react";
import GenericFetchingComponent from "./GenericFetchingComponent";
import { hexToString } from "../utils/utils";

const fetchData = async (api) => {
  const agendas = await api.query.scheduler.agenda.entries();
  let processedData = agendas.map((agenda) => {
    let blockNumber = agenda[0].toHuman();
    let agendaHuman = agenda[1].toHuman()[0];
    return {
      name: hexToString(agendaHuman.maybeId),
      number: blockNumber,
    };
  });

  return processedData;
};

const renderContent = (data) => (
  <ul>
    {data.map((item, i) => (
      <li key={i}>
        <span className="label">Task Name: </span> <span> {item.name}</span>
        <span className="label"> Block Number: </span>
        <span>{item.number}</span>
      </li>
    ))}
  </ul>
);

const SchedulerList = () => {
  return (
    <GenericFetchingComponent
      fetchData={fetchData}
      renderContent={renderContent}
    />
  );
};

export default SchedulerList;
