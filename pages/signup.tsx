import AuthForm from '../components/authForm';

export default function Signup() {
  return <AuthForm mode={'signup'} />;
}

Signup.authPage = true;
