import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import MetaData from "../Layouts/MetaData";
import { clearErrors, getAdminProduct,deleteProduct } from "../../actions/productAction";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import AdminDropdown from "./AdminDropdown";
import { toast } from "react-toastify";

const ProductList = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, products } = useSelector((state) => state.products);
    const { error: deleteError, isDeleted } = useSelector((state) => state.DeleteOrUpdateProduct);

    const deleteProductHandler = (id) => {
      dispatch(deleteProduct(id));
    };

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
      toast.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, toast, error,deleteError, navigate, isDeleted]);

  const columns = [
    { header: "Product ID", key: "id" },
    { header: "Name", key: "name" },
    { header: "Stock", key: "stock" },
    { header: "Price", key: "price" },
    { header: "Actions", key: "actions" },
  ];

  const rows = products.map((item) => ({
    id: item._id,
    name: item.name,
    stock: item.Stock,
    price: item.price,
  }));

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="flex justify-center">
        <AdminDropdown />
        <div className="md:ml-60 w-full mx-8 ml-8 md:mx-0 max-w-[1180px] mt-16 mb-16">
          <div className="bg-white mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-900 text-white">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      scope="col"
                      className="px-6 py-3 text-left text-md font-medium uppercase tracking-wider"
                    >
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{row.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                      <Link to={`/admin/product/${row.id}`}>
                        <FaEdit className="text-blue-600 cursor-pointer" />
                      </Link>

                      <button onClick={() => deleteProductHandler(row.id)}>
                      <MdDelete className="flex w-full text-xl text-red-600 cursor-pointer"/>
                      </button>
                    </td>
                  </tr> 
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
