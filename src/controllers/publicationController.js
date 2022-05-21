import { getConnection, sql, queries } from '../database';

//traer todas las publicaciones

export const getPublications = async(req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(queries.getPublications);
        console.log(result);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.msg('Error en el servidor'));
    }
};

//Obtener una publicacion

export const getPublicationById = async(req, res) => {

    const { Id } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("Id", Id)
            .query(queries.getPublicationById);
        res.send(result.recordset[0]);

    } catch (error) {
        res.status(500);
        console.log(error)
    }
}

//Traer las publicaciones de un usuario

export const getPublicationsByUserId = async(req, res) => {

    const { fkUser } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("fkUser", sql.Int, fkUser)
            .query(queries.getPublicationsByUserId);
        res.send(result.recordsets);

    } catch (error) {
        res.status(500);
        console.log(error)
    }
}

//Crear una publicacion

export const createPublication = async(req, res) => {
    const {
        image,
        name,
        fkUser
    } = req.body

    let { 
        description,
        likes,
        dislikes
    } = req.body;

    if (description == null) {
        description = " ";
    }  
    if (likes == null){
        likes = 0;
    }
    if (dislikes == null){
        dislikes = 0;
    }
    else if (image == null || name == null || fkUser == null) {
        return res.status(400).json({ msg: 'faltan datos' });
    }

    console.log(
        image,
        name,
        description,
        likes,
        dislikes,
        fkUser
    );
    try {
        const pool = await getConnection();
        await pool.request()
            .input("image", sql.VarChar(255), image)
            .input("name", sql.VarChar(50), name)
            .input("description", sql.VarChar(50), description)
            .input("likes", sql.Int, likes)
            .input("dislikes", sql.Int, dislikes)
            .input("fkUser", sql.Int, fkUser)
            .query(queries.createPublication);
        res.json({ image, name, description, likes, dislikes, fkUser });
    } catch (error) {
        res.status(500);
        res.send(error.msg('Error en el servidor'));
    }
}

//Actualizar una publicacion (no se si se puede)

// export const updatePublication = async(req, res) => {

//     const {
//         username,
//         password,
//         works,
//         mail,
//         followers,
//         follows,
//         premium,
//         occupation,
//         profilePicture,
//         description
//     } = req.body

//     const { Id } = req.params;

//     if (username == null || password == null || works == null || mail == null ||
//         followers == null || follows == null || premium == null || occupation == null
//         || profilePicture == null || description == null) {
//         return res.status(400).json({ msg: 'faltan datos' });
//     }

//     try {
//         const pool = await getConnection();
//         await pool.request()
//             .input("Id", Id)
//             .input("username", sql.VarChar(50), username)
//             .input("password", sql.VarChar(50), password)
//             .input("works", sql.Int, works)
//             .input("mail", sql.VarChar(50), mail)
//             .input("followers", sql.Int, followers)
//             .input("follows", sql.Int, follows)
//             .input("premium", sql.Bit, premium)
//             .input("occupation", sql.VarChar(50), occupation)
//             .input("profilePicture", sql.VarChar(255), profilePicture)
//             .input("description", sql.Text, description)
//             .query(queriesUser.updateUser);
//         res.json({ username, password, works, mail, followers, follows, 
//                     premium, occupation, profilePicture, description });
//     } catch (error) {
//         res.status(500);
//         res.send(error.msg('Error en el servidor'));
//     }

// }

//Borrar una publicacion

export const deletePublication = async(req, res) => {

    const { Id } = req.params;

    try {

        const pool = await getConnection();
        const result = await pool
            .request()
            .input("Id", Id)
            .query(queries.deletePublication);
        res.send('Publicacion eliminada correctamente');

    } catch (error) {
        res.status(500);
        res.send(error.msg('Error en el servidor'));
    }

}

//Borrar todas las publicaciones de un usuario

export const deletePublicationsFromUser = async(req, res) => {

    const { fkUser } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("fkUser", sql.Int, fkUser)
            .query(queries.deletePublicationsFromUser);
        res.send(`Todas las publicaciones del Usuario ${fkUser} se borraron correctamente`);
    } catch (error) {
        res.status(500);
        res.send(error.msg('Error en el servidor'));
    }
}

