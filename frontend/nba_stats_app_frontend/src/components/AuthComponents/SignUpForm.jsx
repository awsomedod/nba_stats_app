import React, { useState } from 'react';
import axios from 'axios';
import { Badge } from '@radix-ui/themes'; // Import Badge component from Radix UI

const SignUpForm = ( {onSuccess} ) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // State to handle message type (success or error)
    const [passwordError, setPasswordError] = useState(''); // State to handle password mismatch error
  

  const handleRegister = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
        setPasswordError('Passwords do not match');
        setMessageType('error'); // Set message type to error
        return;
      }


    try {
        const response = await axios.post('https://nba-stats-app-api.azurewebsites.net/register', {
            username,
            email,
            password
        });
        setMessage(response.data.message);
        setMessageType('success'); // Set message type to success
        setPasswordError(''); // Clear the password error on successful registration
        onSuccess(username); // Call onSuccess with the username
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.error);
        } else {
          setMessage('Registration failed: ' + error.message);
        }
        setMessageType('error'); // Set message type to error
      }
    };
return (
    <form onSubmit={handleRegister}>
                <p className="mb-5 text-mauve11 text-[15px] leading-normal">Create a new account</p>
                <div className='mb-3'>
                {message && <Badge color={messageType === 'success' ? 'green' : 'red'}>{message}</Badge>}
                {passwordError && <Badge color="red">{passwordError}</Badge>}
                </div>
                <fieldset className="mb-[15px] w-full flex flex-col justify-start">
                  <label className="text-[13px] leading-none mb-2.5 text-violet12 block" htmlFor="newUsername">Username</label>
                  <input
                    className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                    id="newUsername"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </fieldset>
                <fieldset className="mb-[15px] w-full flex flex-col justify-start">
                  <label className="text-[13px] leading-none mb-2.5 text-violet12 block" htmlFor="email">Email</label>
                  <input
                    className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="mb-[15px] w-full flex flex-col justify-start">
                  <label className="text-[13px] leading-none mb-2.5 text-violet12 block" htmlFor="newPassword">Password</label>
                  <input
                    className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                    id="newPassword"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </fieldset>
                <fieldset className="mb-[15px] w-full flex flex-col justify-start">
                  <label className="text-[13px] leading-none mb-2.5 text-violet12 block" htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </fieldset>
                <div className="flex justify-end mt-5">
                  <button className="inline-flex items-center justify-center rounded px-[15px] text-[15px] leading-none font-medium h-[35px] bg-green4 text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 outline-none cursor-default">
                    Sign Up
                  </button>
                </div>
              </form>
);
};
export default SignUpForm;