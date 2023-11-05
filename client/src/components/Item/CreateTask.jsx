/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { GiCancel } from "react-icons/gi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useCreateATaskMutation,
  useDeleteAtaskMutation,
  useGetTasksByIdQuery,
  useUpdateTaskByIdMutation,
} from "../../features/task/taskApi";
export default function CreateTask({ isvisible, onClose, id, type, taskId }) {
  const [CreateTask, { isError }] = useCreateATaskMutation();
  const [updateTask, { error: updateError }] = useUpdateTaskByIdMutation();
  const { data, isError: dataerror } = useGetTasksByIdQuery(taskId);

  const [formData, setFormData] = useState({
    title: data?.title,
    description: data?.description,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "create") {
      const newdata = {
        title: formData?.title,
        description: formData?.description,
        list: id,
      };
      const res = await CreateTask(newdata);
      console.log(res);
      if (!isError) {
        toast.success("task created successfully");
      } else {
        toast.error("something went wrong");
      }
    } else {
      const newdata = {
        title: formData?.title,
        description: formData?.description,
        list: id,
        priority: "High",
        completed: true,
      };
      const res = await updateTask({ data: newdata, id: taskId });
      console.log(res);
      if (!updateError) {
        toast.success("task updated successfully");
      } else {
        toast.error("something went wrong");
      }
    }
    console.log(formData);
  };
  if (!isvisible) return null;
  return (
    <div className="">
      <ToastContainer />
      <div className="fixed inset-0 h-screen  w-full bg-opacity-25  bg-slate-600 backdrop-blur-sm flex justify-center items-center">
        <div className="flex min-h-full flex-1 flex-col justify-center    lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              {data?.title ? "Update Task" : "Create Task"}
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
                  {data?.title ? "update your title" : "Enter your Title"}
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="title"
                    type="text"
                    autoComplete=""
                    value={formData?.title}
                    defaultValue={data?.title}
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {data?.title
                    ? "update your description"
                    : "Enter your description"}
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="description"
                    type="text"
                    autoComplete=""
                    defaultValue={data?.description}
                    value={formData?.description}
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
