import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import About from "./Containers/About";
import Dashboard from "./Containers/Dashboard";
import Home from "./Containers/Home";
import Login from "./Containers/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/Home" component={Home} />
          <Route path="/About" component={About} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
