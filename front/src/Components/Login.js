import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Form.css';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitData = (event) => {
        event.preventDefault();
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            username: username,
            password: password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
            credentials: 'include',
            mode: 'cors'
        };

        fetch("http://localhost:8000/auth", requestOptions)
        .then(response => {
            return response.text();
        })
        .then(result => {
            props.setLogged(1);
        })
        .catch(error => console.log('error', error));

        setUsername('');
        setPassword('');

    }

    return (
        <>
        <div className='wrapper-light-login'>
            <div style={{ width: '100%' }}>
                <h1 className='form-title-light'>Login</h1>
                <form>
                    <input value={username} onChange={e => setUsername(e.target.value)} className='text-input-light' type='text' placeholder='Username '></input>
                    <input value={password} onChange={e => setPassword(e.target.value)} className='text-input-light' type='password' placeholder='Password '></input>
                    <button onClick={submitData} className='create-btn'>Login</button>
                    <div style={{ textAlign: 'right', marginTop: '30px' }}><Link to="/register">Don't have an account?</Link></div>
                </form>
            </div>
        </div>
        </>
    );
}

export default Login;