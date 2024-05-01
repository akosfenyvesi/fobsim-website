import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import RunSimulation from "./RunSimulation";
import Home from "./Home";
import { PropsWithChildren } from "react";
import ProtectedRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./PasswordReset";
import ConfirmEmail from "./ConfirmEmail";
import AuthActions from "./auth-actions";
import AuthUserActions from "./AuthUserActions";
import Settings from "./Settings";
import PreviousSimulations from "./PreviousSimulations";
import NotFound from "./NotFound";

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
        <Route path="/home" element={<ProtectedRoute outlet={<Home />} />} />
        <Route
          path="/simulation"
          element={<ProtectedRoute outlet={<RunSimulation />} />}
        />
        <Route
          path="/previous-simulations"
          element={<ProtectedRoute outlet={<PreviousSimulations />} />}
        />
        <Route
          path="/settings"
          element={<ProtectedRoute outlet={<Settings />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
