import Navbar from "@/app/(components)/Navbar/index"
import SideBar from "@/app/(components)/SideBar"

const DashboardWrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <div className={`light flex bg-gray-50 text-gray-900 w-full min-h-screen`}>
        <SideBar/>
        <main className={`light flex-col w-full py-7 px-9 bg-gray-50 md:pl-24`}>
         <Navbar/>
         {children}
        </main>
    </div>
  )
}

export default DashboardWrapper