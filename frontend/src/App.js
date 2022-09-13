import './App.css';
import {React, useState} from 'react';
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

let navigationLinks = [
  { name: "HOME", href: "/", active: true, show: true },
  { name: "CREATE CAMPAIGN", href: "/createcampaign", active: false, show: true },
  { name: "CAMPAIGNS", href: "/campaigns", active: false, show: true },
  { name: "CAMPAIGN", href: "/camapign", active: false, show: false }
];

function App() {

  const [navActive, setNavActive] = useState(navigationLinks);

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
          <Route path="/createcampaign" element={<CreateCampaign updateNavActive={updateNavActive} />} />
          <Route path="/campaign/:id" element={<Campaign updateNavActive={updateNavActive} />} />
          <Route path="/campaigns" element={<Campaigns updateNavActive={updateNavActive}/>} />
        </Routes>

        {/* Footer */}

      </div>
    </Router>
  );
}

export default App;
