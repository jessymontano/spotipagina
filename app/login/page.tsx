'use client';

import Image from 'next/image';
import {FormEvent, useState } from 'react';

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
        <form className= "space-y-3 w-full mx-auto mt-8 bg-black bg-opacity-70" onSubmit={handleSubmit}>
            <div className='flex-1 mx-auto bg-blend-darken max-w-xl px-6 pb-4 pt-8 text-white'>
                <div className='text-center m-2'>
                <Image className='mx-auto mb-6' src={'/images/creeper.png'} alt='Creeper de minecraft' width={100} height={100}></Image>
                <h1 className='mb-3 text-2xl text-center'>Login</h1>
                </div>
                <div className='w-full'>
                    <div>
                        <label className='mb-3 mt-5 block text-sm font-medium' htmlFor="username">
                            Username
                        </label>
                        <div className='relative'>
                            <input 
                            className='peer block w-full bg-black border border-white py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400 focus:outline-none'
                            type="text" 
                            id="username"
                            name="username"
                            placeholder="Introduce tu nombre de usuario"
                            required
                            />
                            <svg 
                            className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400'
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24"> 
                            <path d="M15 2H9v2H7v6h2V4h6V2zm0 8H9v2h6v-2zm0-6h2v6h-2V4zM4 16h2v-2h12v2H6v4h12v-4h2v6H4v-6z" fill="currentColor"/> </svg>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <label 
                        className='mb-3 mt-5 block text-sm font-medium'
                        htmlFor="password"
                        >
                            Password
                        </label>
                        <div className='relative'>
                            <input 
                            className='peer block w-full bg-black border border-white py-[9px] pl-10 text-sm outline-2 focus:outline-none placeholder:text-gray-400'
                            type="password" 
                            name="password" 
                            id="password"
                            placeholder="Introduce la contraseña"
                            required
                            minLength={6} />
                            <svg 
                            className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400'
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24"> <path d="M15 2H9v2H7v4H4v14h16V8h-3V4h-2V2zm0 2v4H9V4h6zm-6 6h9v10H6V10h3zm4 3h-2v4h2v-4z" fill="currentColor"/> </svg>
                        </div>
                    </div>
                </div>
                <div className='mt-8 text-center justify-center'>
                <button className='minecraft-btn mt-4 flex mx-auto w-64 justify-center text-white truncate p-1 border-2 border-b-4 hover:text-yellow-200' type='submit'>
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