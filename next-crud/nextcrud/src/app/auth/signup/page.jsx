import Link from 'next/link'
import React from 'react'
Link

const page = () => {
  return (
    <>
       <div className='flex justify-center items-center h-[90vh]'>
       <div className='w-[40%] h-[60vh]'>
        <p>SignUp form</p>
       </div>
       <p>No account yet <Link href="/auth" className='text-green-600'>signup</Link> </p>
     </div>
    </>
  )
}

export default page