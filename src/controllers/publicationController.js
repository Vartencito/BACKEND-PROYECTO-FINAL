 import { getConnection, sql, queries } from '../database';

//traer todas las publicaciones

//METER LA FECHA EN LA QUE SE CREA LA PUBLICACION
//HACER UN CAMPO DATE QUE EL USER NO LO TOQUE
//PONER POR DEFECTO LA FECHA EN LA QUE SE CREA LA IMAGEN

export const getPublications = async(req, res) => {

    try {
        const pool = await getConnection();
        const result = await pool.request().query(queries.getPublications);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.msg('Error en el servidor'));
    }
};

//Obtener Likes de una publicacion

export const getLikesFromPublication = async(req,res) =>{
    
    const { fkPublication } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("fkPublication", sql.Int, fkPublication)
            .query(queries.getLikesFromPublication);
        res.send(result.recordset[0]);
    } catch (error) {
        res.status(500);
        console.log(error)
    }

}

//Obtener dislikes de una publicacion

export const getDislikesFromPublication = async(req,res) =>{
    
    const { fkPublication } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("fkPublication", sql.Int, fkPublication)
            .query(queries.getDislikesFromPublication);
        res.send(result.recordset[0]);
    } catch (error) {
        res.status(500);
        console.log(error)
    }

}
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
        res.send(result.recordsets[0]);
    } catch (error) {
        res.status(500);
        console.log(error)
    }
}

//Crear una publicacion

export const createPublication = async(req, res) => {
    
    const {
        name,
        image,
        fkUser
    } = req.body

    let {description} = req.body

    let created_at = null;

    let fecha = new Date;
    fecha = fecha.getUTCFullYear() + '-' +
    ('00' + (fecha.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + fecha.getUTCDate()).slice(-2) + ' ' + 
    ('00' + (fecha.getUTCHours()-6)).slice(-2) + ':' + 
    ('00' + fecha.getUTCMinutes()).slice(-2) + ':' + 
    ('00' + fecha.getUTCSeconds()).slice(-2);

    created_at = fecha;

    if (image == null || name == null || fkUser == null) {
        return res.status(400).json({ msg: 'faltan datos' });
    }

    if (description == null){
        description = "";
    }

    try {
        const pool = await getConnection();
        await pool.request()
        .input("name", sql.VarChar(50), name)
        .input("image", sql.VarChar(255), image)
        .input("created_at", sql.DateTime, created_at)
        .input("fkUser", sql.Int, fkUser)  
        .input("description", sql.VarChar(255), description)                                     
        .query(queries.createPublication);
        res.json({ name, image, fkUser, created_at, description}).status(200);
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

