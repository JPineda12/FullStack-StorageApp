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
            <img class="img" :src="user ? user.imagen_url : ''" />
          </div>
          <h3>{{ user ? user.nombre : "" }}</h3>
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
              <button id="see-button" @click="showFiles()">
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
            <div v-for="item of publicFiles" class="file" :key="item.idArchivo">
              <img
                class="img"
                @click="viewFile(item)"
                :src="item.imagen_arch"
              />

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
            <div
              v-for="item of privateFiles"
              class="file"
              :key="item.idArchivo"
            >
              <img
                class="img"
                @click="viewFile(item)"
                :src="item.imagen_arch"
              />
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
      :idUser="user ? user.idUsuario : -1"
    >
    </UploadFile>
    <EditFile
      :nombre="currentFile[0].nombre"
      :idArchivo="currentFile[0].idArchivo"
      :imagen_arch="currentFile[0].imagen_arch"
      :fecha_subida="currentFile[0].fecha_subida"
      :tipo="currentFile[0].tipo"
      :archivo_url="currentFile[0].archivo_url"
      :visibilidad="currentFile[0].visibilidad"
      :idVisibilidad="currentFile[0].idVisibilidad"
      :username="user ? user.username : ''"
      v-show="isEditVisible"
      @close="closeEdit()"
      v-on:editedFile="editArray"
    />
    <AddFriends
      v-show="isFriendsVisible"
      @close="closeFriends()"
      :idUser="user ? user.idUsuario : -1"
    />
    <SeeFiles
      v-show="isSeeFilesVisible"
      :Files="FriendsFiles"
      @close="closeSeeFiles()"
      :idUser="user ? user.idUsuario : -1"
    />
  </div>
</template>

<script>
import AddFriends from "./AddFriends";
import UploadFile from "./UploadFile";
import EditFile from "./EditFile";
import SeeFiles from "./SeeFiles";
import Swal from "sweetalert2";
import bcrypt from "bcryptjs";

export default {
  name: "Home",
  components: {
    UploadFile,
    EditFile,
    SeeFiles,
    AddFriends,
  },
  data() {
    return {
      user: {
        idUsuario: "",
        imagen_url: "",
        nombre: "",
        correo: "",
        idRol: "",
      },
      isUploadVisible: false,
      isEditVisible: false,
      isFriendsVisible: false,
      isSeeFilesVisible: false,
      publicFiles: [],
      privateFiles: [],
      currentFile: [1],
      FriendsFiles: [],
      pdfPreview: require("../assets/pdficon.png"),
    };
  },
  beforeMount() {
    let us = localStorage.getItem("user-info");
    if (!us) {
      this.$router.push({ name: "Login" });
    }
    try {
      this.user = JSON.parse(us);
      //console.log(this.user);
      this.getFiles();
    } catch (e) {
      console.log("ERROR: ", e);
    }
  },
  methods: {
    getFiles() {
      //REQUEST FOR ALL FILES OF THIS USER.
      if (this.user) {
        this.axios
          .get(`/getUserFiles/${this.user.idUsuario}`)
          .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
              let img;
              if (response.data[i].tipo == "Imagen") {
                img = response.data[i].archivo_url;
              } else {
                img = this.pdfPreview; //<-- imagen por defecto para un pdf.
              }
              let auxArch = {
                idArchivo: response.data[i].idArchivo,
                archivo_url: response.data[i].archivo_url,
                fecha_subida: response.data[i].fecha_subida,
                nombre: response.data[i].nombre,
                tipo: response.data[i].tipo,
                idVisibilidad: response.data[i].idVisibilidad,
                visibilidad: response.data[i].visibilidad,
                imagen_arch: img,
              };

              if (auxArch.visibilidad === "Publico") {
                this.publicFiles.push(auxArch);
              } else if (auxArch.visibilidad === "Privado") {
                this.privateFiles.push(auxArch);
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    addToArray() {
      this.publicFiles = [];
      this.privateFiles = [];
      this.getFiles();
    },

    editArray(editedF) {
      if (editedF.visibilidad === "Publico") {
        var flag = false;
        var elementPos = this.publicFiles
          .map(function (x) {
            return x.idArchivo;
          })
          .indexOf(editedF.idArchivo);
        if (elementPos > -1) {
          flag = true;
          this.publicFiles[elementPos] = editedF;
        }
        if (!flag) {
          elementPos = this.privateFiles
            .map(function (x) {
              return x.idArchivo;
            })
            .indexOf(editedF.idArchivo);
          if (elementPos > -1) {
            flag = true;
            this.privateFiles.splice(elementPos, 1);
            this.publicFiles.unshift(editedF);
          }
        }
      } else {
        flag = false;
        elementPos = this.privateFiles
          .map(function (x) {
            return x.idArchivo;
          })
          .indexOf(editedF.idArchivo);
        if (elementPos > -1) {
          flag = true;
          this.privateFiles[elementPos] = editedF;
        }
        if (!flag) {
          elementPos = this.publicFiles
            .map(function (x) {
              return x.idArchivo;
            })
            .indexOf(editedF.idArchivo);
          if (elementPos > -1) {
            flag = true;
            this.publicFiles.splice(elementPos, 1);
            this.privateFiles.unshift(editedF);
          }
        }
      }
    },

    editFile(archivo) {
      let cF = {
        nombre: archivo.nombre,
        idArchivo: archivo.idArchivo,
        fecha_subida: archivo.fecha_subida,
        tipo: archivo.tipo,
        archivo_url: archivo.archivo_url,
        visibilidad: archivo.visibilidad,
        imagen_arch: archivo.imagen_arch,
        idVisibilidad: archivo.idVisibilidad,
      };
      this.currentFile[0] = cF;
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
        confirmButtonText: "Si, eliminar!",
      }).then((result) => {
        if (result.isConfirmed) {
          let us = {
            user: this.user.username,
          };
          this.axios
            .post("/login", us)
            .then((response) => {
              if (response.data.length > 0) {
                bcrypt.compare(
                  result.value,
                  response.data[0].contrasena,
                  function (err, resultx) {
                    if (err) {
                      throw err;
                    }
                    if (resultx === true) {
                      this.axios
                        .put(`/deleteFile/${archivo.idArchivo}`)
                        .then((response) => {
                          if (response.data.status === true) {
                            Swal.fire(
                              "Eliminado!",
                              "El archivo ha sido eliminado satisfactoriamente",
                              "success"
                            );
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
                          } else {
                            Swal.fire(
                              "Error!",
                              "No se pudo hacer la eliminacion en el servidor",
                              "error"
                            );
                          }
                        });
                    } else {
                      Swal.fire("Error!", "Contraseña Incorrecta", "error");
                    }
                  }.bind(this)
                );
              } else {
                Swal.fire("Error!", "Contraseña Incorrecta", "error");
              }
            })
            .catch((error) => {
              console.log(error);
            });
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
    closeSeeFiles() {
      this.isSeeFilesVisible = false;
    },

    showFriends() {
      this.isFriendsVisible = true;
    },

    showFiles() {
      this.FriendsFiles = [];
      this.axios
        .get(`/getFriendsFiles/${this.user.idUsuario}`)
        .then((response) => {
          for (var i = 0; i < response.data.length; i++) {
            let aux = {
              idUsuario: response.data[i].idUsuario,
              username: response.data[i].username,
              imagen_url: response.data[i].imagen_url,
              idArchivo: response.data[i].idArchivo,
              archivo: response.data[i].archivo,
              archivo_url: response.data[i].archivo_url,
              fecha_subida: response.data[i].fecha_subida,
              tipo: response.data[i].tipo,
            };
            this.FriendsFiles.push(aux);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      this.isSeeFilesVisible = true;
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