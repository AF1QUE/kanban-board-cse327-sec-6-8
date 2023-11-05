import { AiOutlineBarcode } from "react-icons/ai";
import Modal from "./Modal";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../features/auth/AuthSlice";
const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
  };
  return (
    <div>
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex  items-center text-center gap-2">
            <Link to="/">
              <AiOutlineBarcode size={30} />
              <h2 className="text-2xl font-bold mb-4  mt-2 ">taskwave</h2>
            </Link>
          </div>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                Contact
              </a>
            </li>
          </ul>
          <button
            onClick={() => setShowModal(true)}
            className="bg-violet-400 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded"
          >
            create workspace
          </button>
          <button
            onClick={logout}
            className="bg-violet-400 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>
      <Modal
        isvisible={showModal}
        setShowModal={setShowModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default Navbar;
