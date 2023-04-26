import './App.css';
import Header from './Header/Header';
import { Routes, Route} from 'react-router-dom';
import BoxToys from './MainComponents/BoxToys/BoxToys';
import BoxToyID from './MainComponents/BoxToys/BoxToyID';
import LoginForm from './MainComponents/Subscribe/LogIn/LoginForm';
import LoggedInAdmin from './MainComponents/Subscribe/LoggedInAdmin/LoggedInAdmin';
import LoggedInUser from './MainComponents/Subscribe/LoggedInUser/LoggedInUser'
import Register from './MainComponents/Subscribe/Register/Register';

function App() {

  return (
    <div className="App">
        <Header />
        <Routes>
          <Route path='/products' element={<BoxToys />}/>
          <Route path='/product/:id' element={<BoxToyID />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<LoginForm />}/>
          <Route path='/loggedin/admin' element={<LoggedInAdmin />}/>
          <Route path='/loggedin/user' element={<LoggedInUser />}/>
        </Routes>
    </div>
  );
}

export default App;
