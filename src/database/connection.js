import sql from 'mssql'

const dbSetting = {
        user: "Valen",
        password: "contraseña",
        server: "localhost",
        database: "MyArtBD",
        options: {
            encrypt: true, // for azure
            trustServerCertificate: true // change to true for local dev / self-signed certs
        }
    }
    //server: localhost
    //user de casa: Valen
    //contraseña de casa: contraseña
    //cambiar datos dependiendo de la compu ACORDATE DE PONER EL PORT EN 1433

export async function getConnection() {
    try {
        const pool = await sql.connect(dbSetting);
        return pool;
    } catch (error) {
        console.log(error)
    }
}

export { sql };