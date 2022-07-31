export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      className
      classTagNumber
      classProfilePicture
      publicName
      publicTagNumber
      publicProfilePicture
      status
      schoolID
      typeOfUser
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
            #       typeOfUser
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
                channels {
                  items {
                    id
                    categoryID
                    name
                  }
                }
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
      } 
      school {
          id
          schoolName
      }
      ##########################################
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
      #               typeOfUser
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
            className
            classTagNumber
            classProfilePicture
            publicName
            publicTagNumber
            publicProfilePicture
            status
            typeOfUser
            lastOnlineAt
            schoolID
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