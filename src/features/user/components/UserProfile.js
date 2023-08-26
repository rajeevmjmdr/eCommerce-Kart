import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TrashIcon, PencilSquareIcon ,PlusIcon} from "@heroicons/react/20/solid";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";
import Modal from "../../common/Modal";
import { useAlert } from 'react-alert';

export default function UserProfile() {
  const [openModal, setOpenModal] = useState(-1);
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const alert = useAlert();
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const handleRemove = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };
  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
    alert.success('User Address Updated', {
      timeout: 3000
    })
  };
  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    setShowAddAddressForm(false);
    const address = user.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("phone", address.phone);
    setValue("country", address.country);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pincode", address.pincode);

  };
  const onSubmit = (data) => {
    handleEdit(data, selectedEditIndex);
    reset();
  };
  const onSubmitAdd = (address) => {
    const newUser = { ...user, addresses: [...user.addresses,address] };
    dispatch(updateUserAsync(newUser));
    reset();
    setShowAddAddressForm(false);
    alert.success('New Address Added', {
      timeout: 3000
    })
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 mt-5 bg-white">
      <div className="border-b border-gray-900/10 pb-10 ">
        <h1 className="py-3 sm:text-xl lg:text-3xl font-bold tracking-tight text-gray-500 border-b border-gray-200">
          Name: {user ? user.name : "New User"}
        </h1>
        <h1 className="py-3 sm:text-xl lg:text-2xl font-bold tracking-tight text-red-500">
          email: {user && user.email}
        </h1>
        {user && user.role==='admin'?<h1 className="py-3 text-xl font-bold tracking-tight text-blue-500">
          role: {user.role}
        </h1>:<></>}
        <button
          type="button"
          onClick={()=>(setShowAddAddressForm(true),setSelectedEditIndex(-1),reset())}
          className="text-lg font-semibold leading-6 text-green-500"
        >
          <span className="flex"><PlusIcon className="h-6 w-6 text-green-500"></PlusIcon>Add New Address</span>
        </button>
        {showAddAddressForm ? (
                  <form onSubmit={handleSubmit(onSubmitAdd)} noValidate>
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
                              {...register("name", {
                                required: "Name is required",
                              })}
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
                                  value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,// eslint-disable-line
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
                                    /^0{0,1}[1-9]{1}[0-9]{2}[\s]{0,1}[\-]{0,1}[\s]{0,1}[1-9]{1}[0-9]{6}$/g,// eslint-disable-line
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
                              {...register("city", {
                                required: "city is required",
                              })}
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
                          onClick={(e) => setShowAddAddressForm(false)}
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Cancel
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
                ) : null}
        <p className="mt-1 text-sm leading-6 text-gray-600">Your Address</p>

        <ul>
          {user && user.addresses &&
            user.addresses.map((address, index) => (
              <div key={index}>
                {selectedEditIndex === index ? (
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
                              {...register("name", {
                                required: "Name is required",
                              })}
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
                                  value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, // eslint-disable-line
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
                                    /^0{0,1}[1-9]{1}[0-9]{2}[\s]{0,1}[\-]{0,1}[\s]{0,1}[1-9]{1}[0-9]{6}$/g, // eslint-disable-line
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
                              {...register("city", {
                                required: "city is required",
                              })}
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
                          onClick={(e) => setSelectedEditIndex(-1)}
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Edit Address
                        </button>
                      </div>
                    </div>
                  </form>
                ) : null}
                <li
                  key={index}
                  className="flex justify-between gap-x-6 py-5 border mt-3 px-4"
                >
                  <div className="flex gap-x-4">
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
                  <div className=" sm:flex sm:flex-col sm:items-end">
                    <div className="flex">
                      <button
                        type="button"
                        onClick={(e) => handleEditForm(index)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        <PencilSquareIcon className="h-6 w-6 text-blue-500" />
                      </button>{" "}
                      <Modal
                            title={`Delete Address: ${address.name}`}
                            message="Do you want to delete this item ?"
                            dangerOption="Delete"
                            cancelOption="Cancel"
                            setModal={openModal === index}
                            dangerAction={(e) => handleRemove(e, index)}
                            cancelAction={(e) => setOpenModal(-1)}
                          ></Modal>
                      <button
                        type="button"
                        onClick={(e) => setOpenModal(index)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        <TrashIcon className="h-6 w-6 text-red-500" />
                      </button>
                    </div>
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
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
}
