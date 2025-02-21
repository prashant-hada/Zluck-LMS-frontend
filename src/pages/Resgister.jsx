import { useForm } from "react-hook-form";
import { useRegister } from "../services/mutation";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const registerMutation = useRegister()

  const onSubmit = (data) => {
    console.log("Register Data:", data);
    registerMutation.mutate(data, {
      onSuccess: (response) => {
        console.log("Registration successful:", response);
        // Store user info in local state, Redux, or context
        // Navigate to dashboard or home page
      },
      onError: (error) => {
        console.error("Registration failed:", error);
      },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
              {...register("password", { required: "Password is required", minLength: 6 })}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
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
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
