<template>
  <div class="hello">
    <br />
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <img
            style="width:450px; height:400px"
            src="https://sigma-studios.s3-us-west-2.amazonaws.com/test/sigma-image.png"
          />
        </div>
        <div class="col-md-5 box">
          <form @submit.prevent="addVisitor" enctype="multipart/form-data">
            <div class="form-group">
              <label class="black" for="state">
                <b>Departamento*</b>
              </label>
              <select 
                class="form-control"
                id="state"
                @change="selectState($event)" dadasdas
                dadasd
                v-model="obj.state"
              >
                <option>Eliga una Opcion</option>
                <option v-for="state in states" :key="state" v-bind:value="state">{{state}}</option>
              </select>
            </div>

            <div class="form-group">
              <label class="black" for="mun">
                <b>Municipio*</b>
              </label>
              <select
                class="form-control"
                id="mun"
                v-model="obj.parish"
              >
                <option>Eliga una Opcion</option>
                <option v-for="muni in municipios" :key="muni" v-bind:value="muni">{{muni}}</option>
              </select>
            </div>

            <div class="form-group">
              <label class="black" for="name">Nombre*</label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Nombre"
                v-model="obj.name"
              />
            </div>
            <div class="form-group">
              <label class="black" for="email">Correo*</label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Correo"
                v-model="obj.email"
              />
            </div>
            <br />
            <button type="submit" class="btn btn-danger boton">ENVIAR</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

Vue.prototype.$axios = axios;
Vue.use(VueToast);
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },

  data() {
    return {
      states: [],
      municipios: [],
      aux: [],
      obj: { state: "", parish: "", name: "", email: "" },

    };
  },
  created: function () {
    this.getData();
  },
  methods: {
    getData: function () {
      axios.get("http://localhost:8000/datos").then((res) => {
        console.log(res.data);
        this.aux = res.data;
        var count = 0;
        for (const prop in res.data) {
          
          this.states[count] = `${prop}`;
          count++;
        }
        console.log("criollo" + this.states);
      });
    },
    selectState: function (event) {
      //alert(event.target.value);
      this.obj.state = event.target.value;
      for (const prop in this.aux) {
        if (`${prop}` == event.target.value) {
          this.municipios = `${this.aux[prop]}`;
        }
      }

      var res = this.municipios.split(",");
      console.log(res);
      this.municipios = res;
    },
    addVisitor: function () {
      let formData = new FormData();
      formData.append("state", this.obj.state);
      formData.append("parish", this.obj.parish);
      formData.append("name", this.obj.name);
      formData.append("email", this.obj.email);

      axios
        .post("http://localhost:8000/addVisitor", formData)
        .then((response) => {
          Vue.$toast.success(response.data, 10000);
          this.$modal.hide("productos");
        })
        .catch(
            error => {

                    let er=error.response.data.errors;
                    let mensaje="Undefined"
                    if(er.hasOwnProperty('name')){
                      mensaje=er.name[0];
                    }else if(er.hasOwnProperty('email')){
                      mensaje=er.email[0];
                    }else if(er.hasOwnProperty('state')){
                      mensaje=er.state[0];
                    }else if(er.hasOwnProperty('parish')){
                      mensaje=er.parish[0];
                    }
                    Vue.$toast.error(mensaje,4000);
                    console.log(error.response.data);
            }
           )
    },
  },
};
</script>


<style scoped>
.box {
  border-radius: 10px 10px 10px 10px;
  -moz-border-radius: 10px 10px 10px 10px;
  -webkit-border-radius: 10px 10px 10px 10px;
  border: 0px dotted #242224;

  -webkit-box-shadow: 0px 3px 34px -14px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 3px 34px -14px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 3px 34px -14px rgba(0, 0, 0, 0.75);
  padding: 3em;
}

.black {
  font-weight: bold;
  font-size: 14px;
  color: black;
  float: left;
}
.boton {
  border-radius: 189px 189px 189px 189px;
  -moz-border-radius: 189px 189px 189px 189px;
  -webkit-border-radius: 189px 189px 189px 189px;
  border: 0px solid #000000;

  font-family: "Roboto", sans-serif;
  width: 140px;
  height: 50px;
}
</style>
