Manual de Usuario: API con Node.js, Express y MySQL

Requisitos previos:

Ejecutar los siguientes comandos en la terminal:

Instalar node.js

$ npm init -y                          
//Inicializa un archivo package.json para trabajar con node.js

$ npm install "express@>=5.0.0-beta.1" 
//Instala Express.js para controlar las solicitudes HTTP de nuestra app

$ npm i mysql2                         
//Instala el controlador de MySQL para Node.js que nos proporcionara una interfaz para interactuar con la base de datos MySQL.

$ npm i dotenv                        
 //instala el modulo de ayuda "dotenv" para poder cargar el archivo de configuración (.env), para manejar la conexion con la base de datos de manera más segura

$ npm i -D nodemon //instala nodemon para reiniciar el servidor a la hora que hayan cambios (En este caso estaremos ejecutando la app con el comando "nodemon app.js")


Extensiones:

Instalar la extension MySQL en Visual Studio Code para luego ejecutar el Query que contiene la creación de la base de datos; llamada "SQLHotelAracari.sql" (En esta también se encuentran los respectivos reportes)

Instalar la extension "Thunder CLient" para utilizar los métodos HTTP (GET/POST/PUT...)

Endpoints API

Adicionales:

GET:  http://localhost:8080/reservas                 
//Se visualizan todas las reservas

GET: http://localhost:8080/reservas/habitaciones   
//Se visualizan todas las reservas

POST: http://localhost:8080/reservas                 
//Realiza una reserva

Solicitados:


1.
GET: http://localhost:8080/habitaciones/disponibilidad?FechaEntrada=?-20&FechaSalida=?  
//Retorna la disponibilidad de habitaciones por tipo para una fecha específica.

2.
http://localhost:8080/habitaciones/precio 
//Permite actualizar el precio por noche de las habitaciones según el tipo (Da como parametro el "HabitacionID" mediante el req.body)

3.
http://localhost:8080/reservas/ocupacion?FechaEntrada=?&FechaSalida=?
//Genera un reporte de ocupación por fechas. Los parámetros de fecha inicio y fecha son enviados como query parameters (mediante la url).

4.
GET: http://localhost:8080/reservas/clientes/1      
//Devuelve las habitaciones reservadas por el cliente "Ejemplo: id=1"
GET: http://localhost:8080/reservas/clientes     
//Devuelve las habitaciones reservadas por el cliente mediante el procedimiento de almacenaje (Da como parametro "ClienteID" mediante el req.body)







Los otras consultas se realizaron en la terminal, por lo cual se ejecuta el siguiente codigo:
(Hay que descomentar las ultimas lineas de codigo par ver los log)  //Dependiendo cuales se quieran ver ya que dentro de este se encuentra la función: getDisponibilidad y getOcupacionFecha.

node database.js