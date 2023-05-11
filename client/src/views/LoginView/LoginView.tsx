import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'

function LoginView(): JSX.Element {
  const { user, setUser } = useContext(AuthContext)
  const nameForm = React.useRef<HTMLInputElement>(null)
  const passwordForm = React.useRef<HTMLInputElement>(null)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    
    // TODO: Re-enviar a dashboard si el usuario ya esta logueado
  };
  
  function handleLogin(){
    const username = nameForm.current?.value
    const password = passwordForm.current?.value
    
    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 200){
          // TODO: El backend ahora se encarga de enviar los datos de permissions y roles relacioandos con el usuario.
          setUser(data.user)
          // Se ahorra el jwt ya que toda la validacion se hace gracais al objeto user.
          // localStorage.setItem('token', data.token)
          console.log(user)
        }
      })
  }

  function checkUser() {
    console.log(user)
  }

  return (
    <>
      <button onClick={checkUser}>Check user instance</button>
      <div>LoginView</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">name</label>
        <input type="text" name="name" id="name" ref={nameForm} />
        <label htmlFor="password">password</label>
        <input type="password" name="password" id="password" ref={passwordForm} />
        <button type='submit' onClick={handleLogin}>Login</button>
      </form>
    </>
  )
}

export default LoginView