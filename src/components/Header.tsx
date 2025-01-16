import React from 'react'
import { FaGithub } from "react-icons/fa";

const Header = () => {
  return (
    <div className='w-full bg-lime-800 flex justify-between'>
        <div className='text-white text-4xl p-2 mx-auto'>Todo App</div>
        <div className='text-white text-xl p-2 ml-auto'>
        <a
          href="https://github.com/bimalshah2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
        </div>
    </div>
  );
};

export default Header
