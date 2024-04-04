import LoginForm from './LoginForm'
import Notify from './Notify'

const Login = ({error, setToken, setError}) => {

    return (
         <div>
         <Notify
         error={error}
         />
         <LoginForm
         setToken={setToken}
         setError={setError}
         />
       </div>
    )
}

export default Login