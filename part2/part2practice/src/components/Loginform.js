import React from 'react';

const LoginForm  = (props) => {
  const { handleLogin, username, password,
    handleUsernameChange, handlePasswordChange} = props
  return (
    <>
      <form onSubmit= {handleLogin}>
      <div>
          username 
          <input type="text" 
          value={username} 
          onChange={( {target} ) => handleUsernameChange(target.value)} />
        </div>
        <div>
          password 
          <input type="password" 
          value={password}
          onChange={( {target} )=> handlePasswordChange(target.value)} />
      </div>

      <button type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm;