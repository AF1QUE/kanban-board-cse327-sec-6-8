/* eslint-disable react/prop-types */
import {GiCancel}from'react-icons/gi'
export default function CommonModal({ isvisible, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  if (!isvisible) return null
  return (
    <div className='fixed inset-0'>
      <div>
        <label htmlFor="my_modal_6" className="btn">
          +Create WorkSpace
        </label>
        <button className='' onClick={()=>onClose()}>
        <GiCancel size={30}/>
      </button>
        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <div className=" flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full space-y-8">
                <div>
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create Your Workspace
                  </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <div>
                    {/* <label htmlFor="name" className="sr-only">Name:</label> */}
                    <input
                      id="name"
                      name="title"
                      type="text"
                      autoComplete=""
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div></div>
                  <div>
                    <button className="btn btn-primary" type="submit">
                      Create Workspace
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-action">
              <label
                onClick={() => onClose()}
                htmlFor="my_modal_6"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}