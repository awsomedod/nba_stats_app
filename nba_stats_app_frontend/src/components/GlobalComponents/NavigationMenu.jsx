import React, { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import AccountCard from '../AuthComponents/AccountCard';
import { useAuth } from '../AuthComponents/AuthContext';
import { useLocation, Link } from 'react-router-dom'; // Make sure to import useLocation
import * as Dialog from '@radix-ui/react-dialog';

const NavigationMenuComponent = () => {
  const [isSignInVisible, setSignInVisible] = useState(false);
  const [defaultTab, setDefaultTab] = useState('signIn');
  const { isLoggedIn, logout } = useAuth();
  
  const location = useLocation();
  const isPlayerPage = location.pathname === '/player';
  const isTeamPage = location.pathname === '/team';

  const handleOutsideClick = (event) => {
    if (!event.target.closest('.sign-in-card') && !event.target.closest('.sign-in-trigger')) {
      setSignInVisible(false);
    }
  };

  const handleLogOut = (event) => {
    logout();
  }

  React.useEffect(() => {
    if (isSignInVisible) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isSignInVisible]);

  return (
    <>
      <NavigationMenu.Root className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 shadow-md">
        <div className="flex justify-between items-center px-4 py-2">
          <NavigationMenu.List className="flex space-x-4">
            <NavigationMenu.Item>
                <Link to="/">
                    <NavigationMenu.Trigger className="px-3 py-2 text-gray-800 hover:bg-gray-200 hover:bg-opacity-60 rounded transition duration-200 text-xl font-bold">
                        StatSwish
                    </NavigationMenu.Trigger>
              </Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
                <Link to="/player">
                    <NavigationMenu.Trigger className={`px-3 py-2 text-gray-800 hover:bg-gray-200 hover:bg-opacity-60 rounded transition duration-200 text-lg ${isPlayerPage ? 'bg-gray-200 bg-opacity-50' : ''}`}>
                    Players
                </NavigationMenu.Trigger>
              </Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <Link to="/team">
                  <NavigationMenu.Trigger className={`px-3 py-2 text-gray-800 hover:bg-gray-200 hover:bg-opacity-60 rounded transition duration-200 text-lg ${isTeamPage ? 'bg-gray-200 bg-opacity-50' : ''}`}>
                  Teams
                </NavigationMenu.Trigger>
              </Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
          <NavigationMenu.List className="flex space-x-4">
          {isLoggedIn ? (
              <NavigationMenu.Item>
                <NavigationMenu.Trigger
                  className="px-3 py-2 text-white bg-red-600 bg-opacity-85 hover:bg-red-500 border hover:bg-opacity-50 rounded transition duration-200"
                  onClick={handleLogOut}
                >
                  Sign Out
                </NavigationMenu.Trigger>
              </NavigationMenu.Item>
            ) : (
              <>
                <NavigationMenu.Item>
                  <NavigationMenu.Trigger
                    className="px-3 py-2 text-gray-800 bg-white hover:bg-gray-200 border hover:bg-opacity-65 rounded transition duration-200 sign-in-trigger">
                      <Dialog.Root>
                        <Dialog.Trigger asChild>
                          <button>
                            Sign In
                          </button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                            <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                              <AccountCard defaultTab={'signIn'}/>

                            </Dialog.Content>
                        </Dialog.Portal>
                      </Dialog.Root>
                  </NavigationMenu.Trigger>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                  <NavigationMenu.Trigger
                    className="px-3 py-2 text-white bg-gray-800 hover:bg-gray-500 border hover:bg-opacity-65 rounded transition duration-200 sign-in-trigger">
                      <Dialog.Root>
                        <Dialog.Trigger asChild>
                          <button>
                            Sign Up
                          </button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                            <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                              <AccountCard defaultTab={'signUp'}/>

                            </Dialog.Content>
                        </Dialog.Portal>
                      </Dialog.Root>
                  </NavigationMenu.Trigger>
                </NavigationMenu.Item>

              </>
            )}
          </NavigationMenu.List>
        </div>
      </NavigationMenu.Root>
    </>
  );
};

export default NavigationMenuComponent;
