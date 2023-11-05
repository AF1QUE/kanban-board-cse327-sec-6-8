import React, { useState } from 'react'
import{GiCancel}from'react-icons/gi'
import { useCreateWorkSpaceMutation } from '../../features/workspaces/workspaceApi'
import { useDispatch, useSelector } from 'react-redux'
export default function CreateList({isvisible,onClose}) {
  const [createWorkSpace,{data,isLoading,isError}] = useCreateWorkSpaceMutation()
  const dispatch = useDispatch()
  const auth = useSelector((state)=>state.work)
  console.log({auth})

  const [formData, setFormData] = useState({
    name: "",
    description:"",
     
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
   
 
  const handleSubmit = (e) => {
    e.preventDefault();
    
      console.log(formData)
    
    createWorkSpace({
      name:formData.name,
      description:formData.description,
      createdBy:auth.user._id
    })
     
   
    
  }
  if(!isvisible) return null
  return (
    <div className='fixed inset-0 h-screen  w-full bg-opacity-25  bg-slate-600 backdrop-blur-sm flex justify-center items-center'>
      <div className="flex min-h-full flex-1 flex-col justify-center  px-6 py-12 lg:px-8">
      <button className=' text-xl flex justify-end' onClick={()=>onClose()}>
        <GiCancel size={30}/>
      </button>
        
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Adding Grid Itema
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6"  onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Enter your project Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete=""
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                Ennter your Text
              </label>
              <div className="mt-2">
                <input
                  id="description"
                  name="description"
                  type="description"
                  autoComplete=""
                  value={formData.description}
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
  )
}
