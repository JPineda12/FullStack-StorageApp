CREATE DATABASE semi1_proyecto1;
USE semi1_proyecto1;
CREATE TABLE Rol(
idRol INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
rol VARCHAR(30) UNIQUE
);

CREATE TABLE Usuario(
idUsuario INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
username VARCHAR(50) UNIQUE NOT NULL,
correo VARCHAR(80) UNIQUE NOT NULL,
nombre VARCHAR(50),
imagen_url VARCHAR(1000),
contrasena VARCHAR(400),
Rol_idRol INT,
FOREIGN KEY(Rol_idRol) REFERENCES Rol(idRol)
);

CREATE TABLE Estado_Amistad(
idEstado_Amistad INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
estado VARCHAR(45) UNIQUE
);

CREATE TABLE Detalle_Amistad(
idAmigo1 INT NOT NULL,
idAmigo2 INT NOT NULL,
fecha_amistad DATE NOT NULL,
idEstado INT NOT NULL,
PRIMARY KEY(idAmigo1, idAmigo2),
FOREIGN KEY(idAmigo1) REFERENCES Usuario(idUsuario),
FOREIGN KEY(idAmigo2) REFERENCES Usuario(idUsuario),
FOREIGN KEY(idEstado) REFERENCES Estado_Amistad(idEstado_Amistad)
);

CREATE TABLE Visibilidad(
idVisibilidad INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
visibilidad VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE Tipo_Archivo(
idTipo_Archivo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
tipo VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE Archivo(
idArchivo INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
archivo_url VARCHAR(400) NOT NULL,
fecha_subida DATE NOT NULL,
Archivo_idUsuario INT NOT NULL,
Archivo_idVisibilidad INT NOT NULL,
Archivo_idTipoArchivo INT NOT NULL,
FOREIGN KEY(Archivo_idUsuario) REFERENCES Usuario(idUsuario),
FOREIGN KEY(Archivo_idVisibilidad) REFERENCES Visibilidad(idVisibilidad),
FOREIGN KEY(Archivo_idTipoArchivo) REFERENCES Tipo_Archivo(idTipo_Archivo)
);
INSERT INTO semi1_proyecto1.Rol(rol) 
VALUES("Admin");

INSERT INTO semi1_proyecto1.Rol(rol)
VALUES("User");

INSERT INTO semi1_proyecto1.Visibilidad(visibilidad)
VALUES ('Publico');

INSERT INTO semi1_proyecto1.Visibilidad(visibilidad)
VALUES ('Privado');

INSERT INTO semi1_proyecto1.Visibilidad(visibilidad)
VALUES ('Eliminado');

INSERT INTO semi1_proyecto1.Tipo_Archivo(tipo)
VALUES ('Imagen');

INSERT INTO semi1_proyecto1.Tipo_Archivo(tipo)
VALUES ('Pdf');

INSERT INTO semi1_proyecto1.Estado_Amistad(estado)
VALUES('Amigos');

