import { useForm } from "react-hook-form";
import { useLogin } from "../services/mutation";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/user/userSlice";
import { useState } from "react";
import { PuffLoader } from "react-spinners";
import { useNavigate, Link } from "react-router-dom";


export default function Login() {
  const [sumbitOngoing, setSubmitOngoing] = useState (false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginMutation = useLogin()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setSubmitOngoing(true);
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        console.log("Logged In Successfully")
        dispatch(loginSuccess(response.user)); // Save user in Redux
        navigate("/");
        setSubmitOngoing(false);
      },
      onError: (error) => {
        console.error("Login failed:", error);
        setSubmitOngoing(false);
      },
    });
  
    setSubmitOngoing(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              disabled={sumbitOngoing}
              {...register("email", { required: "Email is required" })}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              disabled={sumbitOngoing}
              {...register("password", { required: "Password is required" })}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled= {sumbitOngoing}
            className="w-full flex items-center justify-center gap-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
          >
            {sumbitOngoing? 
              <>
              <PuffLoader size={20} loading={true} color="#fffafa" /> <span>Please Wait...</span>
              </>
              :
              <span>Login</span>
            }
          </button>
        </form>

        {/* Register Link */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          New to this plaform?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Sign Up Now
          </Link>
        </p>
      </div>
      </div>
    </div>
  );
}
