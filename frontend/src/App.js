import './App.css';
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


function App() {
  return (
    <Router>
      <div>
        {/* Header */}
        <Header />

        {/* Central content */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/createcampaign" element={<CreateCampaign />} />
          <Route path="/campaign/:id" element={<Campaign />} />
          <Route path="/campaigns" element={<Campaigns />} />
        </Routes>

        {/* Footer */}

      </div>
    </Router>
  );
}

export default App;
