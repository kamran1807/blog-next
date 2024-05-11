import prisma from "@/prisma"
import { NextResponse } from "next/server"

// connection 
export async function main() {
  try {
    await prisma.$connect()
  } catch (err) {
    return Error("Database connection failed")
  }
}

// get all posts 
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main() // connect to database
    const posts = await prisma.post.findMany()
    return NextResponse.json({ message: "Success fetching posts", posts }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: "Error fetching posts", err }, { status: 500 })
  } finally {
    await prisma.$disconnect() // close database connection
  }
}

// create post
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { title, description } = await req.json() // destructure data
    await main() // connect to database
    const post = await prisma.post.create({ data: { description, title } }) // insert data
    return NextResponse.json({ message: "Success creating post", post }, { status: 201 }) // post created successfully
  } catch (err) {
    return NextResponse.json({ message: "Error creating post", err }, { status: 500 })
  } finally {
    await prisma.$disconnect() // close database connection
  }
}
