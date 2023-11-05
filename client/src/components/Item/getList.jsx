/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import CreateTask from "./CreateTask";
import { IoIosCreate } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";
import { MdAutoDelete } from "react-icons/md";
import {
  useDeleteAtaskMutation,
  useUpdateTaskByIdMutation,
} from "../../features/task/taskApi";
import { AiOutlineFileAdd } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListCreateItem from "./ListItemCreate";
import { useGetWorkspacesListandTasksQuery } from "../../features/workspaces/workspaceApi";
import {
  useDeleteAlistMutation,
  useUpdateListByIdMutation,
} from "../../features/lists/listsApi";
export default function GetList({ workSpaceId, lists, refetch }) {
  const [deleteTask, { isError: deleteError }] = useDeleteAtaskMutation();
  const { data: listdata } = useGetWorkspacesListandTasksQuery(workSpaceId);
  const [movetaskToanotherList, { error: moveError }] =
    useUpdateTaskByIdMutation();
  const [deleteAList, { isError: listDeleteError }] = useDeleteAlistMutation();
  const listData = listdata?.data?.workspace;
  const [showModal, setShowModal] = useState(false);
  const [updateListId, setupdateListId] = useState("");
  const [type, settype] = useState("");
  const [taskId, setTaskId] = useState("");
  const [showModal2, setShowModal2] = useState(false);
  console.log("lists", lists);
  const handleCreateTask = (id) => {
    setShowModal(true);
    settype("create");
  };

  const handleDelete = async (id) => {
    const res = await deleteTask(id);
    if (!deleteError) {
      toast.success("task deleted successfully");
    } else {
      toast.error("something went wrong");
    }
  };

  const handleDeleteAList = async (id) => {
    const res = await deleteAList(id);
    if (listDeleteError) {
      toast.error("something went wrong");
    } else {
      toast.success("list deleted successfully");
    }
  };

  const handleMoveTask = async (listId, taskId) => {
    console.log("move", listId, taskId);
    const res = await movetaskToanotherList({
      data: {
        list: listId,
      },
      id: taskId,
    });
    if (!res.error) {
      await refetch();
    }
  };
  return (
    <div>
      {" "}
      {
        <ul className="flex flex-col justify-start shadow-md">
          <ToastContainer />
          <div className="flex gap-3">
            <h2 className="text-2xl text-center font-semibold ">
              {" "}
              {lists.title}
            </h2>

            <button
              className=" text-black border border-2   px-2 rounded"
              onClick={() => {
                setShowModal(true);
                settype("create");
              }}
            >
              <AiOutlineFileAdd />
            </button>
            <button
              className="text-black  border-2   px-2 rounded"
              onClick={() => {
                setShowModal2(true);
                settype("updatelist");
              }}
            >
              <AiFillEdit />
            </button>
            <button
              className="text-red-700  border-2  px-2 rounded"
              onClick={() => handleDeleteAList(lists?._id)}
            >
              <MdAutoDelete />
            </button>
          </div>
          <div className="py-3  ">
            {lists?.tasks?.map((item, index) => (
              <li key={index} className=" p-5 shadow-lg py-3   w-[200px]">
                <div className="px-5 py-3 ">
                  <span>{item.title}</span>
                  <p>{item.description}</p>
                </div>
                <div className="flex justify-between">
                  <button
                    className="bg-green-400 hover:bg-violet-600 text-white px-2  rounded"
                    onClick={() => {
                      setTaskId(item?._id);
                      settype("update");
                      setShowModal(true);
                    }}
                  >
                    <AiFillEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item?._id)}
                    className="bg-red-400 px-2 py-2  hover:bg-violet-600 text-white   rounded"
                  >
                    <MdAutoDelete />
                  </button>
                </div>
                <label className="block text-center mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  move to
                </label>
                <select
                  id=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => handleMoveTask(e.target.value, item?._id)}
                >
                  <option value="" selected>
                    Choose a list
                  </option>
                  {listData?.lists?.map((list, index) => (
                    <option value={list?._id} key={index}>
                      {list?.title}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </div>
          <CreateTask
            isvisible={showModal}
            type={type}
            taskId={taskId}
            id={lists?._id}
            onClose={() => setShowModal(false)}
          />
        </ul>
      }
      <ListCreateItem
        isvisible={showModal2}
        listId={lists?._id}
        type={type}
        onClose={() => setShowModal2(false)}
      />
    </div>
  );
}
