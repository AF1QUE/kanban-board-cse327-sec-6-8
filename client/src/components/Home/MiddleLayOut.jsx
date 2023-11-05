 

export default function MiddleLayOut() {
  return (
    <div className=' flex justify-center items-center text-black flex-col gap-3  h-screen  w-5/6 p-4 absolute right-0 top-14'>
     <div className="flex justify-center items-center  ">
      
      <p className="text-gray-600">This is a simple React app with Tailwind CSS styling.</p>
    </div>
      <button
     
     className="bg-violet-400 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded"
   >
      Add to cart 
   </button>
    </div>
  )
}
