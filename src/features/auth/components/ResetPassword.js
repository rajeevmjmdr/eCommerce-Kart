import { useForm } from "react-hook-form";
import { useDispatch, useSelector} from "react-redux";
import { resetPasswordAsync, selectPasswordReset } from "../authSlice";
import { Link, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const search = useLocation().search
  const searchParams = new URLSearchParams(search);
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const onSubmit = (data) => {
    
    dispatch(resetPasswordAsync({password:data.password,token,email}));
    
  };
  const passwordReset = useSelector(selectPasswordReset);

  return (
    <>
      {(token && email)? <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/logo.png"
            alt="Company logo"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  New Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message: `- at least 8 characters \n
                    - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number \n
                    - Can contain special characters`,
                    },
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.password && (
                <span className="text-red-500">{errors.password?.message}</span>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirm_password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirm_password"
                  {...register("confirm_password", {
                    required: "Confirm password is required",
                    validate: (value, formValues) =>
                      value === formValues.password || "Password not Match",
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.confirm_password && (
                <span className="text-red-500">
                  {errors.confirm_password?.message}
                </span>
              )}
            </div>
            {passwordReset && (
                <span className="text-green-500">password Reset successfully</span>
              )}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send
              </button>
            </div>
          </form>
          {passwordReset && 
                      <p className="mt-10 text-center text-sm text-gray-500">
                      Click to Login
                      <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Login/ Sign In
                      </Link>
                    </p>
          }
        </div>
      </div>:<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/logo.png"
            alt="Company logo"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Link Expire / not Valid
          </h2>
        </div>
        </div>}
    </>
  );
};
export default ResetPassword;
