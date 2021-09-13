<template>
  <div class="wrapper">
    <ul class="bg-bubbles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <div class="container">
      <div class="user-menu">
        <div class="user-info">
          <div class="imgPreview">
            <img class="img" :src="imagen" />
          </div>
          <h3>{{ nombre }}</h3>
          <div class="Botones">
            <div>
              <button type="submit" id="subir-button" @click="showUpload()">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                Subir Archivo
              </button>
            </div>
            <div>
              <button id="add-button" @click="showFriends()">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
                Agregar Amigo
              </button>
            </div>
            <div>
              <button id="see-button">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                Ver Archivos publicos
              </button>
            </div>
            <div>
              <button id="see-button" @click="logout()">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
                Cerrar Sesion
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="files">
        <div class="public-files">
          <h1>Archivos Publicos</h1>
          <div class="file-list">
            <div v-for="item of publicFiles" class="file" :key="item.id">
              <img class="img" @click="viewFile(item)" :src="item.imagen" />

              <h4>
                {{ item.nombre }}
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="editFile(item)"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="deleteFile(item)"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </h4>
            </div>
          </div>
        </div>

        <div class="private-files">
          <h1>Archivos Privados</h1>
          <div class="file-list">
            <div v-for="item of privateFiles" class="file" :key="item.id">
              <img class="img" @click="viewFile(item)" :src="item.imagen" />
              <h4>
                {{ item.nombre }}
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="editFile(item)"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="deleteFile(item)"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>

    <UploadFile
      v-show="isUploadVisible"
      @close="closeUpload()"
      v-on:newFile="addToArray"
    >
    </UploadFile>
    <EditFile
      :archivo="currentFile"
      v-show="isEditVisible"
      @close="closeEdit()"
      v-on:editedFile="editArray"
    />
    <AddFriends v-show="isFriendsVisible" @close="closeFriends()" />
  </div>
</template>

<script>
import AddFriends from "./AddFriends";
import UploadFile from "./UploadFile";
import EditFile from "./EditFile";
import Swal from "sweetalert2";

export default {
  name: "Home",
  components: {
    UploadFile,
    EditFile,
    AddFriends,
  },
  data() {
    return {
      nombre: "",
      isUploadVisible: false,
      isEditVisible: false,
      isFriendsVisible: false,
      publicFiles: [],
      privateFiles: [],
      currentFile: Object,
      imagen:
        "https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?fit=960%2C720",
    };
  },
  beforeMount() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "Login" });
    }
    this.nombre = JSON.parse(user).username;
    this.getPublicFiles();
    this.getPrivateFiles();
  },
  methods: {
    getPublicFiles() {
      for (let i = 0; i < 5; i++) {
        let file = {
          id: i,
          nombre: "Lmao",
          imagen: this.imagen,
          visibilidad: "Publico",
        };
        this.publicFiles.push(file);
      }
    },
    getPrivateFiles() {
      for (let i = 0; i < 5; i++) {
        let file = {
          id: i,
          nombre: "Lmao",
          imagen: this.imagen,
          visibilidad: "Privado",
        };
        this.privateFiles.push(file);
      }
    },

    addToArray(newF) {
      if (newF.visible) {
        this.publicFiles.unshift(newF);
      } else {
        this.privateFiles.unshift(newF);
      }
    },

    editArray(editedF) {
      if (editedF[1] != null || editedF[1] != undefined) {
        if (editedF[0].visibilidad == "Publico") {
          //Buscar en el array de archivos publicos
          const index = this.publicFiles.indexOf(editedF[0]);
          if (index > -1) {
            //Ver la visibilidad del archivo editado
            if (editedF[1].visibilidad == "Publico") {
              this.publicFiles[index] = editedF[1];
            } else {
              this.publicFiles.splice(index, 1);
              this.privateFiles.unshift(editedF[1]);
            }
          }
        } else {
          const index = this.privateFiles.indexOf(editedF[0]);
          if (index > -1) {
            if (editedF[1].visiblidad == "Privado") {
              this.privateFiles[index] = editedF[1];
            } else {
              this.privateFiles.splice(index, 1);
              this.publicFiles.unshift(editedF[1]);
            }
          }
        }
      }
    },

    editFile(archivo) {
      this.currentFile = archivo;
      this.isEditVisible = true;
    },

    deleteFile(archivo) {
      Swal.fire({
        title: "Desea eliminar " + archivo.nombre + "?",
        text: "Ingresa la contraseña para confirmar esta accion!",
        input: "password",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          console.log("Password: ", result);
          if (archivo.visibilidad === "Publico") {
            const index = this.publicFiles.indexOf(archivo);
            if (index > -1) {
              this.publicFiles.splice(index, 1);
            }
          } else {
            const index = this.privateFiles.indexOf(archivo);
            if (index > -1) {
              this.privateFiles.splice(index, 1);
            }
          }
        }
      });
    },

    showUpload() {
      this.isUploadVisible = true;
    },
    closeUpload() {
      this.isUploadVisible = false;
    },
    closeEdit() {
      this.isEditVisible = false;
    },

    showFriends() {
      this.isFriendsVisible = true;
    },

    closeFriends() {
      this.isFriendsVisible = false;
    },

    viewFile(archivo) {
      console.log(archivo);
    },
    logout() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style lang="css" scoped>
.container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: inline-block;
}
.wrapper {
  background: #9550a3;
  background: -webkit-linear-gradient(top left, #d6d6d6 0%, #949494 100%);
  background: -moz-linear-gradient(top left, #d6d6d6 0%, #949494 100%);
  background: -o-linear-gradient(top left, #d6d6d6 0%, #a4b4e0 100%);
  background: linear-gradient(to bottom right, #a6b4d3 0%, #ffffff 100%);
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.hola {
  position: relative;
  z-index: 10;
}
.wrapper.form-success .container h1 {
  transform: translateY(85px);
}

.user-menu {
  width: 30%;
  height: 100%;
  float: left;
}
.files {
  width: 60%;
  display: block;
  height: 100%;
  float: right;
  margin-right: 5%;
  z-index: 10;
  overflow: hidden;
  position: relative;
}
.files h1 {
  color: #87a5dd;
  letter-spacing: 0.1em;
  text-shadow: -1px -1px 1px #111, 2px 2px 1px #363636;
}

svg {
  width: 22px;
  height: 22px;
  position: relative;
  z-index: 10;
  overflow: hidden;
}
svg:hover {
  fill: white;
}

.public-files {
  width: 95%;
  height: 45%;
  margin-top: 5px;
  margin-bottom: 2.5%;
  overflow: hidden;
  border-style: solid;
  border-radius: 20px;
  border-width: 1px;
  overflow-y: auto;
  z-index: 2;
  overflow: overlay;
}

::-webkit-scrollbar {
  display: none;
}

.private-files {
  width: 95%;
  height: 45%;
  margin-top: 5px;
  margin-bottom: 2.5%;
  overflow: hidden;
  border-style: solid;
  border-radius: 20px;
  border-width: 1px;
  overflow-y: auto;
  z-index: 2;
}

.user-menu img {
  margin-top: 30px;
  min-width: 160px;
  min-height: 160px;
  max-width: 160px;
  max-height: 160px;
}

.file-list {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  z-index: 10;
}

.file {
  flex: 0 0 15%;
  box-sizing: border-box;
  margin: 0.25em 0.25em;
  z-index: 10;
  -webkit-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
}
.file img {
  min-width: 80px;
  min-height: 80px;
  max-width: 80px;
  max-height: 80px;
  margin-bottom: -25px;
  box-shadow: 1px 1px;
}
img:hover {
  -webkit-transform: scale(1.3);
  transform: scale(1.3);
}

.Botones {
  float: left;
  margin-left: 14%;
}

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
  position: relative;
  z-index: 2;
  margin-bottom: 5px;
}

button:hover {
  background-color: #485363;
}

.bg-bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.bg-bubbles li {
  position: absolute;
  list-style: none;
  display: block;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.15);
  bottom: -160px;
  -webkit-animation: square 25s infinite;
  animation: square 25s infinite;
  -webkit-transition-timing-function: linear;
  transition-timing-function: linear;
}
.bg-bubbles li:nth-child(1) {
  left: 10%;
}
.bg-bubbles li:nth-child(2) {
  left: 20%;
  width: 80px;
  height: 80px;
  animation-delay: 2s;
  animation-duration: 17s;
}
.bg-bubbles li:nth-child(3) {
  left: 25%;
  animation-delay: 4s;
}
.bg-bubbles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-duration: 22s;
  background-color: rgba(255, 255, 255, 0.25);
}
.bg-bubbles li:nth-child(5) {
  left: 70%;
}
.bg-bubbles li:nth-child(6) {
  left: 80%;
  width: 120px;
  height: 120px;
  animation-delay: 3s;
  background-color: rgba(255, 255, 255, 0.2);
}
.bg-bubbles li:nth-child(7) {
  left: 32%;
  width: 160px;
  height: 160px;
  animation-delay: 7s;
}
.bg-bubbles li:nth-child(8) {
  left: 55%;
  width: 20px;
  height: 20px;
  animation-delay: 15s;
  animation-duration: 40s;
}
.bg-bubbles li:nth-child(9) {
  left: 25%;
  width: 10px;
  height: 10px;
  animation-delay: 2s;
  animation-duration: 40s;
  background-color: rgba(255, 255, 255, 0.3);
}
.bg-bubbles li:nth-child(10) {
  left: 90%;
  width: 160px;
  height: 160px;
  animation-delay: 11s;
}
@-webkit-keyframes square {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-700px) rotate(600deg);
  }
}
@keyframes square {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-700px) rotate(600deg);
  }
}
</style>