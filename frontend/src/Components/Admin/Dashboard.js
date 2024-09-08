import React, { useEffect } from "react";
import AdminDropdown from "./AdminDropdown";
import "chart.js/auto";
import { Line, Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { Link } from "react-router-dom";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";
// import { getAllOrders } from "../../actions/orderAction";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

    let numberOfAdmin = 0;
    let numberOfUsers = 0;
    users &&
        users.forEach((item) => {
            if(item.role === "admin"){
                numberOfAdmin +=  1;
            }else if(item.role === "user"){
              numberOfUsers += 1;
            }
        });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);
  const totalProducts = products ? products.length : 0;
  

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });
  return (
    <>
      <div className="flex justify-center">
        {/* Sidebar of Dashboard  */}
        <AdminDropdown />

        {/* right side Dashboard */}
        <div className="mt-28 md:ml-60 w-full ">
          <h1 className="text-center text-gray-500 text-2xl mb-8 font-medium">
            Dashboard
          </h1>
          <div className="flex  flex-col justify-center items-center  py-2 font-medium text-md w-full bg-blue-600 text-white">
            Total Amount
            <h1>₹{totalAmount.toFixed(2)}</h1>
          </div>
          <div className="flex justify-between items-center gap-8 mx-8 ml-8 md:ml-32 max-w-[1000px] mt-8">
            <Link to={"/admin/products"} className="w-40 h-20   flex flex-col justify-center items-center  bg-orange-400 text-white my-4 rounded-lg">
              Product
              <h1>{totalProducts}</h1>
            </Link>
            <Link to={"/admin/orders"} className="w-40 h-20   flex flex-col justify-center items-center border  bg-yellow-400 text-white my-4 rounded-lg">
              Orders
              <h1>{orders && orders.length}</h1>
            </Link>
            <Link to={"/admin/users"} className="w-40 h-20   flex flex-col justify-center items-center   bg-gray-500 text-white  my-4 rounded-lg">
              Users
              <h1>{numberOfUsers}</h1>
            </Link>
            <Link to={"/admin/users"} className="w-40 h-20   flex flex-col justify-center items-center   bg-green-500 text-white  my-4 rounded-lg">
              Admin
              <h1>{numberOfAdmin}</h1>
            </Link>
          </div>
          <div className="max-w-[1000px] mt-8 mx-8 ml-8 md:ml-32">
            <Line
              data={{
                labels: ["Initial Amount", "Amount Earned"],
                datasets: [
                  {
                    label: "TOTAL AMOUNT",
                    backgroundColor: "#064FF0",
                    borderColor: "#064FF0",
                    data: [0, totalAmount.toFixed(2)],
                  },
                ],
              }}
            />
          </div>
          <div className="max-w-[1000px]  mx-8 ml-8 md:ml-32">
            <Doughnut
              data={{
                labels: ["Out Of Stock", "In Stock"],
                datasets: [
                  {
                    backgroundColor: ["#00A6B4", "#6800B4"],
                    hoverBackgroundColor: ["#4B5000", "#35014F"],
                    data: [outOfStock,totalProducts-outOfStock],
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
