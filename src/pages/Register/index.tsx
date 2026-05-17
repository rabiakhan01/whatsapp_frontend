import RegisterForm from "../../components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="flex items-center justify-center h-screen py-4.5 overflow-hidden">
      <div className="w-full mx-auto max-w-400 h-full">
       <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
