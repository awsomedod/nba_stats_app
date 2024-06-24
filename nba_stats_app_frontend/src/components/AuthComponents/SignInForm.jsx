import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Badge } from '@radix-ui/themes'; // Import Badge component from Radix UI

const SignInForm = ({prefilledUsername, onClose}) => {
    const [username, setUsername] = useState(prefilledUsername || '');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false); // State to handle success message
    const { login } = useAuth();

    useEffect(() => {
        setUsername(prefilledUsername);
      }, [prefilledUsername]);

    const handleLogin = async (event) => {
        event.preventDefault();
        const base64Credentials = btoa(`${username}:${password}`);
        const response = await fetch('https://nba-stats-app-api.azurewebsites.net/login', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${base64Credentials}`,
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.user_id)
            login();
            setError('');
            setSuccess(true)
            console.log("YES")
        } else {
            setError(data.error);
            setSuccess(false); // Set success state to false
        }
    };

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                onClose(); // Call the onClose prop after 2 seconds
            }, 1000);
            return () => clearTimeout(timer); // Cleanup the timer on component unmount
        }
    }, [success, onClose]);

    return (
    <form onSubmit={handleLogin}>
        <p className="mb-5 text-mauve11 text-[15px] leading-normal">Sign in to your account</p>
        <div className='mb-3'>
        {success && <Badge color="green" size={"2"}>Sign In Successful</Badge>}
        {error && <Badge color="red" size={"2"}>{error}</Badge>}
        </div>
        <fieldset className="mb-[15px] w-full flex flex-col justify-start">
            <label className="text-[13px] leading-none mb-2.5 text-violet12 block" htmlFor="username">Username</label>
            <input
            className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
        </fieldset>
        <fieldset className="mb-[15px] w-full flex flex-col justify-start">
            <label className="text-[13px] leading-none mb-2.5 text-violet12 block" htmlFor="password">Password</label>
            <input
            className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </fieldset>
        <div className="flex justify-end mt-5">
            <button className="inline-flex items-center justify-center rounded px-[15px] text-[15px] leading-none font-medium h-[35px] bg-green4 text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 outline-none cursor-default">
            Sign In
            </button>
        </div>
    </form>
    );
};

export default SignInForm;