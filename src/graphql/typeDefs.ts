import { gql } from "apollo-server-express";
export const typeDefs = gql`
    type User {
        id: ID!
        name: String!
    }
    type Query {
        users: [User]!
    }
    type Mutation {
        deleteUser(id: ID!): User!
        createUser(name: String!): User!
    }
`;
