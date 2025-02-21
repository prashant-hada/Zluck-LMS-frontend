import { useForm } from "react-hook-form";
import { useRegister } from "../services/mutation";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/user/userSlice";
import { useState } from "react";
import { PuffLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [sumbitOngoing, setSubmitOngoing] = useState (false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const registerMutation = useRegister()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Register Data:", data);
    registerMutation.mutate(data, {
      onSuccess: (response) => {
        console.log("Registration successful:", response);
        dispatch(loginSuccess(response.user)); // Save user in Redux
        navigate("/");
        setSubmitOngoing(false);
      },
      onError: (error) => {
        console.error("Registration failed:", error);
        setSubmitOngoing(false);
      },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 gap-6">
      <h1>ILib: Your go to LMS </h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

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
              {...register("password", { required: "Password is required", minLength: 6 })}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
            disabled={sumbitOngoing}
              {...register("role", { required: "Role is required" })}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            >
              <option value="" className=" text-black/50">Select Role</option>
              <option value="ADMIN">Admin</option>
              <option value="LIBRARIAN">Librarian</option>
              <option value="MEMBER">Member</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={sumbitOngoing}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
          >
            
            {sumbitOngoing? 
              <>
              <PuffLoader size={20} loading={true} color="#fffafa" /> <span>Please Wait...</span>
              </>
              :
              <span>Register</span>
            }
          </button>
        </form>
      </div>
    </div>
  );
}
