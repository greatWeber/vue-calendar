<template>
  <div>
    <h2>vue-日历组件！！！</h2>
    
    <pc-date thime="#1b51ea" @dateChange="change"></pc-date>
    <pc-time thime="#1b51ea" @dateChange="change" @timeChange="changeTime"></pc-time>
    
  </div>
</template>

<script>
import pcDate from './calendar/pc-date.vue';
import pcTime from './calendar/pc-time.vue';
export default {
  data () {
    return {
      chooseDate: ''
    }
  },
  components: {
    pcDate,
    pcTime
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
