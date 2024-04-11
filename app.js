import express from 'express' 

import { getReservas, getReservaCliente, createReserva, getHabitaciones, postUpdatePrecio, getOcupacionFecha, getDisponibilidad, getBuscarReservasPorCliente} from './database.js'

const app = express()

//Permite utilizar el fortamto JSON para hacer POST en el body con req.body
app.use(express.json())

//Llama la funcion de reservas totales
app.get("/reservas", async (req, res) => {
    const reservas = await getReservas()
    res.send(reservas)
})

//Llama la funcion de reservas totales
app.get("/habitaciones", async (req, res) => {
    const habitaciones = await getHabitaciones()
    res.send(habitaciones)
})

//Llama la función de reservas por cliente
app.get("/reservas/clientes/:ClienteID", async (req, res) => {
    const ClienteID = req .params.ClienteID
    const reserva = await getReservaCliente(ClienteID)
    res.send(reserva)
})

//Llama la función de reservas por cliente (Ejecuta la consulta de procedimiento de almacenaje)
app.get("/reservas/clientes", async (req, res) => {
    const { ClienteID } = req.body
        const cliente = await getBuscarReservasPorCliente(ClienteID)
        res.send(cliente)
})


//Llama la función para crear reservas
app.post("/reservas", async (req, res) => {
    const {ReservaID, ClienteID, HabitacionID, FechaEntrada, FechaSalida, NumeroPersonas,CostoTotal} = req.body
    const reserva = await createReserva(ReservaID, ClienteID,HabitacionID,FechaEntrada,FechaSalida,NumeroPersonas,CostoTotal)
    res.status(501).send(reserva)
})

//Llama la función actualizar los precio por noche de las habitaciones
app.post("/habitaciones/precio", async (req, res) => {
    const {PrecioPorNoche, HabitacionID} = req.body
    const precio = await postUpdatePrecio(PrecioPorNoche, HabitacionID)
    res.status(201).send(precio)
})

//Ocupación fecha
app.get("/reservas/ocupacion", async (req, res) => {
        const { FechaEntrada, FechaSalida } = req.query
        const ocupacion = await getOcupacionFecha(FechaEntrada, FechaSalida);
        res.send(ocupacion)
})

// //Disponibilidad de la habitación
app.get("/habitaciones/disponibilidad", async (req, res) => {
    const { FechaEntrada, FechaSalida } = req.query
    const disponibilidad = await getDisponibilidad(FechaEntrada, FechaSalida);
    res.send(disponibilidad)
})


//Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Algo salio mal!!')
})

//Verifica la conexion
app.listen(8080, () => {
    console.log('El servidor esta en marcha')
})