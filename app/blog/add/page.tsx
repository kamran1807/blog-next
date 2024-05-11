'use client'

import { useRouter } from "next/navigation"
import { Fragment, useRef } from "react"
import { Toaster, toast } from "react-hot-toast"

const postBlog = async ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const res = fetch("http://localhost:3000/api/blog", {
    method: "POST",
    body: JSON.stringify({ title, description }),
    //@ts-ignore
    "Content-Type": "application/json",
  })
  return (await res).json()
}

const AddBlog = () => {
  const router = useRouter()
  const titleRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null)
  
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    // if (titleRef.current && descriptionRef.current) {
    if (!titleRef.current?.value || !descriptionRef.current?.value) {
      toast.error("Title and description cannot be empty.", { id: "form-error" })
    } else {
      toast.loading("Sending request...", { id: "1" })
      await postBlog({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
      })
      toast.success("Posted successfully!", { id: "1" })
      router.push("/") // go to home page 
    }
  }

  return (
    <Fragment>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="mt-5 text-2xl pb-1">Add post</p>
          <form onSubmit={handleSubmit}>
            <input
              ref={titleRef}
              placeholder="Enter title..."
              type="text"
              className="rounded-md px-4 w-full py-2 my-2 "
            />
            <textarea
              ref={descriptionRef}
              placeholder="Enter description..."
              className="rounded-md px-4 py-2 w-full my-2"
            />
            <div className="flex justify-end">
              <button className="font-semibold px-4 py-2 shadow-xl bg-blue-500 text-slate-200 rounded-lg hover:bg-blue-900">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default AddBlog
