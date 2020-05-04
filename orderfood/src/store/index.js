import { createStore } from "vuex";

export default createStore({
  state: {
    shopcart: {},
    foodList: [],
  },
  getters: {
    // TODO: 这里的金额计算 是"有问题"的
    // 计算金额与数量
    settlement(state) {

      let allPrice = 0;
      let allCount = 0;

      const shopcart = state.shopcart;
      const foodList = state.foodList;
      // 得到所有食物列表
      const foods = foodList.reduce((previousValue, currentValue) => {
        return previousValue.concat(currentValue.foods);
      }, []);
      // 通过购物车计算金额数量
      Object.keys(shopcart).forEach(key => {
        const count = shopcart[key];
        if (!count) return;
        const food = foods.find(item => item.item_id == key);
        const price = food.specfoods[0].price;
        // 这里只是一种简单的处理浮点金额的方案（不保险），实际上后端直接返回以分为单位的金额会更好，【在后端计算金额一定情况下可能更靠谱】
        allPrice += (price * 10000 * count);
        allCount += count;
      });

      return {
        price: allPrice / 10000,
        count: allCount,
      }
    }
  },
  mutations: {
    ADD_ITEM(state, id) {
      state.shopcart[id] = state.shopcart[id] || 0;
      state.shopcart[id]++;
    },
    SUB_ITEM(state, id) {
      state.shopcart[id] = state.shopcart[id] || 0;
      state.shopcart[id]--;
    },
    SET_FOOD_LIST(state, payload) {
      state.foodList = payload;
    }
  },
  actions: {
    setFoodList({ commit }, payload) {
      commit('SET_FOOD_LIST', payload)
    },
    addItem({ commit }, id) {
      commit('ADD_ITEM', id)
    },
    subItem({ commit }, id) {
      commit('SUB_ITEM', id)
    },
  }
});