import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import RunSimulation from "./RunSimulation";
import Home from "./Home";
import Dashboard from "./Dashboard";
import { PropsWithChildren } from "react";
import ProtectedRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./PasswordReset";
import ConfirmEmail from "./ConfirmEmail";
import AuthActions from "./auth-actions";
import AuthUserActions from "./AuthUserActions";

const AppRouter = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Router>
      {children}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/auth/action"
          element={
            <AuthActions>
              <AuthUserActions />
            </AuthActions>
          }
        />
        <Route
          path="/simulation"
          element={<ProtectedRoute outlet={<RunSimulation />} />}
        />
        <Route
          path="/dashboard"
          element={<ProtectedRoute outlet={<Dashboard />} />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
