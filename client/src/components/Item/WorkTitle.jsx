/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { workSpace } from "../../features/workspaces/workSlic";
import {
  useDeleteWorkSpaceByIdMutation,
  useGetWorkspacesListandTasksQuery,
  useGetWorkspacesQuery,
} from "../../features/workspaces/workspaceApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListCreateItem from "./ListItemCreate";
import GetList from "./getList";
import CommonModal from "./CommonModal";
import { useParams } from "react-router-dom";
export default function WorkTitle() {
  const [deleteWorkSpace, { Iserror: workspacedeleteError }] =
    useDeleteWorkSpaceByIdMutation();
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [type, settype] = useState("");
  console.log("id", id);
  const { data, isLoading, error, Iserror, refetch } =
    useGetWorkspacesListandTasksQuery(id);
  const handleCreateAList = (id) => {
    settype("createAList");
    setShowModal(true);
  };
  const handleDelete = async (id) => {
    const res = await deleteWorkSpace(id);
    if (workspacedeleteError) {
      toast.error("something went wrong");
    } else {
      toast.success("workspace deleted successfully");
    }
  };
  // const lists = {
  //   title: "To-Do List",
  //   task: [
  //     {
  //       title: "Task 1",
  //       description: "Description of Task 1",
  //       list: "list-id-here",
  //     },
  //     {
  //       title: "Task 1",
  //       description: "Description of Task 1",
  //       list: "list-id-here",
  //     },
  //     {
  //       title: "Task 1",
  //       description: "Description of Task 1",
  //       list: "list-id-here",
  //     },
  //     {
  //       title: "Task 1",
  //       description: "Description of Task 1",
  //       list: "list-id-here",
  //     },
  //     {
  //       title: "Task 1",
  //       description: "Description of Task 1",
  //       list: "list-id-here",
  //     },
  //     {
  //       title: "Task 1",
  //       description: "Description of Task 1",
  //       list: "list-id-here",
  //     },
  //   ],
  // };
  const listData = data?.data?.workspace;
  return (
    <div className=" ">
      <div className=" px-10 flex items-center justify-between ">
        <div className="flex flex-row  gap-4">
          <h1 className="text-2xl font-bold  ">
            {data?.data?.workspace?.name}
          </h1>
          <button
            onClick={() => handleCreateAList(id)}
            className="bg-violet-400 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded"
          >
            create a list
          </button>
        </div>
        <div className="flex gap-5">
          <button
            onClick={() => {
              settype("editWorkSpace");
              setShowModal(true);
            }}
            className="bg-green-400 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded"
          >
            Edit Workspace
          </button>
          <button
            onClick={() => handleDelete(data?.data?.workspace?._id)}
            className="bg-red-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded"
          >
            Delete Workspace
          </button>
        </div>
      </div>
      <div className="flex gap-2 items-center justify-center"></div>

      <ListCreateItem
        isvisible={showModal}
        id={id}
        type={type}
        onClose={() => setShowModal(false)}
      />
      <div className="max-w-full mx-auto bg-white p-6 rounded-md shadow-md flex gap-4">
        {listData?.lists?.map((lists) => (
          <GetList
            refetch={refetch}
            key={lists?._id}
            workSpaceId={id}
            lists={lists}
          />
        ))}
      </div>
    </div>
  );
}
