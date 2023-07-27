import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
const Checkout = () => {
  const [open, setOpen] = useState(true);
  const addresses = [
    {
      name: "Rajeev Majumdar",
      email: "rajeevmjmdr@gmail.com",
      phone: "1231231234",
      city: "Barasat",
      state: "West Bengal",
      pincode: "700126",
      country: "India",
      address: "Boys School Road , Near XYZ apartment",
    },
    {
      name: "John Wick",
      email: "johnwick@gmail.com",
      phone: "9035423566",
      city: "Delhi",
      state: "Delhi",
      pincode: "343435",
      country: "India",
      address: "ABC PWS Boys School Road , Near XYZ apartment",
    },
  ];
  const products = [
    {
      id: 1,
      name: "Throwback Hip Bag",
      href: "#",
      color: "Salmon",
      price: "$90.00",
      quantity: 1,
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
      imageAlt:
        "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
    },
    {
      id: 2,
      name: "Medium Stuff Satchel",
      href: "#",
      color: "Blue",
      price: "$32.00",
      quantity: 1,
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
      imageAlt:
        "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    // More products...
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-1">
      <div className="lg:col-span-3 px-5">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 mt-10 bg-white">
            <form>
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
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        First name
                    </label>
                    <div className="mt-2">
                        <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>

                    <div className="sm:col-span-3">
                    <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Last name
                    </label>
                    <div className="mt-2">
                        <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
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
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
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
                        name="country"
                        autoComplete="country-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                        </select>
                    </div>
                    </div>

                    <div className="col-span-full">
                    <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Street address
                    </label>
                    <div className="mt-2">
                        <input
                        type="text"
                        name="street-address"
                        id="street-address"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
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
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>

                    <div className="sm:col-span-2">
                    <label
                        htmlFor="region"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        State / Province
                    </label>
                    <div className="mt-2">
                        <input
                        type="text"
                        name="region"
                        id="region"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>

                    <div className="sm:col-span-2">
                    <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        ZIP / Postal code
                    </label>
                    <div className="mt-2">
                        <input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                    type="button"
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
                {addresses.map((address) => (
                    <li
                    key={address.email}
                    className="flex justify-between gap-x-6 py-5"
                    >
                    <div className="flex gap-x-4">
                        <input
                        id="address"
                        name="address"
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
                        {address.address}
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 mt-10">
        <div className="px-8 mt-8 bg-white">
          <h1 className="py-5 text-4xl font-bold tracking-tight text-gray-900 border-b border-gray-200">
            Cart
          </h1>
          <div className="flow-root">
            <ul role="list" className=" divide-y divide-gray-200">
              {products.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={product.href}>{product.name}</a>
                        </h3>
                        <p className="ml-4">{product.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.color}
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

                        <select>
                          <option id="1">1</option>
                          <option id="2">2</option>
                        </select>
                      </div>

                      <div className="flex">
                        <button
                          type="button"
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
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>$262.00</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to="/pay"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Pay and Order
            </Link>
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
  );
};
export default Checkout;
