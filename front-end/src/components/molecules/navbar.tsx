import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdSunny } from "react-icons/md";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <div className="flex px-6 py-5 bg-secondary-color">
      <h1 className="text-xl font-semibold flex-1">R-Dev-Todo-App</h1>
      <div className="flex gap-2 text-primary-color">
        <MdSunny size={25} className="hover:cursor-pointer " />
        <FaUserCircle size={25} className="hover:cursor-pointer" />
      </div>
      
    </div>
  );
}
