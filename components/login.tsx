import { signIn } from 'next-auth/react';
import { FaDiscord } from 'react-icons/fa';

type LoginProps = {
};

const Login = ({ }: LoginProps) => {
  return (<div>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
      <button style={{ padding: 4, display: 'flex', alignItems: 'center' }} onClick={() => signIn('discord')}><FaDiscord />&nbsp;Zaloguj się</button>
    </div>
  </div>);
}

export default Login;