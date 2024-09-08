import React, { useEffect } from "react";
import AdminDropdown from "./AdminDropdown";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import {
  clearErrors,
  deleteOrder,
  getAllOrders,
} from "../../actions/orderAction";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { GoLinkExternal } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.updateOrDeleteOrders
  );

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

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

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, toast, error, deleteError, navigate, isDeleted]);

  return (
    <>
      <div className="flex justify-center">
        {/* Sidebar of Dashboard  */}
        <AdminDropdown />
        <div className="md:ml-60 w-full mx-8 ml-8 md:mx-0  max-w-[1180px] mt-16 mb-16">
          <div className="w-full">
            <div className="bg-white mt-4 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-tomato">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-900 text-white text-left text-md font-medium  uppercase tracking-wider"
                    >
                      Order Id
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-900 text-white  text-left text-md font-medium  uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-900 text-white text-left text-md font-medium  uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-900 text-white text-left text-md font-medium  uppercase tracking-wider"
                    >
                      Total Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-900 text-white text-left text-md font-medium  uppercase tracking-wider"
                    >
                      Action
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        {row.itemsQty}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {row.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex gap-8 items-center">
                      <Link to={`/admin/order/${row.id}`}>
                        <FaEdit className="text-blue-600 cursor-pointer" />
                      </Link>
                        <button onClick={() => deleteOrderHandler(row.id)}>
                          <MdDelete className="flex w-full text-xl text-center text-red-600 cursor-pointer" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderList;
