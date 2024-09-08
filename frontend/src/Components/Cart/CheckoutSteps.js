import React from "react";
import { MdLocalShipping, MdLibraryAddCheck, MdAccountBalance } from "react-icons/md";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: "Shipping Details",
      icon: <MdLocalShipping />,
    },
    {
      label: "Confirm Order",
      icon: <MdLibraryAddCheck />,
    },
    {
      label: "Payment",
      icon: <MdAccountBalance />,
    },
    {
        
    }
  ];

  return (
  <>
  <div className="max-w-[800px] mx-auto">
  <div className="flex py-4 mt-24 justify-between items-center -mr-16">
      {steps.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col justify-center  items-center ${
            index !== steps.length - 1 ? "flex-1" : ""
          }`}
        >
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full  ${
              activeStep >= index ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            {item.icon}
          </div>
          <span
            className={`mt-2 ${
              activeStep >= index ? "text-blue-500" : "text-gray-600"
            }`}
          >
            {item.label}
          </span>
          {index !== steps.length - 1 && (
            <div className="flex-1 border-t-2 mt-5 border-gray-300 mx-2" />
          )}
        </div>
      ))}
    </div>
  </div>
  </>
  );
};

export default CheckoutSteps;
