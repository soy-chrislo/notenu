import React from 'react'

function LoginView() {
  const nameForm = React.useRef<HTMLInputElement>(null)
  const passwordForm = React.useRef<HTMLInputElement>(null)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const username = nameForm.current?.value
    const password = passwordForm.current?.value

    // TODO: Re-enviar a dashboard si el usuario ya esta logueado
    const response = fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 500){
          console.log('El usuario no se encuentra registrado o sus credenciales son invalidas.');
          return;
        }
        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        // Se trata de re-dirigir a dashboard pero esta protegido
        window.location.href = '/dashboard';
      })
  };

  return (
    <>
      <div>LoginView</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">name</label>
        <input type="text" name="name" id="name" ref={nameForm} />
        <label htmlFor="password">password</label>
        <input type="password" name="password" id="password" ref={passwordForm} />
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default LoginView