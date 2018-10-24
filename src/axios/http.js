import axios from 'axios'
import store from '../vuex/store'
import router from '../router/index'
// http request 拦截器
axios.create({timeout: 1000});

axios.interceptors.request.use(
    config => {
        if (store.state.user.tokenid) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `${store.state.user.tokenid}`;
        }
        else if(sessionStorage.tokenid){
            store.state.user.tokenid = sessionStorage.tokenid;
            store.state.user.username = sessionStorage.username;
            store.state.user.realname = sessionStorage.realname;
            store.state.user.mobile = sessionStorage.mobile;
            store.state.user.email = sessionStorage.email;

            config.headers.Authorization = `${sessionStorage.tokenid}`;
        }
        return config;
    },
    err => {
        return err;
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.status) {
                case 401:
                    this.$store.commit('setToken', '');
                    //ssessionStorage.clear();
                    router.replace({
                        path: '/login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        return error;   // 返回接口返回的错误信息
    });

export default axios
