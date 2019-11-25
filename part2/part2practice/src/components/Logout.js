import React from 'react';

const Logout = (props) => {
  const { user, clearUser } = props;
  console.log('user from logout component', user)

  const logMeOut = () => {
    window.localStorage.clear();
    clearUser();
  };
  return(
    <>
      {user.name? user.name: user.username} is logged in
      <button onClick={logMeOut}>logout</button>
    </>
  );
};

export default Logout;
