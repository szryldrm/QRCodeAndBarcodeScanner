import Vue from 'vue';
import Vuex from 'vuex';
import t from 'typy';
import createPersistedState from 'vuex-persistedstate';

import {AUTH} from './axios/';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isUserLogged: false,
        feedbackMessage: '',
        userSession: {
            tokken: null,
            user_display_name: null,
            user_email: null,
            user_nicename: null,
            user_id: null,
            token_expires: null,
        }
    },
    getters: {
        getStore: state => state,
        getUserSession: state => state.userSession,
    },
    mutations: {
        SET_USER_LOGIN_STATUS(state, payload) {
            if (typeof (payload) === "boolean") {
                state.isUserLogged = payload;
                state.feedbackMessage = '';

            } else {
                state.isUserLogged = t(payload, 'status').safeObject;
                state.feedbackMessage = t(payload, 'message').safeObject;
            }
        },
        SET_USER_SESSION(state, payload) {
            state.userSession = payload;
        },
        CLEAR_MESSAGE(state) {
            state.feedbackMessage = '';
        }
    },
    actions: {
        handleAuthStatus({commit, state}, response) {
            const nullUser = () => {
                if (typeof (Storage) !== "undefined") {
                    // remove user session
                    localStorage.removeItem('userSession');
                }
                return {
                    tokken: null,
                    user_display_name: null,
                    user_email: null,
                    user_nicename: null,
                }
            };

            if (t(response, 'code').safeObject) {

                switch (t(response, 'code').safeObject) {
                    // REST INFO
                    case 'rest_cannot_create':
                    case 'rest_invalid_param':
                        commit('SET_USER_LOGIN_STATUS', {status: true, message: t(response, 'message').safeObject});
                        break;

                    //LOGIN INFO
                    case '[jwt_auth] invalid_username':
                    case '[jwt_auth] incorrect_password':
                    case '[jwt_auth] invalid_email':
                        commit('SET_USER_LOGIN_STATUS', {status: false, message: 'Geçersiz Kullanıcı Bilgileri!'});
                        commit('SET_USER_SESSION', nullUser());
                        break;

                    //OTHERS

                    //Validations
                    case 'jwt_auth_valid_token':
                        commit('SET_USER_LOGIN_STATUS', {status: true, message: 'Doğrulama Başarılı'});
                        break;
                    case 'jwt_auth_no_auth_header':
                    case 'jwt_auth_bad_auth_header':
                    case 'jwt_auth_bad_config':
                    case 'jwt_auth_bad_iss':
                    case 'jwt_auth_bad_request':
                    case 'jwt_auth_token_revoked':
                        commit('SET_USER_LOGIN_STATUS', {status: false, message: t(response, 'message').safeObject});
                        break;

                    //Revoke
                    case 'jwt_auth_revoked_token':
                        commit('SET_USER_LOGIN_STATUS', {status: false, message: 'Başarıyla Çıkış Yapıldı'});
                        commit('SET_USER_SESSION', nullUser());
                        break;

                    case 'jwt_auth_no_token_to_revoke':
                        // force logout from app just in case ...
                        commit('SET_USER_LOGIN_STATUS', {
                            status: false,
                            message: t(response, 'message').safeObject + ' Uygulamadan Çıkış Yap'
                        });
                        commit('SET_USER_SESSION', nullUser());
                        break;

                    //reset Password
                    case 'jwt_auth_reset_password_not_allowed':
                    case 'jwt_auth_password_reset':
                    case 'jwt_auth_invalid_username':
                        commit('SET_USER_LOGIN_STATUS', {
                            status: state.isUserLogged,
                            message: t(response, 'message').safeObject
                        });
                        break;


                    default:
                        commit('SET_USER_LOGIN_STATUS', {
                            status: state.isUserLogged,
                            message: 'Beklenmeyen Hata, Üzgünüm :('
                        });
                        //commit('SET_USER_SESSION', nullUser );
                        break;
                }
            }
        },

        async checkLoginStatus({commit}) {
            let userValidate = false;
            commit('CLEAR_MESSAGE');
            if (typeof (Storage) !== "undefined") {
                let StoredUser = localStorage.getItem('userSession');
                StoredUser = JSON.parse(StoredUser);
                if (StoredUser != null && StoredUser.token) {
                    const data = {};
                    const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + StoredUser.token,
                    };
                    const axiosConfig = {
                        method: 'POST',
                        url: 'token/validate',
                        data,
                        headers
                    };

                    userValidate = await AUTH(axiosConfig)
                        .catch(er => {
                            window.console.error('ERROR #NC04', er);
                        }).then(response => {
                            if (response && response.data) {
                                if (response.data.data.status === 200) {
                                    commit('SET_USER_SESSION', StoredUser);
                                }
                            }
                        })
                }
            }
            return userValidate;
        },

        async loginUserAction({commit}, payload) {
            const {password, username, remember} = payload;

            const params = {username, password, remember};
            const userLogin = await AUTH.post('token', params)
                .catch(error => {
                    if (error.response && error.response.data)
                    {
                        this.dispatch('handleAuthStatus', error.response);
                    }
                }).then(response => {
                    if (response && response.data && response.data.token) {
                        let user = response.data;
                        if (typeof (Storage) !== "undefined") {
                            localStorage.setItem('userSession', JSON.stringify(user));
                        } else {
                            alert('Your browser is old, you will be not logged in after page refresh :( ... sorry old man.');
                        }
                        commit('SET_USER_SESSION', user);
                        commit('SET_USER_LOGIN_STATUS', {status: true, message: 'Successfully Logged'});
                    }
                    return response;
                });
            return userLogin;
        },
        // eslint-disable-next-line no-unused-vars
        async userLogout({state, commit}) {
            const user = state.userSession;

            if (!user || !user.token) return false;
            const token = user.token;
            const data = {
                status: 'publish',
                title: 'TES211T',
            };
            const headers = {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            };
            const axiosConfig = {
                method: 'POST',
                url: 'token/revoke',
                data,
                headers
            };

            const userLogout = await AUTH(axiosConfig)
                .catch(er => {
                    window.console.error('ERROR #NC02', er);
                }).then(response => {
                    if (response && response.data) {
                        if (response.data.data.status === 200) {
                            //commit('SET_USER_SESSION', StoredUser);
                        }
                    }
                });
            return userLogout;
        },

    },
    plugins: [
        createPersistedState({
            storage: localStorage
        })
    ]
})
