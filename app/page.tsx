import Link from "next/link"

// fetch all posts
async function fetchPosts() {
  const res = await fetch("http://localhost:3000/api/blog", {
    next: {
      revalidate: 10, // refetch after 10 seconds 
    },
  })
  const data = await res.json() // convert response to JSON
  return data.posts
}

export default async function Home() {
  const posts = await fetchPosts()
  console.log(posts)
  return (
    <main className="w-full h-full">
      {/* show posts */}
      <div className="w-full flex  flex-col justify-center items-center">
        <label className="mt-5 text-2xl pb-1">All posts</label>
        {posts?.map((post: any) => (
          <div key={post.id} className="w-3/4 p-4 rounded-md mx-3 my-2 bg-slate-200 flex flex-col justify-center drop-shadow-xl">
            <div className="flex items-center my-2">
              <div className="mr-auto flex flex-row">
                <h2 className="font-bold">Title: &nbsp;</h2>
                <h2 className="mr-auto">{post.title}</h2>
              </div>
              <Link href={`/blog/edit/${post.id}`} className="px-4 py-1 text-center rounded-md text-slate-200 bg-yellow-500">
                Edit
              </Link>
            </div>
            <div className="mr-auto flex flex-row">
              <h2 className="font-bold">Description: &nbsp;</h2>
              <h2>{post.description}</h2>
            </div>
            {/* <div className="mr-auto my-1">
              <blockquote className="text-sm">
                {new Date(post.date).toDateString()}
              </blockquote>
            </div> */}
          </div>
        ))}
      </div>
    </main>
  )
}
