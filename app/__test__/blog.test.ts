// Import dependencies using TypeScript syntax
import { main, GET, POST } from '../api/blog/route';
import prisma from '../../prisma/index'; // Adjust the import path as necessary
import { NextResponse } from "next/server";

import { PostFindManyArgs, PostGetPayload, PrismaPromise } from '@prisma/client';



// Type the mock functions
type MockType = jest.Mock<PrismaPromise<PostGetPayload<PostFindManyArgs>[]>>;

// Mock the Prisma client methods for testing
jest.mock('../../prisma/index', () => ({
  __esModule: true, // This property makes it work with ES6 default exports
  default: {
    post: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
    // ... other models if needed
  },
}));

// Define a mock request object
const mockRequest = {
  json: jest.fn().mockResolvedValue({ title: 'Mock Title', description: 'Mock Description' }),
  // Add any other necessary properties and methods that your request object should have
};

// Describe block for GET route
describe('GET /api/posts', () => {
  // Test for successful fetching of posts
  it('should fetch all posts successfully', async () => {
    // Mock prisma response
    (prisma.post.findMany as MockType).mockResolvedValue([{ id: 1, title: 'Test', description: 'Test description' }]);

    // Mock Next.js response object
    const jsonMock = jest.fn();
    const statusMock = jest.fn(() => ({ json: jsonMock }));
    const res = { status: statusMock };

    // Call the GET function
    await GET(mockRequest, res);

    // Expectations
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Success fetching posts", posts: [{ id: 1, title: 'Test', description: 'Test description' }] });
  });

  // Test for error scenario
  it('should handle errors when fetching posts', async () => {
    // Mock prisma response to throw an error
    prisma.post.findMany.mockRejectedValue(new Error('Error fetching posts'));

    // Mock Next.js response object
    const jsonMock = jest.fn();
    const statusMock = jest.fn(() => ({ json: jsonMock }));
    const res = { status: statusMock };

    // Call the GET function
    await GET(mockRequest, res);

    // Expectations
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Error fetching posts", err: new Error('Error fetching posts') });
  });
});

// Describe block for POST route
describe('POST /api/posts', () => {
  // Test for successful post creation
  it('should create a post successfully', async () => {
    // Mock request body
    const mockRequest = {
      json: jest.fn().mockResolvedValue({ title: 'New Post', description: 'New description' }),
    };

    // Mock prisma response
    prisma.post.create.mockResolvedValue({ id: 1, title: 'New Post', description: 'New description' });

    // Mock Next.js response object
    const jsonMock = jest.fn();
    const statusMock = jest.fn(() => ({ json: jsonMock }));
    const res = { status: statusMock };

    // Call the POST function
    await POST(mockRequest, res);

    // Expectations
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Success creating post", post: { id: 1, title: 'New Post', description: 'New description' } });
  });

  // Test for error scenario
  it('should handle errors when creating a post', async () => {
    // Mock request body to throw an error
    const mockRequest = {
      json: jest.fn().mockRejectedValue(new Error('Error creating post')),
    };

    // Mock prisma response
    prisma.post.create.mockRejectedValue(new Error('Error creating post'));

    // Mock Next.js response object
    const jsonMock = jest.fn();
    const statusMock = jest.fn(() => ({ json: jsonMock }));
    const res = { status: statusMock };

    // Call the POST function
    await POST(mockRequest, res);

    // Expectations
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Error creating post", err: new Error('Error creating post') });
  });
});
