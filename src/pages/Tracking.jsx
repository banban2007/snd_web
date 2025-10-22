import React from 'react';
import { FaHome, FaShippingFast } from 'react-icons/fa';
import { FaBoxesPacking, FaCheck } from 'react-icons/fa6';
import { IoNewspaperOutline } from "react-icons/io5";

const steps = [
  {
    id: 1, name: 'Order Processed', icon: IoNewspaperOutline
  },
  { id: 2, name: 'Order Shipped', icon: FaBoxesPacking },
  { id: 3, name: 'Order En Route', icon: FaShippingFast },
  { id: 4, name: 'Order Arrived', icon: FaHome },
];

const Tracking = ({
  currentStep = 3,
  orderId = '#Y34XDHR',
  trackingNumber = '234094567242423422898',
  expectedArrival = '01/12/19',
  carrier = 'USPS' }) => {

  const primaryColor = 'text-[#b30602]';
  const secondaryColor = 'bg-[#b30602]';
  const disabledColor = 'bg-gray-200';

  return (
    <div className='min-h-screen flex items-center justify-center px-4 py-12 bg-blue-100/50'>
      <div className='w-full max-w-4xl p-6 md:p-10 bg-white rounded-lg shadow-2xl'> 

        {/* Header section */}
        <div className='flex items-start justify-between mb-10'>
          <h1 className='text-xl font-semibold'>
            ORDER <span className={`${primaryColor}`}>{orderId}</span>
          </h1>
          <div className='text-right text-sm text-gray-600'>
            <p className="mb-1">Expected Arrival {expectedArrival}</p>
            <p className="font-mono text-xs">{carrier} <span className="font-semibold text-gray-800">{trackingNumber}</span></p>
          </div>
        </div>

        <hr className="mb-8 border-gray-100" />

        {/* Progress Bar */}
        <div className='flex items-center justify-between relative mb-12'>
          
          <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 mx-[1.5rem] md:mx-[2.25rem]">
            {/* Completed Line */}
            <div className={`h-full rounded-full ${secondaryColor}`} style={{ width: `${(currentStep - 1) / (steps.length - 1) * 100}%` }}></div>
            {/* Pending Line */}
            <div className={`absolute top-0 h-full rounded-full ${disabledColor}`} style={{ width: `${(steps.length - currentStep) / (steps.length - 1) * 100}%`, left: `${(currentStep - 1) / (steps.length - 1) * 100}%` }}></div>
          </div>

          {/* Step Circles */}
          {steps.map((step) => {
            const isCompleted = step.id <= currentStep;
            
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                {/* Circle Icon - Position is key here */}
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300
                  ${isCompleted ? secondaryColor : 'border-2 border-gray-300 bg-white'}
                `}>
                  {isCompleted ? (
                    <FaCheck className="w-4 h-4 text-white" />
                  ) : (
                    // Pending circle style
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div> 
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Step Descriptions and Icons (B: Text and Icons) */}
       
        <div className="flex justify-between -mx-4"> 
          {steps.map((step) => {
            const isCompleted = step.id <= currentStep;
            
            return (
          
              <div key={step.id} className="text-center w-[25%]"> 
                
                {/* Icon Display */}
                <div className={`mx-auto mb-2 transition-colors duration-300 ${isCompleted ? primaryColor : 'text-gray-400'}`}>
                  {React.createElement(step.icon, { 
                      size: 30,
                      className: 'inline-block' 
                  })}
                </div>
                
                {/* Text Description */}
                <p className={`text-xs md:text-sm font-medium transition-colors duration-300
                  ${isCompleted ? 'text-gray-800' : 'text-gray-400'}
                  ${step.id === currentStep ? 'font-semibold text-gray-900' : ''}
                `}>
                  {step.name}
                </p>
              </div>
            );
          })}
        </div>
        {/* --- End Step Descriptions and Icons --- */}

      </div>
    </div>
  );
}

export default Tracking;