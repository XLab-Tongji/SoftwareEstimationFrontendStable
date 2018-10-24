import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: {
    tokenid: '',
    username: '',
    realname: '',
    mobile: '',
    email: ''
  },
//  projectId: ''
}

const mutations = {
  doLogin (state, user_input) {
    state.user.tokenid = user_input.tokenid;
    state.user.username = user_input.username;
    state.user.realname = user_input.realname;
    state.user.mobile = user_input.mobile;
    state.user.email = user_input.email;
  },
  // setProjectId (state, projectId_input) {
  //   state.projectId = projectId_input;
  // },
  setToken(state, token){
    state.user.tokenid = token;
  },
  setRealname(state,realname){
    state.user.realname = realname;
  },
  setMobile(state,mobile){
    state.user.mobile = mobile;
  },
  setEmail(state,email){
    state.user.email = email;
  },
  setUsername(state,account){
    state.user.username = account;
  },
  reset(){
    state.tokenid = '';
  }
}


export default new Vuex.Store({
  state,
  mutations
})
