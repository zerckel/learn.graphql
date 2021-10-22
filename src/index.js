const {ApolloServer, gql} = require('apollo-server');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

const context = {
  prisma: prisma,
}

const typeDefs = gql`
    scalar DateTime
    # This "Book" type defines the queryable fields for every book in our data source.
    type Post{
        id: ID
        title: String
        content: String
        userId: Int
        createdAt: DateTime
        updatedAt: DateTime
    }

    type Comment{
        id: Int
        content: String
        userId: Int
        postId: Int
        createdAt: DateTime
        updatedAt: DateTime
    }

    type User{
        id: ID
        firstname: String
        lastname: String
        password: String
        email: String
        comments : [Comment]
        posts: [Post]
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        posts : [Post]!
        post(id: ID!): Post
        comment(id: ID!):Comment
        getCommentFromPost(id:ID!):Post
    }
    input UserInput{
        firstname: String
        lastname: String
        password: String
        email: String
    }
    input PostInput{
        title: String
        content: String
        userId: Int
    }
    input UpdatePostInput{
        title: String
        content: String
    }
    input UpdateUserInput{
        firstname: String
        lastname: String
        password: String
        email: String
    }
    input CommentInput{
        content: String
    }
    input InsertCommentInput{
        content: String
        userId: Int
    }
    type Mutation {
        updatePost(input: UpdatePostInput, id: ID!): Post
        deletePost(id: ID!): Boolean
        updateComment(input: CommentInput, id: ID!): Comment
        insertUser(input: UserInput): User
        insertPost(input: PostInput): Post
        deleteComment(id: ID!): Boolean
        updateUser(input: UpdateUserInput, id: ID!): User
        insertComment(input: InsertCommentInput, id: ID!): Comment
    }
`;



const resolvers = {
  Query: {
    post: (parent, args, context, info) => {
      return context.prisma.post.findUnique({
        where: {
          id: parseInt(args.id)
        }
      })
    },
    posts: (parent, args, context, info) => {
      return context.prisma.post.findMany()
    },
    getCommentFromPost: (parent, args, context, info) => {
      const posts = context.prisma.post.findUnique({
        where: {
          id: parseInt(args.id)
        }
      })
      return posts.data.posts.comments
    },
    comment: (parent, args, context, info) => {
      return context.prisma.comment.findUnique({
        where: {
          id: parseInt(args.id)
        }
      })
    }
  },
  Mutation: {
    insertUser: (parent, args, context, info) => {
      return context.prisma.user.create({
        data: args.input,
      })
    },
    insertPost: (parent, args, context, info) => {
      return context.prisma.post.create({
        data:{
          title: args.input.title,
          content:  args.input.content,
          userId:  parseInt(args.input.userId),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      })
    },
    updatePost: (parent, args, context, info) => {
      return context.prisma.post.update({
        where: {
          id: parseInt(args.id),
        },
        data: {
          title: args.input.title,
          content: args.input.content,
          updatedAt: new Date()
        }
      })
    },
    deletePost: async (parent, args, context, info) => {
      try {
        await context.prisma.post.delete({
          where: {
            id: parseInt(args.id)
          }
        })
        return true
      } catch (e) {
        return false
      }

    },
    deleteComment: async (parent, args, context, info) => {
      try {
        await context.prisma.comment.delete({
          where: {
            id: parseInt(args.id)
          }
        })
        return true
      } catch (e) {
        return false
      }

    },
    updateComment: (parent, args, context, info) => {
      return context.prisma.comment.update({
        where: {
          id: parseInt(args.id),
        },
        data: args.input,
      })
    },
    insertComment: (parent, args, context, info) => {
      return context.prisma.comment.create({
        data: {
          content: args.input.content,
          createdAt: new Date(),
          updatedAt: new Date(),
          postId: parseInt(args.id),
          userId: parseInt(args.input.userId),
        }
      })
    }
  }
};
const server = new ApolloServer({typeDefs, resolvers, context: context})

server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});
