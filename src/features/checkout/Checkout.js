import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  deleteItemFromCartAsync,
  selectitems,
  updateCartAsync,
} from "../cart/cartSLice";
import { useForm } from "react-hook-form";
import { createOrderAsync, selectCurrentOrder } from "../order/orderSlice";
import { selectUserInfo, updateUserAsync } from "../user/userSlice";

const Checkout = () => {
  const [open, setOpen] = useState(true);
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const items = useSelector(selectitems);
  const totalAmount = items.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const currentOrder = useSelector(selectCurrentOrder);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ ...item, quantity: +e.target.value }));
  };
  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  const onSubmit = (data) => {
    console.log(data);
    dispatch(
      updateUserAsync({ ...user, addresses: [...user.addresses, data] })
    );
    reset();
  };

  const handleAddress = (e) => {
    console.log(e.target.value);
    setSelectedAddress(user.addresses[e.target.value]);
  };

  const handlePayment = (e) => {
    console.log(e.target.value);
    setPaymentMethod(e.target.value);
  };

  const handleOrder = (e) => {
    if (selectedAddress && paymentMethod) {
      const order = {
        user,
        items,
        totalAmount,
        totalItems,
        selectedAddress,
        paymentMethod,
        status: "Pending",
      };
      dispatch(createOrderAsync(order));
    } else {
      alert("Please select Address and Payment method");
    }
    // TODO : on server change stock
  };
  return (
    <>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}
      {currentOrder && (
        <Navigate
          to={`/order_success/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-1">
        <div className="lg:col-span-3 px-5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 mt-10 bg-white">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="border-b border-gray-900/10 pb-12">
                <h1 className="text-base font-bold leading-7 text-gray-900 py-4 pb-1">
                  Personal Information
                </h1>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="name"
                        {...register("name", { required: "Name is required" })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.fullName && (
                      <span className="text-red-500">
                        {errors.fullName?.message}
                      </span>
                    )}
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        {...register("email", {
                          required: "email is required",
                          pattern: {
                            value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                            message:
                              "Email should be in example@mail.com format",
                          },
                        })}
                        type="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.email && (
                      <span className="text-red-500">
                        {errors.email?.message}
                      </span>
                    )}
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone no
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone"
                        {...register("phone", {
                          required: "phone is required",
                          pattern: {
                            value:
                              /^0{0,1}[1-9]{1}[0-9]{2}[\s]{0,1}[\-]{0,1}[\s]{0,1}[1-9]{1}[0-9]{6}$/g,
                            message: "Enter Valid phone no",
                          },
                        })}
                        type="tel"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.phone && (
                      <span className="text-red-500">
                        {errors.phone?.message}
                      </span>
                    )}
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Country
                    </label>
                    <div className="mt-2">
                      <select
                        id="country"
                        {...register("country", {
                          required: "country is required",
                        })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option>India</option>
                      </select>
                    </div>
                    {errors.country && (
                      <span className="text-red-500">
                        {errors.country?.message}
                      </span>
                    )}
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="street"
                        {...register("street", {
                          required: "street is required",
                        })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.street && (
                      <span className="text-red-500">
                        {errors.street?.message}
                      </span>
                    )}
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="city"
                        {...register("city", { required: "city is required" })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.city && (
                      <span className="text-red-500">
                        {errors.city?.message}
                      </span>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="state"
                        {...register("state", {
                          required: "state is required",
                        })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.state && (
                      <span className="text-red-500">
                        {errors.state?.message}
                      </span>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="pincode"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="pincode"
                        {...register("pincode", {
                          required: "pincode is required",
                        })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.pincode && (
                      <span className="text-red-500">
                        {errors.pincode?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    onClick={()=>reset()}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </form>
            <div className="border-b border-gray-900/10 pb-12 ">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Address
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Choose from existing address.
              </p>

              <ul role="list" className="divide-y divide-gray-100">
                {user.addresses &&
                  user.addresses.map((address, index) => (
                    <li
                      key={index}
                      className="flex justify-between gap-x-6 py-5"
                    >
                      <div className="flex gap-x-4">
                        <input
                          onChange={handleAddress}
                          id="address"
                          name="address"
                          value={index}
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />

                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {address.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {address.email}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {address.phone}
                          </p>
                        </div>
                      </div>
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          {address.street}
                        </p>
                        <div className="mt-1 flex items-center gap-x-1.5">
                          <p className="text-xs leading-5 text-gray-500">
                            {address.city}
                          </p>
                          <p className="text-xs leading-5 text-gray-500">
                            {address.state}
                          </p>
                          <p className="text-xs leading-5 text-gray-500">
                            {address.country}
                          </p>
                          <p className="text-xs leading-5 text-gray-500">
                            {address.pincode}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Payment Methods
                  </legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose one
                  </p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="card-payment"
                        name="payment"
                        type="radio"
                        onChange={handlePayment}
                        value="card"
                        checked={paymentMethod === "card"}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="card-payment"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Card Payments
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="cash-payment"
                        name="payment"
                        type="radio"
                        onChange={handlePayment}
                        value="cash"
                        checked={paymentMethod === "cash"}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="cash-payment"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Cash
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-2 space-y-12 mt-10">
            <div className="px-8 mt-8 bg-white">
              <h1 className="py-5 text-4xl font-bold tracking-tight text-gray-900 border-b border-gray-200">
                Cart
              </h1>
              <div className="flow-root">
                <ul role="list" className=" divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.thumbnail}>{item.title}</a>
                            </h3>
                            <p className="ml-4">$ {item.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="ml-3 mr-3 text-sm text-gray-600"
                            >
                              Qty
                            </label>

                            <select
                              onChange={(e) => handleQuantity(e, item)}
                              value={item.quantity}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                          </div>

                          <div className="flex">
                            <button
                              type="button"
                              onClick={(e) => handleRemove(e, item.id)}
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>$ {totalAmount}</p>
              </div>
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Total Items in Cart</p>
                <p>{totalItems} items</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <div
                  onClick={handleOrder}
                  className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Order Now
                </div>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or
                  <Link to="/">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => setOpen(false)}
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Checkout;
