
export const Login = () => {
  return (
    <div className="login">
      <form>
        <label htmlFor="chk" aria-hidden="true">Ingresar</label>
        <input type="email" name="email" placeholder="Email" required="" />
        <input type="password" name="pswd" placeholder="Password" required="" />
        <button>Inicar Sesion</button>
      </form>
    </div>
  )
}
