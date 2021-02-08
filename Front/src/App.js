import './App.css';
import Home from './Home/Home'
import { Switch, Route, NavLink, Link } from 'react-router-dom';
import Login from './Home/Login';

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
        </Route>
      </Switch> 
    </div>
  );
}

export default App;
