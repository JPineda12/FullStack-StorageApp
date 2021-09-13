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
        <hr>
        <div class="file-info">
          <div class="nombre">
            <h4>Nombre del archivo</h4>
          <input
            type="text"
            v-model="nombreFinal"
          />
          </div>
            <h4 class="vis">Visibilidad</h4>
          <div class="labels">
            <label class="containerLab"
              >Publico
              <input type="radio" id="pub" name="radio" />
              <span class="checkmark"></span>
            </label>
            <label class="containerLab"
              >Privado
              <input type="radio" id="priv" name="radio" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </section>

      <footer class="modal-footer">
        <button type="button" class="btn-green" @click="subir()">Subir Archivo!</button>
        <button type="button" class="btn-green" @click="close">
          Cerrar
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "UploadFile",
  emits: ["close", "newFile"],

  data() {
    return {
      imagen: require("../assets/freeFile.jpg"),
      nombreFile: "",
      nombreFinal: '',
    };
  },
  methods: {
    handlePhoto(event) {

      const file = event.target.files[0];
      this.imagen = URL.createObjectURL(file);
      this.createBase64Image(file);
      this.nombreFile = file.name
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();

      /*reader.onload = (e) => {
        //this.registerValues.userbase64Pic = e.target.result;
      };*/
      reader.readAsBinaryString(fileObject);
    },
    subir(){
      Swal.fire("Archivo Subido!", "", "success");
      this.close();      
    },
    close() {
        let file = {
          id: 1,
          nombre: "Lmao",
          imagen: this.imagen,
          visible: true
        };
      this.$emit('newFile', file)
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

.file-info{
  display: table;
  margin-top: 10px;
  width: 100%;
}

.file-info .nombre{
  display: inline-table;
  position: static;
  float: left;
  margin-left: 10px;
}
h4{
  margin-bottom:-1px;
}

.h4-file{
  margin-top: -4px;
  margin-bottom: 5px;
}

.vis{
  margin-top: -5px;
}

.labels{
  display: inline-table;
  position: static;
  margin-top:10px;
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