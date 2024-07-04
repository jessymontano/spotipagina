'use client';

import { error } from 'console';
import {FormEvent, use, useState } from 'react';

//pagina del login
export default function LoginPage() {
    const [errorMessage, setErrorMessage] = useState<string>('');
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
            setErrorMessage('Invalid credentials')
        }
    }
    return (
        <form className="space-y-3 max-w-lg mx-auto mt-8" onSubmit={handleSubmit}>
            <div className='flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8'>
                <h1 className='mb-3 text-2xl text-center'>Login</h1>
                <div className='w-full'>
                    <div>
                        <label className='mb-3 mt-5 block text-sm font-medium text-gray-900' htmlFor="username">
                            Username
                        </label>
                        <div className='relative'>
                            <input 
                            className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
                            type="text" 
                            id="username"
                            name="username"
                            placeholder="Introduce tu nombre de usuario"
                            required
                            />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <label 
                        className='mb-3 mt-5 block text-sm font-medium text-gray-900'
                        htmlFor="password"
                        >
                            Password
                        </label>
                        <div className='relative'>
                            <input 
                            className='peer block w-full rounded-md border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
                            type="password" 
                            name="password" 
                            id="password"
                            placeholder="Introduce la contraseña"
                            required
                            minLength={6} />
                        </div>
                    </div>
                </div>
                <div className='text-center'>
                <button className='mt-4 py-1 w-60 bg-blue-400 rounded-md hover:bg-blue-100' type='submit'>
                    Log in
                </button>
                </div>
                <div className='flex h-8 items-end space-x-1 '>
                    {errorMessage && 
                        <div className='text-red-600 mb-3 mt-6 text-sm text-center'>{errorMessage}</div>
                    }
                </div>
            </div>
        </form>
    )
}