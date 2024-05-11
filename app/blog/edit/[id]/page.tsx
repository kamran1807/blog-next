'use client'

import { useRouter } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"
import { Toaster, toast } from "react-hot-toast"

type UpdateBlogParams = {
  title: string;
  description: string;
  id: string;
}

// update post 
const updateBlog = async (data: UpdateBlogParams) => {
  const res = fetch(`http://localhost:3000/api/blog/${data.id}`, {
    method: "PUT",
    body: JSON.stringify({ title: data.title, description: data.description }),
    //@ts-ignore
    "Content-Type": "application/json",
  })
  return (await res).json()
}

// delete post 
const deleteBlog = async (id: string) => {
  const res = fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "DELETE",
    //@ts-ignore
    "Content-Type": "application/json",
  })
  return (await res).json()
}

// get post by ID
const getBlogById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`)
  const data = await res.json()
  return data.post
}

const EditBlog = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const titleRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null)
  
  useEffect(() => {
    toast.loading("Fetching post detail...", { id: "1" })
    getBlogById(params.id)
      .then((data) => {
        if (titleRef.current && descriptionRef.current) {
          titleRef.current.value = data.title
          descriptionRef.current.value = data.description
          toast.success("Fetching complete!", { id: "1" })
        }
      })
      .catch((err) => {
        console.log(err)
        toast.error("Error fetching blog", { id: "1" })
      })
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (titleRef.current && descriptionRef.current) {
      toast.loading("Sending request...", { id: "1" })
      await updateBlog({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        id: params.id,
      })
      toast.success("Posted successfully!", { id: "1" })
      await router.push("/")
    }
  }

  const handleDelete = async () => {
    toast.loading("Deleting post...", { id: "2" })
    await deleteBlog(params.id)
    toast.success("Post deleted!", { id: "2" })
    router.push("/")
  }

  return (
    <Fragment>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="mt-5 text-2xl pb-1">Edit post</p>
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
              <button className="font-semibold px-4 py-2 shadow-xl bg-blue-500 text-slate-200 rounded-lg hover:bg-blue-900">Update</button>
            </div>
          </form>
          <button onClick={handleDelete} className="font-semibold px-4 py-2 shadow-xl bg-red-400 text-slate-200 rounded-lg  m-auto mt-2 hover:bg-red-500">
            Delete
          </button>
        </div>
      </div>
    </Fragment>
  )
}

export default EditBlog
