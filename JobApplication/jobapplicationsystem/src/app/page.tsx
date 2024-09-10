import { TableData } from './(components)/Table';
import Job from './(components)/Job'
import { CirclePlus } from 'lucide-react'

export default function Home() {
  return (
    <>
      <div className='flex gap-2 w-[7rem] p-2 bg-green-300 text-white'>
       <p>Add Job</p>
       <CirclePlus />
      </div>
      <div>
          <Job/>
      </div>
      <div className='w-[45%]'>
        <TableData/>
      </div>
    </>
  );
}
