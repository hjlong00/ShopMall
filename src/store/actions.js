import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
  addCart (context, payload) {
    // payload新添加的商品, 先判断是否已经在数组中
    // 方法一
    // let oldProduct = null;
    // for(let item of state.carList){
    //   if(item.iid === payload.iid){
    //     oldProduct = item
    //   }
    // }

    // 方法二
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    // 2，做出对应动作, 有就加1， 没有就添加进购物车
    if (oldProduct) {
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      context.commit(ADD_TO_CART, payload)
    }
  }
}
