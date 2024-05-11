import { NextResponse } from "next/server"
import { main } from "../route"
import prisma from "@/prisma"

// get single post 
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const id = req.url.split("/blog/")[1] // split ID from full URL
    await main()
    const post = await prisma.post.findFirst({ where: { id } }) // get post by ID
    if (!post) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 })
    }
    return NextResponse.json({ message: "Success getting post", post }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: "Error getting post", err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

// update post 
export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const id = req.url.split("/blog/")[1]
    const { title, description } = await req.json()
    await main()
    const post = await prisma.post.update({
      data: { title, description },
      where: { id },
    })
    return NextResponse.json({ message: "Success updating post", post }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: "Error updating post", err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

// delete post 
export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const id = req.url.split("/blog/")[1]
    await main()
    const post = await prisma.post.delete({ where: { id } })
    return NextResponse.json({ message: "Success deleting post", post }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: "Error deleting post", err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
