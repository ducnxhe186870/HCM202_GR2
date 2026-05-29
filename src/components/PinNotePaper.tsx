import React, { useState } from 'react';

const PinNotePaper = ({ children }: React.PropsWithChildren) => {
  const [rotation] = useState(Math.random() * 6 - 3);

  return (
    <div
      className="relative w-fit font-mono"
      style={{ transform: `rotate(${rotation.toFixed(1)}deg)` }}
    >
      <div className="absolute left-1/2 top-0 z-10 h-8 w-8 -translate-x-1/2 -translate-y-1/2">
        <div className="h-full w-full rounded-full bg-red-500 bg-gradient-to-br from-red-400 to-red-600 shadow-lg ring-2 ring-white/50"></div>
      </div>

      <div className="w-72 rounded-md border border-gray-300 bg-white/90 hover:bg-white/30 p-6 pt-10 shadow-lg">
        <div className="absolute left-0 top-0 flex w-full justify-between px-6 py-3">
          <div className="h-3 w-3 rounded-full border border-gray-300 bg-gray-100"></div>
          <div className="h-3 w-3 rounded-full border border-gray-300 bg-gray-100"></div>
          <div className="h-3 w-3 rounded-full border border-gray-300 bg-gray-100"></div>
        </div>

        <div className="text-gray-800">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PinNotePaper;