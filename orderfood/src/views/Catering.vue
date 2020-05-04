<template>
  <div class="Catering">
    <header class="header">
      <div class="shop">
        <div class="shop-pic">
          <img
            src="https://upload.jianshu.io/users/upload_avatars/7759683/995f635d-357b-4539-b008-55aa6b0ac140.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp"
            alt
          />
        </div>
        <div class="shop-name">一袋米</div>
      </div>
      <div class="navbar">
        <div class="nav-item">点餐</div>
        <div class="nav-item">评价</div>
        <div class="nav-item">商家</div>
      </div>
      <div class="outher-box"></div>
    </header>
    <main class="main">
      <div class="left">
        <div
          class="left-item"
          v-for="(item, index) in list"
          :class="{active:elIndex == index}"
          :key="index"
          @click="srcollTo(index)"
        >{{item.name}}</div>
      </div>
      <div class="right">
        <template v-for="(_item, index) in list">
          <!-- 这里的ref就又点难受了 -->
          <div :key="index" :ref="el=>itemEls[index] = el">
            <food-item :item="_item" />
          </div>
        </template>
      </div>
    <settlement-bottom />
    </main>
  </div>
</template>
<script>
import { watch, ref, onBeforeUpdate, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useScrollTop } from '../hooks';
import { getList } from '../ajax/index';
import FoodItem from './components/FoodItem';
import SettlementBottom from './components/SettlementBottom';

export default {
  components: { FoodItem, SettlementBottom },
  setup() {
    // store
    const store = useStore();

    const list = computed(() => store.state.foodList);

    onMounted(async () => {
      // NOTE: 获取数据
      let resList = await getList();
      // 存入store
      store.dispatch('setFoodList', resList);
    });

    // 组节点列表
    const itemEls = ref([]);
    // 当前选中节点
    const elIndex = ref(0);

    // 监听数据
    const scrollTop = useScrollTop([]);

    onBeforeUpdate(() => {
      // 更新时清空
      itemEls.value = [];
    });

    // 监听滚动条变化
    watch(scrollTop, () => {
      let index = 0;
      // 判断距离头部最近的元素 实际上这里是可以缓存高度的
      itemEls.value.forEach((el, i) => {
        // console.log('el=>',el,'val=>', scrollTop.value);
        if (el.offsetTop > scrollTop.value) return;
        index = i;
      });
      // 绑定节点
      elIndex.value = index;
    });

    const srcollTo = index => {
      elIndex.value = index;
      const el = itemEls.value[index];
      const offsetTop = el.offsetTop;
      window.scrollTo(0, offsetTop);
    };

    return {
      list,
      itemEls,
      elIndex,
      srcollTo
    };
  }
};
</script>
<style lang="scss">
$color: rgb(0, 70, 55);
div,
span,
p {
  box-sizing: border-box;
}
.Catering {
  background-color: #fff;
  .header {
    padding: 4vw;
    /* background-color: $color; */
    color: #fff;
    position: relative;
    background-color: rgba($color: #000000, $alpha: 0.6);
    &::before {
      content: '';
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      background-image: url(https://user-gold-cdn.xitu.io/2020/4/21/1719d5f757f43e3d?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1);
    }
    .shop {
      display: flex;
      align-items: center;
      font-size: 16px;
      &-pic {
        width: 32px;
        height: 32px;
        margin-right: 6px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid #fff;
          box-sizing: border-box;
        }
      }
    }
    .navbar {
      display: flex;
      align-items: center;
      .nav-item {
        margin: 10px;
        font-size: 14px;
        border-bottom: 3px solid #fff;
        font-weight: bold;
      }
    }
    .outher-box {
      width: 100%;
      height: 24vw;
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(255, 255, 255, 0.453);
      margin: 0 auto;
      background-color: #fff;
    }
  }
  .main {
    display: flex;
    .left {
      position: sticky;
      top: 0;
      width: 22vw;
      height: 100vh;
      padding-bottom: 48px;
      overflow-y: auto;
      text-align: center;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
        display: none;
      }
      &-item {
        position: relative;
        font-size: 12px;
        font-weight: bold;
        color: #666;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 12px;
        &.active {
          color: #333;
          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 3px;
            height: 40%;
            background-color: #f00;
          }
        }
      }
    }
    .right {
      flex: 1;
      padding-bottom: 48px;
      box-sizing: border-box;
    }
  }
}
* {
  padding: 0;
  margin: 0;
}
</style>