/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GiCancel } from "react-icons/gi";
import {
  useCreateAlistMutation,
  useGetListByIdQuery,
  useUpdateListByIdMutation,
} from "../../features/lists/listsApi";
import {
  useGetSingleWorkSpacesQuery,
  useGetWorkspacesQuery,
  useUpdateWorkSpaceByIdMutation,
} from "../../features/workspaces/workspaceApi";
export default function ListCreateItem({
  isvisible,
  onClose,
  id,
  type,
  listId,
}) {
  const [addAList, { isError }] = useCreateAlistMutation();
  const { data, isError: workspaceerror } = useGetSingleWorkSpacesQuery(id);
  const { data: listdata } = useGetListByIdQuery(listId);
  console.log("list id", listId);
  const [updateList, { isError: listUpdateError }] =
    useUpdateListByIdMutation();
  const [updateWorkSpace, { isError: updateError }] =
    useUpdateWorkSpaceByIdMutation();

  const [formData, setFormData] = useState({
    title: data?.name,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log("type", type);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: formData?.title,
      workspace: id,
    };
    if (type === "editWorkSpace") {
      const res = await updateWorkSpace({
        id: id,
        data: {
          name: formData?.title,
        },
      });
      if (!isError) {
        toast.success("workspace update successfully");
        isvisible = false;
      } else {
        toast.error("something went wrong");
      }
    } else if (type === "createAList") {
      const res = await addAList(data);
      if (!isError) {
        toast.success("list created successfully");
        isvisible = false;
      } else {
        toast.error("something went wrong");
      }
    } else if (type === "updatelist") {
      const res = await updateList({
        data: {
          title: formData?.title,
        },
        id: listId,
      });
      if (!listUpdateError) {
        toast.success("list updated successfully");
        isvisible = false;
      } else {
        toast.error("something went wrong");
      }
    }
  };
  if (!isvisible) return null;
  return (
    <div className="">
      <ToastContainer />
      <div className="fixed inset-0 h-screen  w-full bg-opacity-25  bg-slate-600 backdrop-blur-sm flex justify-center items-center">
        <div className="flex min-h-full flex-1 flex-col justify-center    lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              {(type === "editWorkSpace" && "Edit Workspace") ||
                (type === "createAList" && "Create A Lists") ||
                (type === "updatelist" && "update list")}
            </h2>
            <button className="" onClick={() => onClose()}>
              <GiCancel size={30} />
            </button>
          </div>

          <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {type === "editWorkSpace"
                    ? "Edit Workspace Title"
                    : "Enter Title"}
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="title"
                    type="text"
                    autoComplete=""
                    value={formData.title}
                    defaultValue={
                      (type === "createAList" && "") ||
                      (type === "updatelist" && listId && listdata?.title)
                    }
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
