import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import { Switch, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [isLogged, setLogged] = useState();


  useEffect(() => {
    const fetchData = async () => {
      var myHeaders = new Headers();

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        credentials: 'include',
        mode: 'cors'
      };

      let response = await fetch("http://localhost:8000/auth/isLogged", requestOptions);
      if (response.status === 200) {
        setLogged(() => 1);
      } else {
        setLogged(() => 0);
      }
    }

    fetchData();
  }, []);

  const logOut = async () => {
    var myHeaders = new Headers();

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      credentials: 'include',
      mode: 'cors'
    };

    let response = await fetch("http://localhost:8000/auth/logout", requestOptions);
    if (response.status === 200) {
      setLogged(() => 0);
    }
  };


  console.log('isLogged value: ' + isLogged);
  if (!isLogged) {
    return (
      <div className="App">
        <Switch>
          <Route path="/login" render={() => <Login setLogged={setLogged} />} exact />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={async () => await logOut()}>Log out</button>
      </div>
    )
  }
}

export default App;
