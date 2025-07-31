import React from 'react';

const Button = ({ children }) => {
  return (
    <button type="submit" className='w-[150px] bg-[var(--primary)] p-2 m-4 border-2 border-[var(--secondary)] hover:bg-amber-700 hover:text-black rounded-2xl '>
      {children}
    </button>
  );
};

export default Button;
