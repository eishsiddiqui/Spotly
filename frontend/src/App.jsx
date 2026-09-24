import { useMemo } from "react";

import "./App.css";
import Users from "./user/pages/Users";
import Auth from "./user/pages/Auth";
import NewPlaces from "./places/pages/NewPlaces";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  const { token, login, logout, userId } = useAuth();

  const routes = useMemo(() => {
    if (token) {
      return (
        <>
          <Route path="/" element={<Users />} />
          <Route path="/places/new" element={<NewPlaces />} />
          <Route path="/:userId/places" element={<UserPlaces />} />
          <Route path="/places/:placeId" element={<UpdatePlace />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </>
      );
    } else {
      return (
        <>
          <Route path="/" element={<Users />} />
          <Route path="/:userId/places" element={<UserPlaces />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Navigate replace to="/auth" />} />
        </>
      );
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Routes>{routes}</Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
