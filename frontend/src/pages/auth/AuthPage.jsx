import { Register } from '../../components/auth/Register';
import { Login } from '../../components/auth/Login';
import '../../styles/Auth.css';

export const AuthPage = () => {
  return (
    <div className="container">
      <input type="checkbox" id="chk" aria-hidden="true" />
      <Register />
      <Login />
    </div>
  )
}
