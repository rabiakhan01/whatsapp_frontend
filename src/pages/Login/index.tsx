import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen py-4.5 overflow-auto">
      <div className="w-full mx-auto max-w-400 h-full">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
