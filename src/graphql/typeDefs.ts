import { gql } from "apollo-server-express";
export const typeDefs = gql`
    type User {
        id: ID!
        name: String!
    }
    type Feed {
        id: ID!
        xhr: String!
    }
    type Bookmark {
        id: ID!
        url: String!
    }
    type Query {
        users: [User]!
        feeds: [Feed]
        bookmarks: [Bookmark]
    }
    type Mutation {
        createUser(name: String!): User!
        deleteUser(id: ID!): User!

        createBookmark(url: String!): Bookmark!
        deleteBookmark(id: ID!): Bookmark!

        createFeed(xhr: String!): Feed!
        deleteFeed(id: ID!): Feed!
    }
`;
