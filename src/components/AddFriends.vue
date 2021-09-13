<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <h2>Agregar Amigos</h2>
        <hr />
        <input
          class="searchBar"
          placeholder="Busca un Usuario"
          type="text"
          v-model="busqueda"
        />
        <button class="btn-green" id="searchButton" @click="searchUser()">
          Buscar
        </button>
      </header>

      <section class="modal-body">
        <div class="friends-list">
          <div
            id="user-info"
            v-for="user of Users"
            :key="user.id"
            class="card-top"
          >
            <div class="card-image">
              <img :src="user.imagen" />
            </div>
            <div class="card-text">
              <h4>{{ user.nombre }}</h4>
              <p>Archivos Publicos: {{ user.publicFiles.length }}</p>
              <button class="btn-gr" @click="addFriend(user)">
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
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer class="modal-footer">
        <button type="button" class="btn-green" @click="close">Cerrar</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddFriends",
  emits: ["close"],
  beforeMount() {
    this.getUsers();
  },
  data() {
    return {
      busqueda: "",
      imagen: require("../assets/User.jpg"),
      Users: [],
    };
  },
  methods: {
    getUsers() {
      for (var i = 0; i < 16; i++) {
        let aux = {
          id: i,
          nombre: "Juan",
          imagen: this.imagen,
          publicFiles: [5],
        };
        this.Users.push(aux);
      }
    },
    addFriend(friend){
        console.log(friend);
    },
    searchUser() {},
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
  width: 90%;
  height: 95%;
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
  font-size: 20px;
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
  height: 60%;
  overflow: hidden;
  overflow-y: auto;
  text-align: center;
}
.btn-green {
  width: 150px;
  margin-right: 3px;
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}

.friends-list {
  display: table;
}

.searchBar {
  border: 1px solid #00b4cc;
  text-align: center;
  color: rgb(7, 6, 6);
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
  width: 50%;
  margin-right: 5px;
}

#searchButton {
  border-radius: 25px;
  margin-top: 5px;
  margin-bottom: 5px;
  height: 40px;
  width: 80px;
  background: rgb(113, 189, 224);
}

.card-top button{
    width: 80px;
}

svg {
  width: 42px;
  height: 42px;
  position: relative;
  z-index: 10;
  overflow: hidden;
}
svg:hover {
  fill: white;
}

#user-info {
  display: inline-table;
  margin-top: 10px;
  margin-left: 10px;
}
.card-top,
.card-right,
.card-bottom,
.card-left {
  display: flex;
  flex-wrap: nowrap;
  width: 20%;
  border-radius: 95.2380952381px;
  box-shadow: 0px 3px 9px 1px rgba(0, 10, 20, 0.2);
}
.card-top {
  flex-direction: column;
  grid-column: auto / span 1;
  grid-row: auto / span 2;
}
.card-image {
  display: flex;
}

.card-image img {
  width: 100%;
  object-fit: cover;
}
.card-top img {
  border-radius: 95.2380952381px 95.2380952381px 0 0;
}
.card-text {
  align-self: center;
  padding: 23px;
}
.card-top .card-text {
  height: auto;
  width: auto;
  padding-bottom: 36.8px;
}
.card-text p {
  margin: 0;
  line-height: 1.35em;
  color: #345;
}
@media (max-width: 200px) {
  .card-top {
    flex-direction: row;
    grid-column: auto / span 2;
    grid-row: auto / span 1;
  }
  .card-bottom {
    flex-direction: row-reverse;
    grid-column: auto / span 2;
    grid-row: auto / span 1;
  }
  .card-top .card-image,
  .card-bottom .card-image {
    height: 100%;
    width: 50%;
  }
  .card-top img {
    border-radius: 95.2380952381px 0 0 95.2380952381px;
  }
  .card-bottom img {
    border-radius: 0 95.2380952381px 95.2380952381px 0;
  }
  .card-top .card-text {
    height: auto;
    width: 50%;
    padding-right: 36.8px;
  }
  .card-bottom .card-text {
    height: auto;
    width: 50%;
    padding-left: 36.8px;
  }
}
@media (max-width: 200px) {
  .card-image {
    width: 38% !important;
  }
  .card-text {
    width: 62% !important;
  }
}
</style>