export const queries = {
    getUsers: "SELECT * FROM [User]",
    createUser: `INSERT INTO [User] (name, lastName, username, password, cellphone, mail, description, profilePicture,
                created_at, premium, occupation)
                VALUES (@name, @lastName, @username, @password, @cellphone, @mail, @description, @profilePicture,
                    @created_at, @premium, @occupation)`,
    getUserById: "SELECT * FROM [User] WHERE Id = @Id",
    deleteUser: "DELETE FROM [User] WHERE Id = @Id",
    updateUser: `UPDATE [User] SET name = @name, lastName = @lastName, username = @username, password = @password, cellphone = @cellphone, mail = @mail,
                description = @description, profilepicture = @profilepicture, created_at = @created_at, premium = @premium, occupation = @occupation
                  WHERE Id = @Id`,
    getPublications: `SELECT * FROM Publication`,
    getPublicationById: `SELECT * FROM Publication WHERE Id = @Id`,
    getPublicationsByUserId: `SELECT * FROM Publication WHERE fkUser = @fkUser`,
    createPublication: `INSERT INTO Publication (image, name, description, likes, dislikes, fkUser)
                        VALUES (@name, @image, @fkUser, @created_at)`,
    updatePublication: `UPDATE Publication SET image = @image, name = @name, fkUser = @fkUser, created_at = @created_at`,
    deletePublication: `DELETE FROM Publication WHERE Id = @Id`,
    deletePublicationsFromUser: `DELETE FROM Publication WHERE fkUser = @fkUser`
}