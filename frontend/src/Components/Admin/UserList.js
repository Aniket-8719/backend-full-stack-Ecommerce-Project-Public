import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import MetaData from "../Layouts/MetaData";
import AdminDropdown from "./AdminDropdown";
import { toast } from "react-toastify";
import { clearError, deleteUser, getAllUsers } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UserList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, users } = useSelector((state) => state.allUsers);

    const {
        error: deleteError,
        isDeleted,
        message,
    } = useSelector((state) => state.profile);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }

        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearError());
        }

        if (isDeleted) {
            toast.success(message);
            navigate("/admin/users");
            dispatch({ type: DELETE_USER_RESET });
        }

        dispatch(getAllUsers());
    }, [dispatch, toast, error, deleteError, navigate, isDeleted, message]);

    const columns = [
        { header: "User ID", key: "id" },
        { header: "Email ID", key: "email" },
        { header: "Joining Date", key: "joining" },
        { header: "Name", key: "name" },
        { header: "Role", key: "role" },
        { header: "Actions", key: "actions" },
    ];

    

    const rows = [];
    users &&
        users.forEach((item) => {
            rows.push({
                id: item._id,
                email: item.email,
                joining: item.createdAt ? item.createdAt.substring(0, 10) : "N/A",
                name: item.name,
                role: item.role,
            });
        });

    return (
        <>
            <MetaData title={`ALL USERS - Admin`} />

            <div className="flex justify-center">
                <AdminDropdown />
                <div className="md:ml-60 w-full mx-8 ml-8 md:mx-0 max-w-[1180px] mt-16 mb-16">
                    <div className="w-full">
                        <div className="bg-white mt-4 overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-tomato">
                                    <tr>
                                        {columns.map((col) => (
                                            <th
                                                key={col.key}
                                                scope="col"
                                                className="px-6 py-3 bg-gray-900 text-white text-left text-md font-medium uppercase tracking-wider"
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
                                            <td className="px-6 py-4 whitespace-nowrap">{row.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{row.joining}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{row.name}</td>
                                            <td
                                                className={`px-6 py-4 whitespace-nowrap ${
                                                    row.role === "admin"
                                                        ? "text-green-500"
                                                        : "text-red-500"
                                                }`}
                                            >
                                                {row.role}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap flex gap-8 items-center">
                                                <Link to={`/admin/user/${row.id}`}>
                                                    <FaEdit className="text-blue-600 cursor-pointer" />
                                                </Link>
                                                <button onClick={() => deleteUserHandler(row.id)}>
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

export default UserList;
