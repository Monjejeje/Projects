
CREATE DATABASE Hotel_Aracari

USE Hotel_Aracari

CREATE TABLE Clientes (
    ClienteID INT PRIMARY KEY,
    Nombre VARCHAR(255),
    Apellido VARCHAR(255),
    Email VARCHAR(255),
    Telefono VARCHAR(20)
);

CREATE TABLE Habitaciones (
    HabitacionID INT PRIMARY KEY,
    TipoHabitacion VARCHAR(50),
    PrecioPorNoche DECIMAL(10, 2),
    Disponible BIT
);

CREATE TABLE Reservas (
    ReservaID INT PRIMARY KEY,
    ClienteID INT,
    HabitacionID INT,
    FechaEntrada DATE,
    FechaSalida DATE,
    NumeroPersonas INT,
    CostoTotal DECIMAL(10, 2),
    FOREIGN KEY (ClienteID) REFERENCES Clientes(ClienteID),
    FOREIGN KEY (HabitacionID) REFERENCES Habitaciones(HabitacionID)
);

--Procedimiento Almacenado

CREATE PROCEDURE BuscarReservasPorCliente
    @ClienteID INT
AS
BEGIN
    SELECT R.ReservaID, C.Nombre, C.Apellido, H.TipoHabitacion, R.FechaEntrada, R.FechaSalida, R.NumeroPersonas,
		   R.CostoTotal
    FROM Reservas R
	INNER JOIN Clientes C ON R.ClienteID = C.ClienteID 
    INNER JOIN Habitaciones H ON R.HabitacionID = H.HabitacionID
    WHERE C.ClienteID = @ClienteID;
END;

 -- Consulta de disponibilidad
 
SELECT H.TipoHabitacion, COUNT(R.HabitacionID) AS CantidadDisponible FROM Habitaciones H
LEFT JOIN Reservas R ON H.HabitacionID = R.HabitacionID
WHERE R.FechaEntrada <= ? OR R.FechaSalida >= ?
GROUP BY H.TipoHabitacion;

-- Actualización de precios
UPDATE Habitaciones SET PrecioPorNoche = ? WHERE HabitacionID = ?;

-- Reporte de ocupación
SELECT COUNT(*) AS TotalReservas FROM Reservas 
WHERE 
FechaEntrada <= ? AND FechaSalida >= ?;

-- Pruebas
INSERT INTO Clientes (ClienteID, Nombre, Apellido, Email, Telefono)
VALUES
    (1, 'Luis', 'Monge', 'monjeje2028@gmail.com', '503-7528-6602'),
    (2, 'Walter', 'Zetino', 'walter@aracaristudios.com', '503-7747-6602');

INSERT INTO Habitaciones (HabitacionID, TipoHabitacion, PrecioPorNoche, Disponible)
VALUES
    (101, 'Simple', 80.00, 1),
    (102, 'Doble', 120.00, 1),
    (103, 'Suite', 200.00, 1);

INSERT INTO Reservas (ReservaID, ClienteID, HabitacionID, FechaEntrada, FechaSalida, NumeroPersonas, CostoTotal)
VALUES
    (1001, 1, 101, '2024-04-15', '2024-04-18', 2, 240.00),
    (1002, 2, 102, '2024-04-20', '2024-04-25', 2, 600.00);



