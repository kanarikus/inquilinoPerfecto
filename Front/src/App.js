import './App.css';
import Home from './Home/Home'
import { Switch, Route, NavLink, Link } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Recovery from './Auth/Recovery';
import Reset from './Auth/Reset';
import Header from './Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/login" exact>
          <Login/>
          <Register/>
        </Route>
        <Route path="/recovery" exact>
          <Recovery/>
        </Route>
        <Route path="/recovery/:code" exact> 
          <Reset/>
        </Route>
      </Switch> 
    </div>
  );
}

export default App;
