import AuthForm from '../components/authForm';

export default function Signin() {
  return <AuthForm mode={'signin'} />;
}

Signin.authPage = true;
