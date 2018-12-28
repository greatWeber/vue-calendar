<template>
  <div>
    <h2>vue-日历组件！！！</h2>
    <pc-date @dateChange="change"></pc-date>
    <pc-date thime="#1b51ea" @dateChange="change"></pc-date>
    
  </div>
</template>

<script>
import pcDate from './calendar/pc-date.vue';
export default {
  data () {
    return {
      chooseDate: ''
    }
  },
  components: {
    pcDate
  },
  methods: {
    change(date){
      console.log(date);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
