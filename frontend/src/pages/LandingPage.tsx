import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100%">
      <div className="p-10 bg-white rounded shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4"><center>Welcome to Fixitfor.us</center></h1>
        <p className="text-gray-600 mb-8">
	<center>Login or register to access the system. If you are a shop member, please contact support to have your account created</center>
        </p>
        <center><Link
          to="/login"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </Link></center>
      </div>
    </div>
  );
};