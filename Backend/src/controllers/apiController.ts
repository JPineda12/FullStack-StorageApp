import { Request, Response } from "express";
import pool from "../database";

class ApiController {
  public async login(req: Request, res: Response) {
    const { user, pass } = req.body;
    let sql = `SELECT username, correo, nombre, contrasena, Rol_idRol FROM Usuario
        WHERE username=?
        AND contrasena=?`;
    try {
      const result = await pool.query(sql, [user, pass]);
      res.status(200).json({ status: true, result: result });
    } catch (err) {
      res
        .status(200)
        .json({ status: false, result: "Error - Consulta incorrecta" });
      console.log("ERROR: " + err);
    }
  }

  public async register(req: Request, res: Response) {
    const { user, correo, nombre, contrasena, idRol } = req.body;
    let sql = `INSERT INTO Usuario(username, correo, nombre, contrasena, Rol_idRol)
    VALUES(?, ?, ?, ?, ?)`;

    try {
      const result = await pool.query(sql, [
        user,
        correo,
        nombre,
        contrasena,
        idRol,
      ]);
      res
        .status(200)
        .json({ status: true, result: "Registrado Satisfactoriamente" });
    } catch (err) {
      res.status(200).json({ status: false, result: "Ocurrio un error" });
      console.log("ERROR: " + err);
    }
  }

  public async uploadFile(req: Request, res: Response) {
    const {
      nombre,
      archivo_url,
      fecha_subida,
      idUsuario,
      idVisibilidad,
      idTipoArchivo,
    } = req.body;
    let sql = `INSERT INTO Archivo(nombre, archivo_url, fecha_subida, Archivo_idUsuario, Archivo_idVisibilidad, Archivo_idTipoArchivo)
    VALUES(?, ?, ?, ?, ?, ?)`;
    try {
      const result = await pool.query(sql, [
        nombre,
        archivo_url,
        fecha_subida,
        idUsuario,
        idVisibilidad,
        idTipoArchivo,
      ]);
      res.status(200).json({ status: true, result: result });
    } catch (err) {
      res.status(200).json({ status: false, result: err });
      console.log("ERROR: " + err);
    }
  }
  public async getUserFiles(req: Request, res: Response) {
    const { idUsuario } = req.params;
    let sql = `SELECT idArchivo, nombre, archivo_url, fecha_subida, v.visibilidad, t.tipo
    from Archivo a, Visibilidad v, Tipo_Archivo t
    WHERE A.Archivo_idUsuario = ?
    AND	A.Archivo_idVisibilidad = v.idVisibilidad
    AND v.idVisibilidad != 3
    AND A.Archivo_idTipoArchivo = t.idTipo_Archivo
    ORDER BY v.visibilidad, a.idArchivo`;
    try {
      const result = await pool.query(sql, [idUsuario]);
      res.status(200).json({ status: true, result: result });
    } catch (err) {
      res.status(200).json({ status: false, result: err });
      console.log("ERROR: " + err);
    }
  }
  public async allUsersPublicCount(req: Request, res: Response) {
    const { idUsuario } = req.params;
    let sql = `SELECT u.username, u.nombre, COUNT(a.idArchivo) as cantidad
    FROM Usuario u, Archivo a, Visibilidad v
    WHERE u.idUsuario != ?
    AND u.idUsuario = a.Archivo_idUsuario
    AND a.Archivo_idVisibilidad = v.idVisibilidad
    AND v.idVisibilidad = 1`;
    try {
      const result = await pool.query(sql, [idUsuario]);
      res.status(200).json({ status: true, result: result });
    } catch (err) {
      res.status(200).json({ status: false, result: err });
      console.log("ERROR: " + err);
    }
  }

  public async friendsPublicFiles(req: Request, res: Response) {
    const { idUsuario } = req.params;
    let sql = `SELECT u.username, a.nombre as archivo, a.archivo_url, a.fecha_subida, t.tipo
    FROM Usuario u, Detalle_Amistad d, Archivo a, tipo_archivo t
    WHERE d.idAmigo1 = ?
    AND d.idAmigo2 = u.idUsuario
    AND u.idUsuario = a.Archivo_idUsuario
    AND a.Archivo_idVisibilidad = 1
    AND a.Archivo_idTipoArchivo = t.idTipo_Archivo`;
    try {
      const result = await pool.query(sql, [idUsuario]);
      res.status(200).json({ status: true, result: result });
    } catch (err) {
      res.status(200).json({ status: false, result: err });
      console.log("ERROR: " + err);
    }
  }

  public async updateFile(req: Request, res: Response) {
    const { idArchivo, nombre, idVisibilidad } = req.body;
    let sql = `UPDATE Archivo
    SET nombre=?, Archivo_idVisibilidad = ?
    WHERE idArchivo = ?`;
    try {
      const result = await pool.query(sql, [nombre, idVisibilidad, idArchivo]);
      res.status(200).json({ status: true, result: result });
    } catch (err) {
      res.status(200).json({ status: false, result: err });
      console.log("ERROR: " + err);
    }
  }
  public async deleteFile(req: Request, res: Response) {
    const { idArchivo} = req.body;
    let sql = `UPDATE Archivo
    SET Archivo_idVisibilidad = 3
    WHERE idArchivo = ?`;
    try {
      const result = await pool.query(sql, [idArchivo]);
      res.status(200).json({ status: true, result: result });
    } catch (err) {
      res.status(200).json({ status: false, result: err });
      console.log("ERROR: " + err);
    }
  }

  public async addFriend(req: Request, res: Response) {
    const { idAmigo1, idAmigo2, fecha_amistad } = req.body;
    let sql = `INSERT INTO Detalle_Amistad(idAmigo1, idAmigo2, fecha_amistad, idEstado)
    VALUES (?, ?, ?, 1)`;
    try {
      const result = await pool.query(sql, [idAmigo1, idAmigo2, fecha_amistad]);
      res.status(200).json({ status: true, result: result });
    } catch (err) {
      res.status(200).json({ status: false, result: err });
      console.log("ERROR: " + err);
    }
  }
}

export const apiController = new ApiController();
