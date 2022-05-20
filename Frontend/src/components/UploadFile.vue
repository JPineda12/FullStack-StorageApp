<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header"><h2>Subir Archivo</h2></header>

      <section class="modal-body">
        <div class="img-upload">
          <div class="imgPreview">
            <img :src="imagen" />
          </div>
          <h4 class="h4-file">{{ nombreFile }}</h4>
          <div class="uploadButton">
            <label class="custom-file-upload">
              <input type="file" @change="handlePhoto" />
              Seleccionar Archivo
            </label>
          </div>
        </div>
        <hr />
        <div class="file-info">
          <div class="nombre">
            <h4>Nombre del archivo</h4>
            <input type="text" v-model="nombreFinal" />
          </div>
          <h4 class="vis">Visibilidad</h4>
          <div class="labels">
            <label class="containerLab"
              >Publico
              <input
                type="radio"
                id="pub"
                name="radio"
                value="Publico"
                :checked="getVisibilidad == 'Publico'"
                v-model="selectedVisibilidad"
              />
              <span class="checkmark"></span>
            </label>
            <label class="containerLab"
              >Privado
              <input
                type="radio"
                id="priv"
                name="radio"
                value="Privado"
                :checked="visible == 'Privado'"
                v-model="selectedVisibilidad"
              />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </section>

      <footer class="modal-footer">
        <button type="button" class="btn-green" @click="subir()">
          Subir Archivo!
        </button>
        <button type="button" class="btn-green" @click="close">Cerrar</button>
      </footer>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "UploadFile",
  emits: ["close", "newFile"],
  props: {
    idUser: Number,
  },
  data() {
    return {
      imagen: require("../assets/freeFile.jpg"),
      nombreFile: "",
      nombreFinal: "",
      imagenBase64: "",
      selectedVisibilidad: "",

      visible: true,
      urlPDF: require("../assets/pdficon.png"),
    };
  },
  computed: {
    getIdUsuario() {
      return this.idUser;
    },
    getVisibilidad() {
      return "Publico";
    },
  },
  methods: {
    handlePhoto(event) {
      const file = event.target.files[0];
      let extension = file.name.split(".", 2)[1];
      if (extension === "pdf") {
        this.imagen = this.urlPDF;
        this.createBase64Image(file);
        this.nombreFile = file.name;
      } else if (
        extension === "png" ||
        extension === "jpg" ||
        extension === "jpeg"
      ) {
        this.imagen = URL.createObjectURL(file);
        this.createBase64Image(file);
        this.nombreFile = file.name;
      } else {
        Swal.fire("Error - Tipo de archivo no admitido", "", "error");
      }
    },
    createBase64Image(fileObject) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.imagenBase64 = e.target.result;
      };
      reader.readAsDataURL(fileObject);
    },
    subir() {
      let idVisibilidad = 1;
      if (this.selectedVisibilidad === "Privado") {
        idVisibilidad = 2;
      }
      let idTipo = -1; //imagen = 1 .. pdf = 2
      let extension = this.nombreFile.split(".", 2)[1];
      console.log("AVER: ", extension);
      if (extension === "pdf") {
        idTipo = 2;
        this.imagen = this.urlPDF;
      } else if (
        extension === "png" ||
        extension === "jpg" ||
        extension === "jpeg"
      ) {
        //this.imagen = require("../assets/Shika.png");
        idTipo = 1;
      }
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      let file = {
        nombre: this.nombreFinal,
        archivo_url: this.imagen,
        fecha_subida: date,
        idUsuario: this.getIdUsuario,
        idVisibilidad: idVisibilidad,
        idTipoArchivo: idTipo,
        base64: this.imagenBase64,
      };
      this.axios
        .post("/uploadFile", file)
        .then((response) => {
          if (response.data.status === true) {
            Swal.fire("Archivo Subido!", "", "success");
            this.$emit("newFile");
            this.$emit("close");
          } else {
            Swal.fire(
              "Ocurrio un error al insertar en la base de datos",
              "",
              "error"
            );
          }
        })
        .catch((error) => {
          Swal.fire(
            "Ocurrio un error al comunicarse con el servidor",
            "",
            "error"
          );
          console.log(error);
        });
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
button {
  appearance: none;
  outline: 0;
  background-color: white;
  border: 0;
  padding: 10px 15px;
  color: #53e3a6;
  border-radius: 3px;
  width: 250px;
  cursor: pointer;
  font-size: 18px;
  transition-duration: 0.25s;
}
button:hover {
  background-color: #f5f7f9;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  width: 400px;
  height: 450px;
}

input[type="file"] {
  display: none;
}

.custom-file-upload {
  appearance: none;
  outline: 0;
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
  border: 0;
  padding: 5px 5px;
  width: 200px;
  cursor: pointer;
  font-size: 18px;
  transition-duration: 0.25s;
}
img {
  min-width: 100px;
  min-height: 100px;
  max-width: 100px;
  max-height: 100px;
}

.uploadButton {
  width: 100%;
  margin-left: 15px;
}

.modal-header {
  text-align: center;
}
.modal-footer {
  padding: 15px;
  text-align: center;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: center;
  text-align: center;
  align-items: center;
}

.modal-body {
  margin-top: 20px;
  text-align: center;
  height: 280px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  width: 150px;
  margin-right: 3px;
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}

.file-info {
  display: table;
  margin-top: 10px;
  width: 100%;
}

.file-info .nombre {
  display: inline-table;
  position: static;
  float: left;
  margin-left: 10px;
}
h4 {
  margin-bottom: -1px;
}

.h4-file {
  margin-top: -4px;
  margin-bottom: 5px;
}

.vis {
  margin-top: -5px;
}

.labels {
  display: inline-table;
  position: static;
  margin-top: 10px;
  width: 120px;
  border: 1px solid;
}

.containerLab {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 16px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>