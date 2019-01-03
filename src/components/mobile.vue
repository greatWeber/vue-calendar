<template>
  <div>
    <h2>vue-日历组件！！！</h2>
    
    <date></date>
  </div>
</template>

<script>
import date from './calendar/date.vue';
export default {
  data () {
    return {
      chooseDate: ''
    }
  },
  components: {
    date
  },
  methods: {
    change(date){
      console.log(date);
    },
    changeTime(data){
      console.log(data);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
