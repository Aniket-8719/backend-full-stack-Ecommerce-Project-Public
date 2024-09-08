import React, { useEffect, useState } from "react";
import { FaSpellCheck, FaClipboardList, FaWarehouse } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  createProduct,
  getProductDetails,
  updateProduct,
} from "../../actions/productAction";
import AdminDropdown from "./AdminDropdown";
import { toast } from "react-toastify";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate, useParams } from "react-router-dom";
import { FaIndianRupeeSign } from "react-icons/fa6";
import MetaData from "../Layouts/MetaData";
import { FaSpinner } from "react-icons/fa";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, product } = useSelector((state) => state.productDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.DeleteOrUpdateProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Books",
    "Laptop",
    "Footwear",
    "Kitchen",
    "Electronics",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const { id } = useParams();
  const productId = id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    toast,
    error,
    navigate,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image); // Append the file object
    });
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <MetaData title="UPDATE PRODUCT -- ECOMMERCE" />
      <div className="flex justify-center">
        <AdminDropdown />
        <div className="mt-28 md:ml-60 w-full">
          <div className="w-full flex flex-col items-center bg-gray-200 p-8 h-screen">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full md:w-1/2 lg:w-1/3"
              encType="multipart/form-data"
              onSubmit={updateProductSubmitHandler}
            >
              <h1 className="text-2xl font-bold text-center mb-6">
                Update Product
              </h1>

              <div className="mb-4 flex items-center relative z-10">
                <FaSpellCheck className="absolute left-3 text-gray-600 " />
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4 flex items-center relative z-10">
                <FaIndianRupeeSign className="absolute left-3 text-gray-600" />
                <input
                  type="number"
                  placeholder="Price"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4 flex items-center relative z-10">
                <MdDescription className="absolute left-3 text-gray-600" />
                <textarea
                  placeholder="Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="1"
                  className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
              </div>

              <div className="mb-4 flex items-center relative z-10">
                <FaClipboardList className="absolute left-3 text-gray-600" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Choose Category</option>
                  {categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4 flex items-center relative z-10">
                <FaWarehouse className="absolute left-3 text-gray-600" />
                <input
                  type="number"
                  placeholder="Stock"
                  required
                  value={Stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={updateProductImagesChange}
                  multiple
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex flex-wrap">
                {oldImages &&
                  oldImages.map((image, index) => (
                    <img
                      className="w-20 h-20 object-cover m-2"
                      key={index}
                      src={image.url}
                      alt="Old Product Preview"
                    />
                  ))}
              </div>

              <div className="flex flex-wrap">
                {imagesPreview.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="Product Preview"
                    className="w-20 h-20 object-cover m-2"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={loading ? true : false}
                className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-indigo-600 flex items-center justify-center"
              >
                {loading ? (
                  <div className="flex items-center">
                    <FaSpinner className="animate-spin mr-2" />
                    Processing...
                  </div>
                ) : (
                  "Create"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
