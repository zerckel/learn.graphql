const {ApolloServer, gql} = require('apollo-server');

const typeDefs = gql`
    # This "Book" type defines the queryable fields for every book in our data source.
    type User {
        id: Int
        pseudo: String
    }

    type Post {
        id: Int
        author: User
        content: String
        comments: [Post]
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        users: [User]
        user(id: Int!): User
        posts: [Post]
        post(id: Int!): Post
    }
`;

const users = [
  {
    id: 1,
    pseudo: 'zerckel',
  },
  {
    id: 2,
    pseudo: 'tiboInShape',
  },
];

const posts = [
  {
    id: 1,
    author: users[1],
    content: 'wsh la street',
    comments: []
  },
  {
    id: 2,
    author: users[0],
    content: 'wsh la street 1',
    comments: []
  },
  {
    id: 1,
    author: users[1],
    content: 'wsh la street 2',
    comments: []
  },
];

const resolvers = {
  Query: {
    users: () => users,
    user(parent, args) {
      return users.find(user => user.id === args.id)
    },
    posts: () => posts,
    post(parent, args) {
      return posts.find(post => post.id === args.id)
    }
  },
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});
