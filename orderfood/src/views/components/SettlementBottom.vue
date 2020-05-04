<template>
  <div class="SettlementBottom">
    <div class="num_box">x{{settlement.count}}</div>
    <div class="price_box">¥{{settlement.price}}</div>
    <div class="submit_btn" @click="handleSubmit">结算</div>
  </div>
</template>
<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
export default {
  props: {},
  setup() {
    const store = useStore();
    const settlement = computed(() => store.getters.settlement);
    const handleSubmit = () => {
      const sc = store.state.shopcart;
      const shopcart = Object.keys(sc).map(key => ({
        id: key,
        count: sc[key]
      }));

      console.log('shopcart=>', shopcart);
      console.log('如果需要原食物的参数可以直接去state中获取');
    };
    return {
      settlement,
      handleSubmit
    };
  }
};
</script>
<style lang="scss" scoped>
.SettlementBottom {
  position: fixed;
  z-index: 20;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 48px;
  background-color: rgb(49, 49, 49);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  .num_box {
    position: absolute;
    top: -16px;
    color: rgb(255, 255, 255);
    background-color: rgb(255, 0, 0);
    border-radius: 6px;
    padding: 4px 6px;
    font-size: 12px;
  }
  .price_box {
    color: #fff;
    font-size: 22px;
    font-weight: bold;
  }
  .submit_btn {
    border-radius: 4px;
    background-color: rgb(0, 162, 255);
    color: #fff;
    height: 36px;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>