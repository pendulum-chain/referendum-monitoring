
import { hexToU8a } from '@polkadot/util';
import React, {useCallback} from 'react';
import GenericFetchingComponent from './GenericFetchingComponent';
import { useApi } from '../utils/ApiContext';



const ListCouncilProposals = ({palletName}) => {
    const { api, currentNetwork } = useApi();

    let baseUrl;
    if (currentNetwork === "pendulum") {
        baseUrl = "https://pendulum.polkassembly.io";
    }else if (currentNetwork === "amplitude"){
        baseUrl = "https://amplitude.polkassembly.io";
    } else{
      throw Error ("Invalid network name")
    }

    if (palletName === "council") {
        baseUrl += "/motion/";
    } else if (palletName === "technicalCommittee") {
        baseUrl += "/tech/";
    } else {
        throw Error ("Invalid pallet name")
    }

    const renderContent = (data) => (
      <ul>
        {data.map((item, i) => (
          <li key={i}>
           <span className="label"> Hash:</span> 
           <span>
              <a href={`${baseUrl}${item.index}`} target="_blank" rel="noopener noreferrer">
                {item.hash}
              </a> 
            </span>
            <span className="label">Index: </span>  <span>{item.index}</span>
          </li>
        ))}
      </ul>
    );
 
    const fetchData = useCallback(async () => {

        const hashesRaw = await api.api.query[palletName].proposals();
        const hashesWithU8a = hashesRaw.toHuman().map((hash) => ({
            original: hash.toString(),
            u8a: hexToU8a(hash.toString()) 
        }));

        const hashesU8a = hashesWithU8a.map(hashInfo => hashInfo.u8a);
        const votingDataRaw = await api.api.query[palletName].voting.multi(hashesU8a);

        let processedData = votingDataRaw.map((votingData, index) => {
            const hashInfo = hashesWithU8a[index]; 
            return { 
                hash: hashInfo.original, 
                index: votingData.toHuman().index 
            };
        });

        return processedData
    }, [api, palletName]);

  return (
    <GenericFetchingComponent fetchData={fetchData} renderContent={renderContent} />
  );
};

export default ListCouncilProposals;