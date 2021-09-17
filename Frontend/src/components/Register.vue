<template>
  <div class="wrapper">
    <div class="container">
      <form class="form" @submit="registerEvent">
        <div class="titulo">
          <h1 class="header heading">
            <span class="heading--underline">Registrarse</span>
          </h1>
        </div>
        <br />
        <br />
        <br />

        <div class="user-info">
          <div class="user-data">
            <input
              type="text"
              v-model="registerValues.user"
              placeholder="Username"
            />
            <input
              type="text"
              v-model="registerValues.correo"
              placeholder="Email"
            />
            <input
              type="password"
              v-model="registerValues.contrasena"
              placeholder="Password"
            />
            <input
              type="password"
              v-model="registerValues.confirmPass"
              placeholder="Confirm Password"
            />
          </div>
          <div class="img-upload">
            <div class="imgPreview">
              <img :src="imagen" />
            </div>
            <div class="uploadButton">
              <label class="custom-file-upload">
                <input type="file" @change="handlePhoto" accept="image/*" />
                Subir Foto
              </label>
            </div>
          </div>
        </div>
        <div class="Botones">
          <div>
            <button type="submit" id="register-button">Registrarse</button>
          </div>
          <div><button @click="goBack()" id="back-button">Volver</button></div>
        </div>
      </form>
    </div>

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
  </div>
</template>

<script>
import Swal from "sweetalert2";
import bcrypt from "bcryptjs";

export default {
  name: "Register",
  data() {
    return {
      registerValues: {
        user: "",
        correo: "",
        contrasena: "",
        confirmPass: "",
        idRol: 1,
      },
      imagen: require("../assets/noimage.png"),
      imagenBase64: "",
    };
  },
  beforeCreate() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "Home" });
    }
  },
  methods: {
    registerEvent(event) {
      event.preventDefault();
      console.log(this.imagenBase64);
      console.log(this.imagenBase64.length);
      if (
        this.registerValues.user.length > 0 &&
        this.registerValues.correo.length > 0 &&
        this.imagenBase64.length > 0 &&
        this.registerValues.contrasena.length > 0 &&
        this.registerValues.confirmPass.length > 0
      ) {
        const salt = bcrypt.genSaltSync(10)
        this.registerValues.contrasena = bcrypt.hashSync(this.registerValues.contrasena, salt)
        console.log("SAVING: ", this.registerValues.contrasena)
        let user = {
          user: this.registerValues.user,
          correo: this.registerValues.correo,
          nombre: this.registerValues.user,
          contrasena: this.registerValues.contrasena,
          imagen_url:
            "https://i.pinimg.com/originals/2c/68/a2/2c68a2099526c36259b51f707e5e66f7.jpg",
          idRol: 2,
        };
        console.log(user);
        
        this.axios
          .post("/register", user)
          .then((response) => {
            if (response.data.status === true) {
              this.mensajeOk();
            } else {
              Swal.fire({
                icon: "error",
                title: "ERROR al registrarse",
                text: "No se pudo completar el registro, intente mas tarde.",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
        this.mensajeOk();
      } else {
        Swal.fire({
          icon: "error",
          title: "Campos Incorrectos",
          text: "Llene todos los campos.",
        });
      }
    },
    goBack() {
      this.$router.push({ name: "Login" });
    },

    mensajeOk() {
      Swal.fire({
        title: "Usuario registrado satisfactoriamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        console.log(result);
        this.$router.push({ name: "Login" });
      });
    },

    handlePhoto(event) {
      const file = event.target.files[0];
      this.imagen = URL.createObjectURL(file);
      this.createBase64Image(file);
    },
    createBase64Image(fileObject) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.imagenBase64 = e.target.result;
      };
      reader.readAsDataURL(fileObject);
    },
  },
};
</script>

<style lang="css" scoped>
@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300);

.heading--underline {
  background-image: linear-gradient(120deg, #28c074 0%, #84f77a 100%);
  background-repeat: no-repeat;
  background-size: 100% 0.2em;
  background-position: 0 88%;
  transition: background-size 200ms ease-in;
  color: rgb(255, 255, 255);
  text-shadow: 2px 2px #000000;
  z-index: 2;
  float: left;
  margin-left: 18%;
}
.heading--underline:hover {
  background-size: 100% 88%;
  z-index: 2;
}
#register-button {
  margin-bottom: 2px;
}

.Botones {
  float: left;
  margin-left: 14%;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-weight: 300;
}
.user-info {
  display: flex;
}

.msjError {
  color: rgba(221, 33, 33, 0.986);
  text-shadow: 0px 0px 10px rgba(255, 0, 0, 0.9);
}
.user-data {
  width: 70%;
}

.img-upload {
  margin-left: -10%;
  width: 20%;
}

.imgPreview {
  margin-bottom: 10px;
}

form img {
  min-width: 160px;
  min-height: 160px;
  max-width: 160px;
  max-height: 160px;
}

.uploadButton {
  width: 100%;
  margin-left: 15px;
}

body {
  font-family: "Source Sans Pro", sans-serif;
  color: white;
  font-weight: 300;
}
body ::-webkit-input-placeholder {
  font-family: "Source Sans Pro", sans-serif;
  color: white;
  font-weight: 300;
}
body :-moz-placeholder {
  font-family: "Source Sans Pro", sans-serif;
  color: white;
  opacity: 1;
  font-weight: 300;
}
body ::-moz-placeholder {
  font-family: "Source Sans Pro", sans-serif;
  color: white;
  opacity: 1;
  font-weight: 300;
}
body :-ms-input-placeholder {
  font-family: "Source Sans Pro", sans-serif;
  color: white;
  font-weight: 300;
}
.wrapper {
  background: #50a3a2;
  background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
  background: -moz-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
  background: -o-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
  background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 400px;
  margin-top: -200px;
  overflow: hidden;
}
.wrapper.form-success .container h1 {
  transform: translateY(85px);
}
.container {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -60px;
  padding: 80px 0;
  height: 400px;
  text-align: center;
}
.container h1 {
  font-size: 40px;
  transition-duration: 1s;
  transition-timing-function: ease-in-put;
  font-weight: 200;
}

form {
  padding: 20px 0;
  position: relative;
  z-index: 2;
}
form input {
  display: block;
  appearance: none;
  outline: 0;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background-color: rgba(255, 255, 255, 0.2);
  width: 250px;
  border-radius: 3px;
  padding: 10px 15px;
  margin: 0 auto 10px auto;
  text-align: center;
  font-size: 18px;
  color: white;
  transition-duration: 0.25s;
  font-weight: 300;
}
form input:hover {
  background-color: rgba(255, 255, 255, 0.4);
}
form input:focus {
  background-color: white;
  width: 300px;
  color: #53e3a6;
}
form button {
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

input[type="file"] {
  display: none;
}

.custom-file-upload {
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

form button:hover {
  background-color: #f5f7f9;
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