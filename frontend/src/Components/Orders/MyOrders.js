import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import MetaData from "../Layouts/MetaData";
import Loader from "../Layouts/Loader"; 
import { GoLinkExternal } from "react-icons/go";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const rows = [];
  if (Array.isArray(orders)) {
    orders.forEach((item) => {
      let totalQuantity = 0;
      
      if (Array.isArray(item.orderItems)) {
        item.orderItems.forEach((e) => {
          totalQuantity += e.quantity;
        });
      }
      
      rows.push({
        itemsQty: totalQuantity,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <Fragment>
    {user && <MetaData title={`${user.name} - Orders`} />}
    {loading ? (
      <Loader />
    ) : (
      <div className="w-full max-w-full px-6 py-4 bg-gray-200 fixed top-0 left-0 h-screen flex flex-col mt-16">
        <h2 className="text-center font-medium text-xl py-2 text-white bg-gray-900">
          {user ? `${user.name}'s Orders` : 'Orders'}
        </h2>
        <div className="bg-white mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-tomato">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-md font-medium  uppercase tracking-wider"
                >
                  Product Id
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-md font-medium  uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-md font-medium  uppercase tracking-wider"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-md font-medium  uppercase tracking-wider"
                >
                  Total Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-md font-medium  uppercase tracking-wider"
                >
                  Links
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{row.id}</td>
                  <td
                    className={`${
                      row.status === "Delivered"
                      ? "text-green-500"
                      : row.status === "Processing"
                      ? "text-yellow-500"
                      : row.status === "Shipped"
                      ? "text-blue-500"
                      : "text-red-500"
                    }`}
                  >
                    {row.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.itemsQty}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/order/${row.id}`}>
                      <GoLinkExternal />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </Fragment>
  );
};

export default MyOrders;
