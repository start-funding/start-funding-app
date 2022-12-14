import './App.css';
import {React, useEffect, useState} from 'react';
import Header from './modules/organisms/header/Header';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './modules/pages/home/Home';
import CreateCampaign from './modules/pages/createCampaign/CreateCampaign';
import Campaigns from './modules/pages/campaigns/Campaigns';
import Campaign from './modules/pages/campaign/Campaign';

import './generalStyles/general.scss'

// https://github.com/PureStake/algosigner/blob/develop/docs/dApp-integration.md#algosignersigntxntxnobjects
// https://purestake.github.io/algosigner-dapp-example/v1v2TransitionGuide.html
//https://github.com/web3/web3.js#troubleshooting-and-known-issues
let navigationLinks = [
  { name: "HOME", href: "/", active: true, show: true },
  { name: "CREATE CAMPAIGN", href: "/createcampaign", active: false, show: false },
  { name: "CAMPAIGNS", href: "/campaigns", active: false, show: true },
  { name: "CAMPAIGN", href: "/camapign", active: false, show: false }
];

function App() {

  const [navActive, setNavActive] = useState(navigationLinks);
  const [algoSignerActive, setAlgoSignerActive] = useState(false);
  const [ algoAddresses, setAlgoAddresses ] = useState([])

  useEffect(() => {

    (async () => {
      if (typeof window.AlgoSigner !== 'undefined') {
        console.log("AlgoSigner is installed.");
        navigationLinks[1].show = true;
       
  
        window.AlgoSigner.connect()
        .then(() => window.AlgoSigner.accounts({
            ledger: 'TestNet'
        }))
        .then((accountData) => {
          setAlgoSignerActive(true);

            console.log(accountData);
            let accounts = [];
            accountData.forEach(account => {
              accounts.push(account.address)
            })
            setAlgoAddresses(accounts)
        })
        .catch((e) => {
          console.error(e);
            if(e.name === "AlgoSignerRequestError") {
              setAlgoSignerActive(false);

            }
        });
      } else {
        console.log("AlgoSigner is NOT installed.");
        alert("AlgoSigner is NOT installed. Without AlgoSigner you will be able only to see the campaigns. For creating campaigns you need to have AlgoSigner installed.")
        setAlgoSignerActive(false);
      }
    })();


  }, [algoSignerActive, ])

  

  function updateNavActive(name) {
    navigationLinks.forEach(link => {
        if (link.name === name)
            link.active = true;
        else
            link.active = false;
    })
    setNavActive([...navigationLinks]);
}

  return (
    <Router>
      <div>
        {/* Header */}
        <Header navActive={navActive} setNavActive={setNavActive} updateNavActive={updateNavActive} />

        {/* Central content */}
        <Routes>
          <Route exact path="/" element={<Home updateNavActive={updateNavActive}/>} />
          <Route path="/createcampaign" element={<CreateCampaign updateNavActive={updateNavActive} algoAddresses={algoAddresses} />} />
          <Route path="/campaign/:id" element={<Campaign updateNavActive={updateNavActive} algoSignerActive={algoSignerActive} algoAddresses={algoAddresses} />} />
          <Route path="/campaigns" element={<Campaigns updateNavActive={updateNavActive}/>} />
        </Routes>

        {/* Footer */}

      </div>
    </Router>
  );
}

export default App;
