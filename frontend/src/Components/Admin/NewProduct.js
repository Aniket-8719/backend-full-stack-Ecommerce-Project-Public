import React, { useEffect, useState } from "react";
import { FaSpellCheck, FaClipboardList, FaWarehouse } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createProduct} from "../../actions/productAction";
import AdminDropdown from "./AdminDropdown";
import { toast } from "react-toastify";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaSpinner } from 'react-icons/fa';


const NewProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const { loading, error, success } = useSelector((state) => state.newProduct);
  
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
  
    const categories = [

      "Fashion",
      "Books",
      "Laptop",
      "Footwear",
      "Kitchen",
      "Electronics",
      "Attire",
      "Camera",
      "SmartPhones",
    ];
  
    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch(clearErrors());
      }
  
      if (success) {
        toast.success("Product Created Successfully");
        navigate("/admin/dashboard");
        dispatch({ type: NEW_PRODUCT_RESET });
      }
    }, [dispatch, toast, error, navigate, success]);
  
    const createProductSubmitHandler = (e) => {
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
      dispatch(createProduct(myForm));
    };
  
    const createProductImagesChange = (e) => {
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
    <div className="flex justify-center">
        <AdminDropdown/>
        <div className="mt-28 md:ml-60 w-full">
        <div className="w-full flex flex-col items-center bg-gray-200 p-8 h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full md:w-1/2 lg:w-1/3"
        encType="multipart/form-data"
        onSubmit={createProductSubmitHandler}
      >
        <h1 className="text-2xl font-bold text-center mb-6">Create Product</h1>

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
            onChange={(e) => setStock(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={createProductImagesChange}
            multiple
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex flex-wrap">
          {imagesPreview.map((image, index) => (
            <img key={index} src={image} alt="Product Preview" className="w-20 h-20 object-cover m-2" />
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
    'Create'
  )}
</button>
      </form>
    </div>
        </div>
    </div>

    </>
  );
};

export default NewProduct;
