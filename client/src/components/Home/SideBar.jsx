import { Link, useParams } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import Modal from "../Modal";
import { useSelector } from "react-redux";
import { useGetWorkspacesQuery } from "../../features/workspaces/workspaceApi";
import { useEffect, useState } from "react";
import ListCreate from "../Item/ListCreate";
export default function SideBar() {
  const [showModal, setShowModal] = useState(false);
  const [getData, setgetData] = useState();

  const { id } = useParams();
  console.log(id);
  const auth = useSelector((state) => state.auth);

  const { data } = useGetWorkspacesQuery();
  console.log("data", data);
  // useEffect((
  //   setgetData(data)
  // ),[data])
  // console.log(getData)
  return (
    <div className="bg-gray-800 text-white h-auto w-64 p-4">
      <ul className="flex flex-col  gap-y-4">
        {data?.map((getingData) => (
          <li className="mb-2" key={getingData._id}>
            <div className="bg-violet-600 flex p-3 gap-2 rounded-r-full items-center">
              <button
                onClick={() => setShowModal(true)}
                className="bg-violet-400 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded"
              >
                :
              </button>
              <Link to={`/item/${getingData?._id}`}>
                <div className="flex">
                  <button>
                    {getingData.name} <AiOutlineHome size={30} />
                  </button>
                </div>
              </Link>
            </div>
          </li>
        ))}

        {/* Add more items as needed */}
      </ul>
      <ListCreate isvisible={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
