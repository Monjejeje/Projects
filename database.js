import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

//Función para ver reservas
export async function getReservas() {
    const [rows] = await pool.query("select * from Reservas")
    return rows
}

//Función para visualizar las habitaciones
export async function getHabitaciones() {
    const [rows] = await pool.query("select * from Habitaciones")
    return rows
}

//Función para ver las reservas de un cliente
export async function getReservaCliente(ClienteID) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM Reservas
    WHERE ClienteID = ?
    `, [ClienteID])
    return rows
}

//Función para hacer una reservación
export async function createReserva(ReservaID, ClienteID,HabitacionID,FechaEntrada,FechaSalida,NumeroPersonas,CostoTotal) {
    const [result] = await pool.query('INSERT INTO Reservas (ReservaID, ClienteID, HabitacionID, FechaEntrada, FechaSalida, NumeroPersonas, CostoTotal) VALUES (?, ?, ?, ?, ?, ?, ?)', [ReservaID, ClienteID,HabitacionID,FechaEntrada,FechaSalida,NumeroPersonas,CostoTotal])
    return getReservas()
}

//Función para cambiar precios
export async function postUpdatePrecio(PrecioPorNoche, HabitacionID) {
    const updateQuery = `
    UPDATE Habitaciones
    SET PrecioPorNoche = ?
    WHERE HabitacionID = ?
  `; 
    const [result] = await pool.query(updateQuery, [PrecioPorNoche, HabitacionID])
    return getHabitaciones()
}

//Procedimiento de almacenado
export async function getBuscarReservasPorCliente(ClienteID) {
    const query = `
            SELECT
                R.ReservaID,
                C.Nombre,
                C.Apellido,
                H.TipoHabitacion,
                R.FechaEntrada,
                R.FechaSalida,
                R.NumeroPersonas,
                R.CostoTotal
            FROM
                Reservas R
            INNER JOIN
                Clientes C ON R.ClienteID = C.ClienteID
            INNER JOIN
                Habitaciones H ON R.HabitacionID = H.HabitacionID
            WHERE
                C.ClienteID = ?;`;
        
    const [result] = await pool.query(query, [ClienteID])
    return result
}

//Ocupacion por fechas
export async function getOcupacionFecha(FechaEntrada, FechaSalida) {
    const queryOcupacion = `
        SELECT 
            COUNT(*) AS TotalReservas
        FROM 
            Reservas
        WHERE 
            FechaEntrada <= ? AND FechaSalida >= ?
    `;
        const [result] = await pool.query(queryOcupacion, [FechaEntrada, FechaSalida]);
        return result;
}


//Disponibilidad
export async function getDisponibilidad(FechaEntrada, FechaSalida) {
    const queryDisponibilidad = `
    SELECT
    H.TipoHabitacion,
    COUNT(R.HabitacionID) AS CantidadDisponible
FROM
    Habitaciones H
LEFT JOIN
    Reservas R ON H.HabitacionID = R.HabitacionID
WHERE
    R.FechaEntrada <= ? OR R.FechaSalida >= ?
GROUP BY
    H.TipoHabitacion;

    `;
        const [result] = await pool.query(queryDisponibilidad, [FechaEntrada, FechaSalida]);
        return result;
}

//Prubas en la terminal
// const reservas = await getReservas()
// console.log(reservas)