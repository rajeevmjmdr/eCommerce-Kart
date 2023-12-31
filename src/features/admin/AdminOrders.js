import {
  CloudArrowUpIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE, STATUS, discountedPrice } from "../../app/const";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersAsync,
  selectAllOrders,
  selectOrdersStatus,
  selectTotalOrder,
  updateOrderAsync,
} from "../order/orderSlice";
import { Blocks } from "react-loader-spinner";
import Pagination from "../common/Pagination";

const AdminOrders = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const totalOrders = useSelector(selectTotalOrder);
  const orders = useSelector(selectAllOrders);
  const status = useSelector(selectOrdersStatus);
  const handlerPage = (page) => {
    setPage(page);
  };
  const [editableOrderId, setEditableOrderId] = useState(-1);
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(getAllOrdersAsync({ pagination }));
  }, [dispatch, page]);

  useEffect(() => {
    setPage(1);
  }, [totalOrders]);

  const handleEdit = (orderId) => {
    setEditableOrderId(orderId);
  };
  const handleShow = () => {
    console.log("show");
  };
  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };
  const changeColor = (status) => {
    switch (status) {
      case "pending":
        return `text-purple-500 rounded-full gap-x-2 bg-purple-100/60 dark:bg-gray-800`;
      case "dispatched":
        return `text-yellow-500 rounded-full gap-x-2 bg-yellow-100/60 dark:bg-gray-800`;
      case "delieverd":
        return `text-green-500 rounded-full gap-x-2 bg-green-100/60 dark:bg-gray-800`;
      case "cancelled":
        return `text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800`;

      default:
        return `text-purple-500 rounded-full gap-x-2 bg-purple-100/60 dark:bg-gray-800`;
    }
  };
  return (
    <div className="bg-white">
      <main className="mx-auto max-w-full sm:px-6 lg:px-4">

        


    <div className="grid grid-cols-1 lg:grid-cols-12 gap-1">
      <div className="lg:col-span-12">
        <div className="px-4 mx-auto">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-x-3 my-4">
                <h1 className="text-lg font-medium text-gray-800 dark:text-white">
                  Orders
                </h1>
                <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                  {orders && orders.length}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                Total Orders in the last 12 months.
              </p>
            </div>
            <div className="flex items-center mt-4 gap-x-3">
              <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                <CloudArrowUpIcon className="w-6 h-6"></CloudArrowUpIcon>
                <span>Export</span>
              </button>
            </div>
          </div>
          {/* <div className="mt-6 md:flex md:items-center md:justify-between">
            <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
              <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300">
                View all
              </button>
              <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                Monitored
              </button>
              <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                Unmonitored
              </button>
            </div>
            <div className="relative flex items-center mt-4 md:mt-0">
              <span className="absolute">
                <MagnifyingGlassIcon className="w-6 h-6 mx-2"></MagnifyingGlassIcon>
              </span>
              <input
                type="text"
                placeholder="Search"
                className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </div> */}
          <div className="flex-auto mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <button className="flex items-center gap-x-3 focus:outline-none">
                            <span>Order No</span>
                          </button>
                        </th>
                        <th
                          scope="col"
                          className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Items
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Total Amount
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Shipping Address
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {status === "loading" ? (
                        <Blocks
                          visible={true}
                          height="80"
                          width="80"
                          ariaLabel="blocks-loading"
                          wrapperStyle={{}}
                          wrapperClass="blocks-wrapper"
                        />
                      ) : (
                        orders &&
                        orders.map((order,index) => (
                          <tr key={index}>
                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              <div>
                                <h2 className="font-medium text-gray-800 dark:text-white ">
                                  {order.id}
                                </h2>
                              </div>
                            </td>
                            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                              {order.items &&
                                order.items.map((item,index) => (
                                  <div className="flex flex-wrap justify-between" key={index}>
                                    <div className="w-full text-gray-700 dark:text-gray-200">
                                    <img
                                      className=" inline object-cover w-6 h-6 mx-2 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                                      src={item.product.thumbnail}
                                      alt=""
                                    />
                                    {item.product.title}
                                    </div>
                                    <div className="w-full pl-10 text-blue-400 dark:text-blue-200">
                                    Qty: {item.quantity} -- 
                                    Price: ${discountedPrice(item.product)}
                                    </div>
                                  </div>
                                ))}
                            </td>
                            <td className=" py-4 text-sm whitespace-nowrap">
                              <div className="flex flex-wrap justify-between">
                                <div className="w-full font-bold text-green-400 dark:text-green-200">
                                  ${order.totalAmount}
                                </div>
                                <div className="text-gray-700 dark:text-gray-200">
                                  Paid - {order.paymentMethod}
                                </div>
                              </div>
                            </td>
                            <td className="text-sm whitespace-nowrap flex justify-between py-5">
                              <div className="flex  ">
                                <div className="min-w-0 flex-auto px-2">
                                  <p className="text-sm font-semibold leading-6 text-gray-900">
                                    {order.selectedAddress.name}
                                  </p>
                                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                    {order.selectedAddress.email}
                                  </p>
                                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                    {order.selectedAddress.phone}
                                  </p>
  
                                <p className="text-sm leading-6 text-gray-900 ">
                                  {order.selectedAddress.street}
                                </p>
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
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div
                                className={`inline px-3 py-1 text-sm font-normal ${
                                  order.id === editableOrderId
                                    ? ""
                                    : changeColor(order.status)
                                }} `}
                              >
                                {order.id === editableOrderId ? (
                                  <select
                                    onChange={(e) => handleUpdate(e, order)}
                                  >
                                    {STATUS.map((st,index) => (
                                      <option key={index} value={st.value}>
                                        {st.label}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  order.status
                                )}
                              </div>
                            </td>

                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <PencilSquareIcon
                                className="w-6 h-6 mx-1 inline text-blue-500 cursor-pointer"
                                onClick={() => handleEdit(order.id)}
                              ></PencilSquareIcon>
                              <EyeIcon
                                className="w-6 h-6 mx-1 inline text-orange-500 cursor-pointer"
                                onClick={handleShow}
                              ></EyeIcon>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
            <Pagination
              filters=""
              page={page}
              setPage={setPage}
              handlerPage={handlerPage}
              totalItems={totalOrders}
            ></Pagination>
         
        </div>
      </div>
    </div>
    </main>
   
   </div>
  );
};
export default AdminOrders;
