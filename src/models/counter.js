
export default {
  namespace: 'counter',
  state: 0,
  reducers: {
    countUp(state,action){
      return state + 1;
    },
    countDown(state,action){
      return state -1 ;
    },
    reset(){
      return 0;
    }

  },
  effects: {},
  subscriptions: {
    setup({dispatch,history}){
      return history.listen(({pathname,query})=> {
        if(pathname === "/counter"){//进入这个页面的时候，将数据重置
          dispatch({
            type:"reset"
          })
        }
      })
    },
    // keyEvent(dispatch){
    //   key("ctrl+up",()=>{
    //     dispatch({
    //       type:"countUp"
    //     })
    //   })
    // }
  },
};
