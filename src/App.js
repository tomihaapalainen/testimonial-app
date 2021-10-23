import { BrowserRouter, Route, Switch } from "react-router-dom";

import UserProvider from "./contexts/user";
import PrivateRoute from "./routes/PrivateRoute";
import SignInRoute from "./routes/SignInRoute";
import DashboardPage from "./pages/dashboard";
import LandingPage from "./pages/landing";
import RegisterPage from "./pages/register";
import NavigationBar from "./common/navigation/NavigationBar";
import RequestPage from "./pages/request";
import ThankYouPage from "./pages/thankyou";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <NavigationBar />
        <Switch position="fixed">
          <PrivateRoute path="/dashboard" component={DashboardPage} />
          <PrivateRoute path="/register" component={RegisterPage} />
          <Route path="/thankyou" component={ThankYouPage} />
          <Route path="/request/:id" component={RequestPage} />
          <SignInRoute path="/" component={LandingPage} />
        </Switch>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
