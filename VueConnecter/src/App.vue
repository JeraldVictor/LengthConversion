<template>
  <div>
      <div class="container">
          <div class="jumbotron">
              <div class="form-group mx-sm-3 mb-2">
                  Enter The Value
                  <input type="number" class="form-control" placeholder="Enter the value to convert " v-model="input">
              </div>
              <div class="form-group">
                  <label for="exampleFormControlSelect1">Entered Value</label>
                  <select class="form-control" id="exampleFormControlSelect1" v-model="opt1">
                        <option v-for="(i,index) in defunit" :key="index" :value="i">
                             {{defmes[index]}}
                        </option>
                  </select>
              </div>
              <div class="form-group">
                  <label for="exampleFormControlSelect1">Entered Value</label>
                  <select class="form-control" id="exampleFormControlSelect1" v-model="opt2">
                        <option v-for="(i,index) in defunit" :key="index" :value="i">
                             {{defmes[index]}}
                        </option>
                  </select>
              </div>
              <button @click="req" type="button" class="btn btn-primary">Convert</button>
          </div>
      </div>
     <div class="disp">
          <p>
              {{ answer }}
          </p>
      </div>

    <!-- <div v-for="i in defunit" :key="i">
        {{i}}
    </div>
    <div v-for="i in defmes" :key="i">
        {{i}}
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      opt1: "",
      opt2: "",
      answer: "",
      defmes: [],
      defunit: []
    };
  },
  created() {
    let url = "http://localhost:3000/getval";
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        var dd = data;
        dd.forEach(i => {
          this.defunit.push(i.unit);
          this.defmes.push(i.measurement);
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    req() {
      var dd;
      this.disp = false;
      let url =
        "http://localhost:3000/conversion/" + this.input + "/" + this.opt1;
      fetch(url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          dd = data;
          dd.forEach(i => {
            if (i.unit == this.opt2) this.answer = i.conversion + " " + i.unit;
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.container {
  margin: 10% auto 0;
}
button {
  margin-left: 70%;
}
.disp {
  margin-top: 0;
  margin-left: 40%;
}
</style>
