import Link from "next/link"

const Navbar = () => {
  return (
    <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-5 rounded-lg bg-blue-300 drop-shadow-xl flex flex-row">
      <div className="flex my-5">
        <Link href={"/"} className="text-center rounded-md p-2 mr-5 m-auto text-slate-200 bg-green-700 font-semibold">
          Home
        </Link>
      </div>
      <div className="flex my-5">
        <Link href={"/blog/add"} className="text-center rounded-md p-2 m-auto text-slate-200 bg-green-700 font-semibold">
          Create post
        </Link>
      </div>
    </div>
  )
}

export default Navbar