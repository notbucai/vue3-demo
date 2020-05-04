/*
 * @Author: bucai
 * @Date: 2020-05-04 09:03:06
 * @LastEditors: bucai
 * @LastEditTime: 2020-05-04 09:07:34
 * @Description: 
 */
import { ref } from 'vue';
export const useScrollTop = () => {
  const top = ref(0);
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    top.value = scrollTop;
  });
  return top;
}