export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      profilePicture
      status
      tagNumber
      isTeacherRole
      lastOnlineAt
      serverUsers {
        items {
          id
          userID
          serverID
          createdAt
          updatedAt
          server {
            id
            name
            serverPicture
            typeOfServer
            # serverUsers {
            #   items {
            #     user {
            #       id
            #       name
            #       profilePicture
            #       status
            #       tagNumber
            #       isTeacherRole
            #       lastOnlineAt
            #     }
            #     id
            #     role
            #     serverID
            #     userID
            #   }
            # }
            categories {
              items {
                id
                name
                serverID
                createdAt
              }
            }
            # lastMessage {
            #   id
            #   content
            #   updatedAt
            #   user {
            #     id
            #     name
            #   }
            # }
          }
        }
        nextToken
      } ##########################################
      # channelUsers {
      #   items {
      #     id
      #     userID
      #     channelID
      #     createdAt
      #     updatedAt
      #     channel {
      #       name
      #       id
      #       categoryID
      #       channelUsers {
      #         items {
      #           user {
      #               id
      #               name
      #               profilePicture
      #               status
      #               isTeacherRole
      #               lastOnlineAt
      #               tagNumber
      #           }
      #           id
      #           channelID
      #           userID
      #         }
      #       }
      #       messages {
      #         items {
      #           id
      #           content
      #           #audio
      #           #image
      #           createdAt
      #         }
      #       }           
      #     }
      #   }
      #   nextToken
      # } ####################################
      createdAt
      updatedAt
    }
  }
`;

export const getServer = /* GraphQL */ `
  query GetServer($id: ID!) {
    getServer(id: $id) {
      id
      name
      serverPicture
      serverUsers {
        items {
          id
          userID
          serverID
          createdAt
          updatedAt
          user {
            id
            name
            profilePicture
            isTeacherRole
            tagNumber
          }
        }
        nextToken
      }
      categories {
        items {
          id
          name
          serverID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;