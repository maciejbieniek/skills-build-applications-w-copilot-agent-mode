import './App.css';
import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const appName = process.env.REACT_APP_CODESPACE_NAME || 'local';
  const apiBaseUrl = appName === 'local' ? 'http://localhost:8000/api' : `https://${appName}-8000.app.github.dev/api`;

  console.log('[App] appName:', appName);
  console.log('[App] apiBaseUrl:', apiBaseUrl);

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <NavLink className="navbar-brand text-white" to="/">
              <img src="/logo192.png" alt="OctoFit Logo" />
              OctoFit Tracker
            </NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/activities">Activities</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/leaderboard">Leaderboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/teams">Teams</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/users">Users</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/workouts">Workouts</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container-fluid py-4">
          <Routes>
            <Route path="/" element={<Activities />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
