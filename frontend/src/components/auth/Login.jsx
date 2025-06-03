
export const Login = () => {
  return (
    <div className="login">
      <form>
        <label htmlFor="chk" aria-hidden="true">Iniciar Sesion</label>
        <input type="email" name="email" placeholder="Correo" required />
        <input type="password" name="pswd" placeholder="Contraseña" required />
        <button>Ingresar</button>
      </form>
    </div>
  )
}
