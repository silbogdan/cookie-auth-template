import React, { useState } from 'react';
import '../Styles/Form.css';
import { Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const submitData = (event) => {
        event.preventDefault();
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            username: username,
            password: password,
            email: email
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:8000/auth/register", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        setUsername('');
        setPassword('');
        setEmail('');
    }

    return (
        <>
        <div className='wrapper-light-login'>
            <div style={{ width: '100%' }}>
                <h1 className='form-title-light'>Register</h1>
                <form>
                    <input value={email} onChange={e => setEmail(e.target.value)} className='text-input-light' tpye='text' placeholder='Email'></input>
                    <input value={username} onChange={e => setUsername(e.target.value)} className='text-input-light' type='text' placeholder='Username '></input>
                    <input value={password} onChange={e => setPassword(e.target.value)} className='text-input-light' type='password' placeholder='Password '></input>
                    <button onClick={submitData} className='create-btn'>Create</button>
                    <div style={{ textAlign: 'right', marginTop: '30px' }}><Link to="/login">Already have an account?</Link></div>
                </form>
            </div>
        </div>
        </>
    );
}

export default Register;