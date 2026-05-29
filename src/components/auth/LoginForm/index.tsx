const LoginForm = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Container */}
      <div className="max-w-md space-y-8 p-10 rounded-xl">
        <div className="text-center dark:text-white">
          <h2 className="text-3xl font-bold mt-6">Welcome</h2>
          <p className="mt-2 text-sm">Sign In</p>
        </div>
        {/* Form */}
        <div>
          <form className="mt-4 space-y-6"></form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
