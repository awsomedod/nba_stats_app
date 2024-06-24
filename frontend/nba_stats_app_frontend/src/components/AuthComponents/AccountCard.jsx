import React,  { useState } from 'react';
import {Box} from '@radix-ui/themes';
import * as Tabs from '@radix-ui/react-tabs';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';


const AccountCard = ({ defaultTab, onClose }) => {
    const [activeTab, setActiveTab] = useState(defaultTab);
    const [prefilledUsername, setPrefilledUsername] = useState('');
  
    const handleRegistrationSuccess = (username) => {
      setActiveTab('signIn');
      setPrefilledUsername(username);
    };
    
    return (
<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-8 bg-transparent rounded-lg">
        <Box className="max-w-lg sign-in-card p-6 rounded-lg" style={{ minHeight: '550px' }}>
          <Tabs.Root className="flex flex-col w-full shadow-[0_2px_10px] shadow-blackA2" value={activeTab} onValueChange={setActiveTab}>
            <Tabs.List className="shrink-0 flex border-b border-mauve6" aria-label="Sign In or Sign Up">
              <Tabs.Trigger
                className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px]  outline-none cursor-default"
                value="signIn"
              >
                Sign In
              </Tabs.Trigger>
              <Tabs.Trigger
                className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] outline-none cursor-default"
                value="signUp"
              >
                Sign Up
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content className="grow p-5 bg-white rounded-b-md outline-none " value="signIn">
            <SignInForm prefilledUsername={prefilledUsername}/>
            </Tabs.Content>
            <Tabs.Content className="grow p-5 bg-white rounded-b-md outline-none " value="signUp">
              <SignUpForm onSuccess={handleRegistrationSuccess} />
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </div>
    </div>
  );
};
    

export default AccountCard;