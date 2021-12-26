import LoginForm from "./pages/LoginForm";
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ContactsTable from "./pages/Contacts"



function App() {

  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <LoginForm />
          </Route>
          <Route exact path="/contacts">
            <ContactsTable />
          </Route>
        </Switch>
    </Router>

  );
}

export default App;
