<template>
  <div class="hello">
    <div @click="handleSub">-</div>
    {{state.count}}
    <div @click="handleAdd">+</div>

    <div>{{refT1}}</div>
    <div>msg{{msg}}</div>
  </div>
</template>

<script>
import {
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onErrorCaptured,
  onMounted,
  onRenderTracked,
  onRenderTriggered,
  onUnmounted,
  onUpdated,
  onActivated,
  onDeactivated,
  reactive,
  ref,
  computed
} from 'vue';
import { useStore } from 'vuex';
import { useRouter,useRoute } from 'vue-router';
export default {
  setup(props, context) {
    console.log('beforeCreate 和 created 生命周期');
    
    
    const state = reactive({ count: 0 });
    const refT1 = ref(1);
    const store = useStore();

    onBeforeMount(e => {
      console.log('onBeforeMount', e);
      console.log(useRoute().path);
    console.log(useRouter().push('/'));
    });
    onErrorCaptured(e => {
      console.log('onErrorCaptured', e);
    });
    onMounted(e => {
      console.log(store);

      console.log('onMounted', e);
    });
    onRenderTriggered(e => {
      console.log('onRenderTriggered', e);
    }, refT1);
    onUnmounted(e => {
      console.log('onUnmounted', e);
    });
    onRenderTracked(e => {
      console.log('onRenderTracked', e);
    });
    onBeforeUpdate(e => {
      console.log('onBeforeUpdate', e);
    });
    onBeforeUnmount(e => {
      console.log('onBeforeUnmount', e);
    });
    onUpdated(e => {
      console.log('onUpdated', e);
    });
    onActivated(e => {
      console.log('onActivated', e);
    });

    onDeactivated(e => {
      console.log('onDeactivated', e);
    });
    const handleAdd = () => {
      refT1.value++;
      state.count++;
      context.emit('add', '我是参数');
      store.dispatch('setMsg', state.count);
    };
    const handleSub = () => {
      state.count--;
    };

    console.log(context);


    const msg = computed(() => store.state.msg);
    return {
      state,
      handleAdd,
      handleSub,
      refT1,
      msg
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
