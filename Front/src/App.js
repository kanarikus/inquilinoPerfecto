import './App.css';
import Home from './Home/Home'
import { Switch, Route } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Recovery from './Auth/Recovery';
import Reset from './Auth/Reset';
import Header from './Header';
import Search from './Search/Search'
import CreateHome from './viviendas/CreateHome';
import Vivienda from './viviendas/Home';
import Validate from './Auth/Validate';
import Profile from './User/Profile';
import UpdateUser from './User/UpdateUser';
import UserHomes from './User/UserHomes';
import UserBookings from './User/UserBookings';

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
        <Route path='/search/:ciudad?'>
          <Search/>
        </Route>
        <Route path='/vivienda/:id' exact>
          <Vivienda/>
        </Route>
        <Route path='/createhome' exact>
          <CreateHome/>
        </Route>
        <Route path='/validate/:code' exact>
          <Validate/>
        </Route>

        <Route path='/user/update/:id' exact>
          <UpdateUser/>
        </Route>
        <Route path='/user/homes/:id' exact>
          <UserHomes/>
        </Route>
        <Route path='/user/:id'>
          <Profile/>
        </Route>
        <Route path='/userbooking' exact>
          <UserBookings/>
        </Route>
      </Switch> 
    </div>
  );
}

export default App;
