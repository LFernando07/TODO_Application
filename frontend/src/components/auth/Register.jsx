
export const Register = () => {
  return (
    <div className="signup">
      <form>
        <label htmlFor="chk" aria-hidden="true">Registro</label>
        <input type="text" name="txt" placeholder="Nombre Completo" required />
        <input type="text" name="txt" placeholder="Usuario" required />
        <input type="email" name="email" placeholder="Correo" required />
        <input type="number" name="broj" placeholder="Telefono" required />
        <input type="password" name="pswd" placeholder="Contraseña" required />
        <button>Registrarse</button>
      </form>
    </div>

  )
}
