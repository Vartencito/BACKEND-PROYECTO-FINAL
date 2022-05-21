export const queries = {
    getUsers: "SELECT * FROM [User]",
    createUser: `INSERT INTO [User] (username, password, works, mail, followers, follows, premium
                , occupation, profilePicture, description)
                VALUES (@username, @password, @works, @mail, @followers, @follows, @premium, @occupation
                , @profilePicture, @description)`,
    getUserById: "SELECT * FROM [User] WHERE Id = @Id",
    deleteUser: "DELETE FROM [User] WHERE Id = @Id",
    updateUser: `UPDATE [User] SET username = @username, password = @password, works = @works, mail = @mail
                , followers = @followers, follows = @follows, premium = @premium, occupation = @occupation
                , description = @description WHERE Id = @Id`,
    getPublications: `SELECT * FROM Publication`,
    getPublicationById: `SELECT * FROM Publication WHERE Id = @Id`,
    getPublicationsByUserId: `SELECT * FROM Publication WHERE fkUser = @fkUser`,
    createPublication: `INSERT INTO Publication (image, name, description, likes, dislikes, fkUser)
                        VALUES (@image, @name, @description, @likes, @dislikes, @fkUser)`,
    updatePublication: `UPDATE Publication SET image = @image, name = @name, description = @description, likes = @likes,
                        dislikes = @dislikes, fkUser = @fkUser`,
    deletePublication: `DELETE FROM Publication WHERE Id = @Id`,
    deletePublicationsFromUser: `DELETE FROM Publication WHERE fkUser = @fkUser`
}
