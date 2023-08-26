import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  selectitems,
  updateCartAsync,
  deleteItemFromCartAsync,
  selectCartStatus,
  selectCartLoaded,
} from "./cartSLice";
import { discountedPrice } from "../../app/const";
import Modal from "../common/Modal";


const Cart = () => {
  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState(-1);
  const items = useSelector(selectitems);
  const cartLoaded = useSelector(selectCartLoaded);

  const totalAmount = items.reduce(
    (amount, item) => discountedPrice(item.product) * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  const status = useSelector(selectCartStatus);
  const dispatch = useDispatch();
  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({id:item.id, quantity: +e.target.value }));
  };
  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  return (
    <>
      {!items.length && cartLoaded &&  <Navigate to="/" replace={true}></Navigate>}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="px-8 py-6 bg-white">
          <h1 className="py-3 text-4xl font-bold tracking-tight text-gray-900 border-b border-gray-200">
            Cart
          </h1>
          <div className="flow-root">
            <ul  className=" divide-y divide-gray-200">
              {/* {status === "loading" ? (
                <Blocks
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                />
              ) : null} */}
                {items && items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={item.product.thumbnail}>{item.product.title}</a>
                          </h3>
                          {item.product.price && <p className="ml-4">$ {discountedPrice(item.product)}</p>}
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.product.brand}
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
                          <Modal
                            title={`Delete : ${item.product.title}`}
                            message="Do you want to delete this item ?"
                            dangerOption="Delete"
                            cancelOption="Cancel"
                            setModal={openModal === item.id}
                            dangerAction={(e) => handleRemove(e, item.id)}
                            cancelAction={(e) => setOpenModal(-1)}
                          ></Modal>
                          <button
                            type="button"
                            onClick={(e) => setOpenModal(item.id)}
                            className="font-medium  "
                          >
                            <TrashIcon className="w-6 h-6 text-red-500 hover:text-red-400"></TrashIcon>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              }
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
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
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
    </>
  );
};
export default Cart;
