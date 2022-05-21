import { getConnection, sql, queries } from '../database';
import { queriesUser } from '../database/queries';

//Traer todos los usuarios

export const getUsers = async(req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(queries.getUsers);
        console.log(result);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.msg('Error en el servidor'));
    }
};

//Crear un usuario
export const createUser = async(req, res) => {
    const {
        username,
        password,
        mail,
        premium,
    } = req.body

    let { 
        description,
        profilePicture,
        occupation,
        works,
        followers,
        follows
    } = req.body;

    if (description == null) {
        description = " ";
    }  
    if (profilePicture == null){
        profilePicture = " ";
    }
    if (occupation == null){
        occupation = " ";
    }
    if (works == null){
        works = 0;
    }
    if (followers == null){
        followers = 0;
    }
    if (follows == null){
        follows = 0;     
    }
    else if (username == null || password == null || mail == null || premium == null) {
        return res.status(400).json({ msg: 'faltan datos' });
    }

    console.log(
        username,
        password,
        works,
        mail,
        followers,
        follows,
        premium,
        occupation,
        profilePicture,
        description
    );
    try {
        const pool = await getConnection();
        await pool.request()
            .input("username", sql.VarChar(50), username)
            .input("password", sql.VarChar(50), password)
            .input("works", sql.Int, works)
            .input("mail", sql.VarChar(50), mail)
            .input("followers", sql.Int, followers)
            .input("follows", sql.Int, follows)
            .input("premium", sql.Bit, premium)
            .input("occupation", sql.VarChar(50), occupation)
            .input("profilePicture", sql.VarChar(255), profilePicture)
            .input("description", sql.Text, description)
            .query(queries.createUser);
        res.json({ username, password, works, mail, followers, follows, premium, occupation, profilePicture, description });
    } catch (error) {
        res.status(500);
        res.send(error.msg('Error en el servidor'));
    }
}

//Obtener un usuario

export const getUserById = async(req, res) => {

    const { Id } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("Id", Id)
            .query(queries.getUserById);
        console.log("sql");
        res.send(result.recordset[0]);

    } catch (error) {
        res.status(500);
        console.log(error)
    }

}

//Borrar un usuario

export const deleteUser = async(req, res) => {

    const { Id } = req.params;

    try {

        const pool = await getConnection();
        const result = await pool
            .request()
            .input("Id", Id)
            .query(queries.deleteUser);

        res.send('Usuario eliminado correctamente');

    } catch (error) {
        res.status(500);
        res.send(error.msg('Error en el servidor'));
    }

}

// Actualizar un Usuario

export const updateUser = async(req, res) => {

    const {
        username,
        password,
        works,
        mail,
        followers,
        follows,
        premium,
        occupation,
        profilePicture,
        description
    } = req.body

    const { Id } = req.params;

    if (username == null || password == null || works == null || mail == null ||
        followers == null || follows == null || premium == null || occupation == null
        || profilePicture == null || description == null) {
        return res.status(400).json({ msg: 'faltan datos' });
    }

    try {
        const pool = await getConnection();
        await pool.request()
            .input("Id", Id)
            .input("username", sql.VarChar(50), username)
            .input("password", sql.VarChar(50), password)
            .input("works", sql.Int, works)
            .input("mail", sql.VarChar(50), mail)
            .input("followers", sql.Int, followers)
            .input("follows", sql.Int, follows)
            .input("premium", sql.Bit, premium)
            .input("occupation", sql.VarChar(50), occupation)
            .input("profilePicture", sql.VarChar(255), profilePicture)
            .input("description", sql.Text, description)
            .query(queries.updateUser);
        res.json({ username, password, works, mail, followers, follows, 
                    premium, occupation, profilePicture, description });
    } catch (error) {
        res.status(500);
        res.send(error.msg('Error en el servidor'));
    }

}