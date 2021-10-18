import { BrowserRouter, Switch } from "react-router-dom";

import UserProvider from "./contexts/user";
import PrivateRoute from "./routes/PrivateRoute";
import SignInRoute from "./routes/SignInRoute";
import DashboardPage from "./pages/dashboard";
import LandingPage from "./pages/landing";
import RegisterPage from "./pages/register";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Switch position="fixed">
          <PrivateRoute path="/dashboard" component={DashboardPage} />
          <PrivateRoute path="/register" component={RegisterPage} />
          <SignInRoute path="/" component={LandingPage} />
        </Switch>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
