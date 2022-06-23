export const queries = {
    getUsers: "SELECT * FROM [User]",
    createUser: `INSERT INTO [User] (name, lastName, username, password, cellphone, mail, description, profilePicture,
                created_at, premium, occupation)
                VALUES (@name, @lastName, @username, @password, @cellphone, @mail, @description, @profilePicture,
                    @created_at, @premium, @occupation)`,
    getUserById: "SELECT * FROM [User] WHERE Id = @Id",
    deleteUser: "DELETE FROM [User] WHERE Id = @Id",
    updateUser: `UPDATE [User] SET name = @name, lastName = @lastName, username = @username, password = @password, cellphone = @cellphone, mail = @mail,
                description = @description, profilepicture = @profilepicture, premium = @premium, occupation = @occupation
                  WHERE Id = @Id`,
    getPublications: `SELECT * FROM Publication`,
    getPublicationById: `SELECT * FROM Publication WHERE Id = @Id`,
    getPublicationsByUserId: `SELECT * FROM Publication WHERE fkUser = @fkUser`,
    getLikesFromPublication: `SELECT COUNT (*) as Likes FROM LikeOrDislike WHERE fkPublication = @fkPublication AND stateLike = 'True' AND stateDislike = 'False'`,
    getDislikesFromPublication: `SELECT COUNT (*) as Dislikes FROM LikeOrDislike WHERE fkPublication = @fkPublication AND stateDislike = 'true' AND stateLike = 'False'`,
    createPublication: `INSERT INTO Publication (name, image, created_at, fkUser, description)
    VALUES (@name, @image, @created_at, @fkUser, @description)`,
    updatePublication: `UPDATE Publication SET image = @image, name = @name, fkUser = @fkUser, created_at = @created_at`,
    deletePublication: `DELETE FROM Publication WHERE Id = @Id`,
    deletePublicationsFromUser: `DELETE FROM Publication WHERE fkUser = @fkUser`,
    getComments: `SELECT * FROM Comment`,
    getCommentsByUserId: `SELECT * FROM Comment WHERE fkUser = @fkUser`,
    getCommentsByPublicationId: `SELECT * FROM Comment WHERE fkPublication = @fkPublication`,
    createComment: `INSERT INTO Comment (text, created_at, fkUser, fkPublication)
                    VALUES (@text, @created_at, @fkUser, @fkPublication)`,
    deleteComment: `DELETE FROM Comment WHERE Id = @Id`,
    deleteCommentsByUserId: `DELETE FROM Comment WHERE fkUser = @fkUser`,
    deleteCommentsByPublicationId: `DELETE FROM Comment WHERE fkPublication = @fkPublication`,
    getLikes: `SELECT * FROM LikeOrDislike WHERE stateLike = 'True' AND stateDislike = 'False'`,
    getDislikes: `SELECT * FROM LikeOrDislike WHERE stateLike = 'False' AND stateDislike = 'True'`,
    insertLikeOrDislike: `INSERT INTO LikeOrDislike (fkUser, fkPublication, stateLike, stateDislike)
                VALUES (@fkUser, @fkPublication, @stateLike, @stateDislike)`,
    updateLikeOrDislike: `UPDATE LikeOrDislike SET stateLike = @stateLike, stateDislike = @stateDislike
                WHERE fkUser = @fkUser AND fkPublication = @fkPublication`,
    deleteLikeOrDislike: `DELETE FROM LikeOrDislike WHERE fkUser = @fkUser AND fkPublication = @fkPublication`,
}