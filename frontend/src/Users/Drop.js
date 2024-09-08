import React, { useState } from 'react';

const Drop = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block mt-32">
            <button
                className="bg-orange-500 text-gray-800 px-10 py-3 rounded-full focus:outline-none"
                onClick={toggleDropdown}
            >
                <span className="text-lg">
                    {/* <i className="bx bx-code-alt"></i> */}
                </span>
                <span className="ml-2">Coding</span>
            </button>
            {isOpen && (
                <ul className="absolute top-full left-0 bg-gray-100 border border-gray-300 rounded-lg py-2 px-0">
                    <li className="py-2 px-4 flex items-center justify-start">
                        <span className="text-lg">
                            <i className="bx bxl-python"></i>
                        </span>
                        <span className="ml-2">Python</span>
                    </li>
                    <li className="py-2 px-4 flex items-center justify-start">
                        <span className="text-lg">
                            <i className="bx bxl-javascript"></i>
                        </span>
                        <span className="ml-2">Javascript</span>
                    </li>
                    <li className="py-2 px-4 flex items-center justify-start">
                        <span className="text-lg">
                            <i className="bx bxl-typescript"></i>
                        </span>
                        <span className="ml-2">Typescript</span>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Drop;
