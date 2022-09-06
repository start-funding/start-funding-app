import './App.css';
import Header from './modules/organisms/header/Header';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './modules/pages/home/Home';
import Campagna from './modules/pages/campagna/Campagna';
import Campagne from './modules/pages/campagne/Campagne';
import CreaCampagna from './modules/pages/creacampagna/CreaCampagna';

function App() {
  return (
    <Router>
      <div>
        {/* Header */}
        <Header />

        {/* Central content */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/creacampagna" element={<CreaCampagna />} />
          <Route path="/campagna/:id" element={<Campagna />} />
          <Route path="/campagne" element={<Campagne />} />
        </Routes>

        {/* Footer */}

      </div>
    </Router>
  );
}

export default App;
