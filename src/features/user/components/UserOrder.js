import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice";
import { getLoggedInUserOrdersAsync, selectUserOrders } from "../userSlice";

export function UserOrder() {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(getLoggedInUserOrdersAsync(user.id));
  }, [dispatch, user.id]);

  return (
    <div>
      {orders.map((order) => (
        <div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="px-8 py-6 bg-white">
              <h1 className="py-3 text-4xl font-bold tracking-tight text-gray-900 border-b border-gray-200">
                Order No # {order.id}
              </h1>
              <h1 className="py-3 text-3xl font tracking-tight text-red-500">
                Order Status : {order.status}
              </h1>
              <div className="flow-root">
                <ul role="list" className=" divide-y divide-gray-200">
                  {order.items.map((item) => (
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
                              Qty : {item.quantity}
                            </label>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>$ {order.totalAmount}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total Items in Cart</p>
                  <p>{order.totalItems} items</p>
                </div>
              </div>
              <div className="border-b border-gray-900/10 pb-12 ">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Shipping Address:
                </h2>

                <ul role="list" className="divide-y divide-gray-100 border border-gray-900/10 px-5">
                  <li className="flex justify-between gap-x-6 py-5">
                    <div className="flex gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {order.selectedAddress.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {order.selectedAddress.email}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {order.selectedAddress.phone}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        {order.selectedAddress.street}
                      </p>
                      <div className="mt-1 flex items-center gap-x-1.5">
                        <p className="text-xs leading-5 text-gray-500">
                          {order.selectedAddress.city}
                        </p>
                        <p className="text-xs leading-5 text-gray-500">
                          {order.selectedAddress.state}
                        </p>
                        <p className="text-xs leading-5 text-gray-500">
                          {order.selectedAddress.country}
                        </p>
                        <p className="text-xs leading-5 text-gray-500">
                          {order.selectedAddress.pincode}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className=" px-4 py-2 sm:px-6"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
