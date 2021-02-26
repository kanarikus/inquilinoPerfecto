import './App.css';
import Home from './Home/Home'
import { Switch, Route } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Recovery from './Auth/Recovery';
import Reset from './Auth/Reset';
import Header from './Home/Header';
import Search from './Search/Search'
import CreateHome from './viviendas/CreateHome';
import Vivienda from './viviendas/Home';
import Validate from './Auth/Validate';
import Profile from './User/Profile';
import UpdateUser from './User/UpdateUser';
import UserHomes from './User/UserHomes';
import UserBookings from './User/UserBookings';
import UpdateHome from './viviendas/UpdateHome';
import GetBooking from './bookings/GetBooking';
import ErrorBoundary from './ErrorBoundary';
import Footer from './utils/Footer';



function App() {
  return (
    <div className="App">
      <Header/>
      <div className='page'>
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/login" exact>
          <Login/>
        </Route>
        <Route path='/register' exact>
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
          <ErrorBoundary>
            <Vivienda/>
          </ErrorBoundary>
        </Route>
        <Route path='/createhome' exact>
          <ErrorBoundary>
            <CreateHome/>
          </ErrorBoundary>
        </Route>
        <Route path='/validate/:code' exact>
          <Validate/>
        </Route>
        <Route path='/user/update/:id' exact>
          <ErrorBoundary>
            <UpdateUser/>
          </ErrorBoundary>
        </Route>
        <Route path='/user/homes/:id' exact>
          <UserHomes/>
        </Route>
        <Route path='/userbooking' exact>
          <UserBookings/>
        </Route>
        <Route path='/myhome/:id' exact>
          <ErrorBoundary>
            <UpdateHome/>
          </ErrorBoundary>
        </Route>
        <Route path='/booking/:id' exact>
          <GetBooking/>
        </Route>
        <Route path='/user/profile/:id'>
          <Profile/>
        </Route>
      </Switch>
      <Footer/>
      </div>
    </div>
  );
}

export default App;
