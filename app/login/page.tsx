'use client';

import {FormEvent } from 'react';

//pagina del login
export default function LoginPage() {
    //funcion que se encarga de llamar al api cuando se da click al boton submit
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username = formData.get('username');
        const password = formData.get('password');
        
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password}),
        });
        
        if (response.ok) {
            window.location.href = '/login'; //creo qe esto nose hace
        } else {
            console.log('invalid credentials');
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h1>Login</h1>
                <div>
                    <div>
                        <label htmlFor="username">
                            Username
                        </label>
                        <div>
                            <input 
                            type="text" 
                            id="username"
                            name="username"
                            placeholder="Introduce tu nombre de usuario"
                            required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password">
                            Password
                        </label>
                        <div>
                            <input 
                            type="password" 
                            name="password" 
                            id="password"
                            placeholder="Introduce la contraseña"
                            required
                            minLength={6} />
                        </div>
                    </div>
                </div>
                <button type='submit'>
                    Log in
                </button>
            </div>
        </form>
    )
}