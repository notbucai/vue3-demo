<template>
  <div class="Home">
    Home
    ~/ME/wwwroot/vue3test/src/views
    <img alt="Vue logo" src="../assets/logo.png">
    
  </div>
</template>
<script>
export default {
  components: {},
  props: {},
  computed: {},
  data() {
    return {
      msg: 'msg'
    };
  },
  created() {
    console.log('create')
  },
  mounted() {
    console.log('mounted')
  },
  methods: {
    test(){
      console.log(this.msg)
    }
  }
}
</script>
<style >
  .Home {
    padding: 10px
  }
</style>