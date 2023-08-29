import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom";
import { resetPasswordRequestAsync, selectmailSent } from "../authSlice";


const ForgotPassword = ()=>{
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const mailSent = useSelector(selectmailSent);
  const onSubmit = data => {
    //console.log(data)
    dispatch(resetPasswordRequestAsync(data));
    //TODO :  implement through backend 
  };

    return (
      <>
<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/logo.png"
            alt="Company logo"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Enter email to reset password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6"  onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", { required: 'Email is required', 
                  pattern: {
                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                    message:"Email should be in example@mail.com format"  
                  }})}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.email && <span className="text-red-500">{errors.email?.message}</span>}
            </div>
            {(mailSent && mailSent.success)? <span className="text-green-500">mail sent to {mailSent.value.message}</span>
            : (mailSent && mailSent.error) ? <span className="text-red-500">{mailSent.value.errdata && mailSent.value.errdata.message}</span>:
            null}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
           Send me back to Login{' '}
            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Login
            </Link>
          </p>
        </div>
      </div>
      </>
    );
}
export default ForgotPassword