import './App.css';
import Home from './Home/Home'
import { Switch, Route, NavLink, Link } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Recovery from './Auth/recovery';
import Reset from './Auth/Reset';

function App() {
  return (
    <div className="App">
      <header>
        <Link to="/">Logo</Link>
        <div>
          <NavLink active="active" to="/login">Iniciar Sesión</NavLink>
        </div>
      </header>
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
