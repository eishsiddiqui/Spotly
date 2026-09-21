import "./App.css";
import Users from "./user/pages/Users";
import NewPlaces from "./places/pages/NewPlaces";
import UserPlaces from "./places/pages/UserPlaces";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/places/new" element={<NewPlaces />} />
          <Route path="/:userId/places" element={<UserPlaces />} />
          <Route
            path="/auth"
            element={<h2 className="center">Authenticate Page</h2>}
          />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
