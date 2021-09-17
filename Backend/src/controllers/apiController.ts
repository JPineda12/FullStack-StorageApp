import { Request, Response } from "express";
import pool from "../database";

class ApiController {
  public async login(req: Request, res: Response) {
    const { user } = req.body;
    let sql = `SELECT idUsuario, username, contrasena, correo, nombre, imagen_url, Rol_idRol FROM Usuario
        WHERE username=?`;
    try {
      const result = await pool.query(sql, [user]);
      if(result.length > 0) {
        res.json(result);
      }else{
        res.json([]);
      }
    } catch (err) {
      res.json([]);
      console.log("ERROR: " + err);
    }
  }

  public async register(req: Request, res: Response) {
    const { user, correo, nombre, contrasena, imagen_url, idRol } = req.body;
    let sql = `INSERT INTO Usuario(username, correo, nombre, contrasena, imagen_url, Rol_idRol)
    VALUES(?, ?, ?, ?, ?, ?)`;

    try {
      const result = await pool.query(sql, [
        user,
        correo,
        nombre,
        contrasena,
        imagen_url,
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
      base64,
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
      res.status(200).json({ status: true, result: "Archivo subido satisfactoriamente"});
    } catch (err) {
      res.status(200).json({ status: false, result: err });
      console.log("ERROR: " + err);
    }
  }
  public async getUserFiles(req: Request, res: Response) {
    const { idUsuario } = req.params;
    let sql = `SELECT idArchivo, nombre, archivo_url, fecha_subida, v.idVisibilidad, v.visibilidad, t.tipo
    from Archivo a, Visibilidad v, Tipo_Archivo t
    WHERE A.Archivo_idUsuario = ?
    AND	A.Archivo_idVisibilidad = v.idVisibilidad
    AND v.idVisibilidad != 3
    AND A.Archivo_idTipoArchivo = t.idTipo_Archivo
    ORDER BY v.visibilidad, a.idArchivo`;
    try {
      const result = await pool.query(sql, [idUsuario]);
      if(result.length > 0) {
        res.json(result);
      }else{
        res.json([]);
      }
    } catch (err) {
      res.json([]);
      console.log("ERROR: " + err);
    }
  }
  public async allUsersPublicCount(req: Request, res: Response) {
    const { idUsuario } = req.params;
    let sql = `SELECT u.idUsuario, u.username, u.nombre, u.imagen_url, COUNT(a.idArchivo) as cantidad
FROM Usuario u, Archivo a, Visibilidad v
WHERE u.idUsuario = a.Archivo_idUsuario
AND a.Archivo_idVisibilidad = v.idVisibilidad
AND a.Archivo_idVisibilidad = 1
AND u.idUsuario <> ${idUsuario}
AND NOT EXISTS (
        SELECT d.idAmigo1, d.idAmigo2
                FROM detalle_amistad d
                WHERE d.idAmigo2 = u.idUsuario
                AND d.idAmigo1 = ${idUsuario}
        )
GROUP BY u.idUsuario
UNION 
SELECT u2.idUsuario, u2.username, u2.nombre, u2.imagen_url, 0
  FROM Usuario u2
    WHERE u2.idUsuario <> ${idUsuario}
     AND not exists  (SELECT * FROM Archivo a2
              WHERE u2.idUsuario = a2.Archivo_idUsuario);`;
    try {
      const result = await pool.query(sql);
      if(result.length > 0) {
        res.json(result);
      }else{
        res.json([]);
      }
    } catch (err) {
      res.json([]);
      console.log("ERROR: " + err);
    }
  }

  public async friendsPublicFiles(req: Request, res: Response) {
    const { idUsuario } = req.params;
    let sql = `SELECT u.idUsuario, u.username, u.imagen_url, a.idArchivo, a.nombre as archivo, a.archivo_url, a.fecha_subida, t.tipo
    FROM Usuario u, Detalle_Amistad d, Archivo a, tipo_archivo t
    WHERE d.idAmigo1 = ?
    AND d.idAmigo2 = u.idUsuario
    AND u.idUsuario = a.Archivo_idUsuario
    AND a.Archivo_idVisibilidad = 1
    AND a.Archivo_idTipoArchivo = t.idTipo_Archivo`;
    try {
      const result = await pool.query(sql, [idUsuario]);
      if(result.length > 0) {
        res.json(result);
      }else{
        res.json([]);
      }
    } catch (err) {
      res.json([]);
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
      res.status(200).json({ status: true, result:"Actualizado correctamente" });
    } catch (err) {
      res.status(200).json({ status: false, result: err });
      console.log("ERROR: " + err);
    }
  }
  public async deleteFile(req: Request, res: Response) {
    const { idArchivo} = req.params;
    let sql = `UPDATE Archivo
    SET Archivo_idVisibilidad = 3
    WHERE idArchivo = ?`;
    try {
      const result = await pool.query(sql, [idArchivo]);
      res.status(200).json({ status: true, result: "Eliminado correctamente" });
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
      res.status(200).json({ status: true, result: "Amigo agregado correctamente" });
    } catch (err) {
      res.status(200).json({ status: false, result: err });
      console.log("ERROR: " + err);
    }
  }
}

export const apiController = new ApiController();
