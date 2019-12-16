import React from 'react';
import PropTypes from 'prop-types';

const LoginForm  = (props) => {
  const { handleLogin, username, password,
    handleUsernameChange, handlePasswordChange } = props;

  LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  };
  return (
    <>
      <form onSubmit= {handleLogin}>
        <div>
          username
          <input type="text"
            id='username'
            value={username}
            onChange={( { target } ) => handleUsernameChange(target.value)} />
        </div>
        <div>
          password
          <input type="password"
            id='password'
            value={password}
            onChange={( { target } ) => handlePasswordChange(target.value)} />
        </div>

        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;