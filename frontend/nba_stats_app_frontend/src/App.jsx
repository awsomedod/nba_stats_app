import '@radix-ui/themes/styles.css';
import { Flex, Theme, Box } from '@radix-ui/themes';
import NavigationMenuComponent from './components/GlobalComponents/NavigationMenu';
import HomePage from './components/HomeComponents/HomePage';
import PlayerPage from './components/PlayerComponents/PlayerPage';
import PlayerPageUser from './components/PlayerComponents/PlayerPageUser';
import TeamPage from './components/TeamComponents/TeamPage';
import TeamPageUser from './components/TeamComponents/TeamPageUser';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './components/AuthComponents/AuthContext'
import './index.css'; // Ensure Tailwind CSS is imported

function App() {
  return (
    <Theme>
      <Router>
          <Box className="bg-green-200 min-h-screen">
          <NavigationMenuComponent />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/player" element={<AuthBasedPlayerStats />} />
              <Route path="/team" element={<AuthBasedTeamStats />} />
            </Routes>
          </Box>
      </Router>
    </Theme>
  );
}

function AuthBasedPlayerStats() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <PlayerPageUser /> : <PlayerPage />;
}

function AuthBasedTeamStats() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <TeamPageUser /> : <TeamPage />;
}

export default App;
