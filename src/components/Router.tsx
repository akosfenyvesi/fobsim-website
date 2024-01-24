import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import RunSimulation from './RunSimulation';
import Home from './Home';

function AppRouter() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/simulation" element={<RunSimulation />} />
        </Routes>
      </Router>
  )
}

export default AppRouter;