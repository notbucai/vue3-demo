/*
 * @Author: bucai
 * @Date: 2020-05-04 09:11:50
 * @LastEditors: bucai
 * @LastEditTime: 2020-05-04 12:52:53
 * @Description: 
 */
import axios from 'axios';
export const getList = async () => {
  const res = await axios.get('http://easy-mock.ncgame.cc/mock/5c526e3466333b1c2a53255f/example/shoplist');
  return res.data.data;
}