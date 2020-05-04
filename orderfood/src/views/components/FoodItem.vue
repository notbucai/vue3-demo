<template>
  <div class="FoodItem">
    <div class="food-title">{{item.name}}</div>
    <div class="food-item" v-for="(food) in item.foods" :key="food.item_id">
      <div class="food-pic">
        <img
          src="https://upload.jianshu.io/users/upload_avatars/16175630/e2ee85e5-7cb0-429d-a517-bb1c6f1833e4?imageMogr2/auto-orient/strip|imageView2/1/w/80/h/80/format/webp"
          alt
        />
      </div>
      <div class="food-main">
        <div class="food-info">
          <div class="title">{{food.name}}</div>
          <div class="info">{{food.applicable_quantity_text}}</div>
        </div>
        <div class="money">¥{{food.specfoods[0].price}}</div>
      </div>
      <div class="food-action">
        <div class="action-item minus" v-if="shopcart[food.item_id]" @click="handleMinus(food)">-</div>
        <div class="action-num" v-if="shopcart[food.item_id]">{{shopcart[food.item_id]}}</div>
        <div class="action-item puls" @click="handlePuls(food)">+</div>
      </div>
    </div>
  </div>
</template>
<script>
// import { reactive, unref } from 'vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
export default {
  components: {},
  props: {
    item: Object
  },
  setup() {
    // store
    const store = useStore();
    // 购物车
    const shopcart = computed(() => store.state.shopcart);

    const handleChangeCount = (food, type) => {
      const id = food.item_id;
      const actionName = type > 0 ? 'addItem' : 'subItem';
      store.dispatch(actionName, id);
    };

    const handleMinus = food => {
      handleChangeCount(food, -1);
    };
    const handlePuls = food => {
      handleChangeCount(food, 1);
    };

    return {
      shopcart,
      handleMinus,
      handlePuls
    };
  }
};
</script>
<style lang="scss" scoped>
.FoodItem {
  .food-title {
    position: sticky;
    z-index: 10;
    top: 0;
    text-align: left;
    padding: 10px 4px;
    background-color: #fff;
    color: #333;
    font-size: 12px;
    font-weight: bold;
  }
  .food-item {
    display: flex;
    padding: 6px;
    position: relative;
    .food-pic {
      width: 80px;
      height: 80px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 2px;
      }
    }
    .food-main {
      flex: 1;
      padding: 4px 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .food-info {
        font-size: 12px;
        .title {
          font-size: 14px;
          font-weight: bold;
        }
      }
      .money {
        font-size: 14px;
        font-weight: bold;
        color: rgb(255, 42, 42);
      }
    }
    .food-action {
      position: absolute;
      right: 6px;
      bottom: 10px;
      display: flex;
      align-items: center;
      .action-num {
        margin: 0 4px;
        display: flex;
        align-items: center;
        height: 100%;
        box-sizing: border-box;
      }
      .action-item {
        width: 24px;
        height: 24px;
        font-size: 18px;
        border-radius: 50%;
        border: 1px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 24px;
        box-sizing: border-box;

        &.puls {
          background-color: #2196f3;
          border: 1px solid #2196f3;
          color: #fff;
        }
        &.minus {
          color: #2196f3;
          border: 1px solid #2196f3;
        }
      }
    }
  }
}
</style>