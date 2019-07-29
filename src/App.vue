<template>
    <div class="app-layout">
        <div class="statusbar-overlay"></div>
        <div class="panel-overlay"></div>

        <div class="panel panel-left panel-reveal">
            <nav class="sidebar-nav">
                <ul>
                    <li>
                        <router-link to="/" class="close-panel"><img src="images/icons/red/home.png" alt=""
                                                                      title=""/><span>Ana Menü</span></router-link>
                    </li>
                    <li><router-link to="/manuel" class="close-panel"><img src="images/icons/red/manuel.png" alt=""
                                                                             title=""/><span>Manuel Barkod</span></router-link>
                    </li>
                    <li><router-link to="/barcode" class="close-panel"><img src="images/icons/red/Homerosbarcodelogo.png"
                                                                           alt=""
                                                                           title=""/><span>Barkod Tara</span></router-link>
                                                                           </li>
                    <li><router-link to="/scan" class="close-panel"><img src="images/icons/red/Homeroscodelogo.png"
                                                                           alt=""
                                                                           title=""/><span>QR Kod Tara</span></router-link>
                                                                           </li>
                    <li><router-link to="/products" class="close-panel"><img src="images/icons/red/urunler.png" alt=""
                                                                        title=""/><span>Ürün Listesi</span></router-link></li>
                </ul>
            </nav>
        </div>


        <div class="views">
            <div class="view view-main">

                <router-view></router-view>

                <!-- Bottom Toolbar-->
                <div class="toolbar">
                    <div class="toolbar-inner">
                        <ul class="toolbar_icons">
                            <li>
                                <a href="#" data-panel="right" data-popup=".popup-login" class="open-popup"
                                   id="userButton">
                                    <img src="images/icons/white/user.png" alt="" title=""/>
                                </a>
                            </li>
                            <li></li>
                            <li class="menuicon"><router-link to="/scan">
                                    <img src="images/icons/white/Homeroscodelogo.png" alt="" title=""/>
                                    </router-link></li>

                            <li></li>
                            <li><a href="#" data-popup=".popup-social" class="open-popup"><img
                                    src="images/icons/white/settings.png" alt="" title=""/></a></li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>


        <!-- Login Popup -->
        <div class="popup popup-login" id="loginPopup">
            <div v-if="loggin" class="container-loading">
                <div class="progress container">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div class="content-block" v-if="!getStore.isUserLogged">
                <h4>KULLANICI GİRİŞİ</h4>
                <div class="loginform">
                    <div v-if="getStore.feedbackMessage" v-text="getStore.feedbackMessage" class="hata"></div>
                    <form id="LoginForm" @submit.prevent="logIn()">
                        <input type="text"
                               v-model="user.username"
                               class="form_input required"
                               placeholder="Kullanici Adi"/>

                        <input type="password"
                               v-model="user.password"
                               class="form_input required"
                               placeholder="Sifre"/>
                        <input v-if="!loggin" type="submit" :class="{ disabled: isDisabled }" :disabled="isDisabled" name="submit" class="form_submit" id="submit" value="GİRİŞ"/>
                    </form>
                </div>
                <div v-if="!loggin" class="close_popup_button">
                    <a href="#" class="close-popup"><img src="images/icons/red/menu_close.png" alt="" title=""/></a>
                </div>
            </div>

            <div class="content-block" v-if="getStore.isUserLogged">
                <h4>KULLANICI</h4>
                <div class="loginform">
                    <p>{{ getStore.userSession.user_nicename }}</p>
                    <input v-if="!loggin" type="button" class="form_submit" @click="logout()" value="ÇIKIŞ YAP"/>
                </div>
                <div v-if="!loggin" class="close_popup_button">
                    <a href="#" class="close-popup"><img src="images/icons/red/menu_close.png" alt="" title=""/></a>
                </div>
            </div>
        </div>

        <!-- Register Popup -->


        <!-- Social Icons Popup -->
        <div class="popup popup-social">
            <div class="content-block">
                <h4>Homeros Scanner v.1</h4>
                <p>Homeros Bilişim Yaz.Rek.Hiz.San. ve Tic.Ltd.Şti.</p>
                <p><span>Lisans: </span>324EF2-FDV934-ZXS13</p>
                <p>Geçerlilik: Süresiz</p>

                <div class="close_popup_button">
                    <a href="#" class="close-popup">
                        <img src="images/icons/red/menu_close.png" alt="" title=""/>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: 'app',
        data() {
            return {
                user: {
                    password: '',
                    username: ''
                },
                message: null,
                loggin: false,
            }
        },
        computed: {
            ...mapGetters([
                'getStore'
            ]),
            isDisabled () {
                if (this.user.username.length > 3 && this.user.password.length > 3) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        methods: {
            ...mapActions([
                'loginUserAction',
                'userLogout',
                'checkLoginStatus',
            ]),
            logIn() {
                this.loggin = true;
                this.message = null;
                this.loginUserAction(this.user).then(()=>{
                    this.loggin = false;
                }).catch(()=>{
                    this.loggin = false;
                });
            },
            logout() {
                this.loggin = true;
                this.userLogout().then(()=>{
                    this.loggin = false;
                }).catch(()=>{
                    this.loggin = false;
                });
            }
        },
        mounted() {
            this.checkLoginStatus();
        },
    }
</script>

<style>
    .app-layout {
        height: 100% !important;
        width: 100% !important;
    }

    .hata {
        color: red;
        text-align: center;
        margin-bottom: 10px;
        font-size: large;
        font-weight: normal;
    }
    .container-loading {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.9);
    }

    .progress {
        height: 40px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -20px 0 0 -50px;
    }
    .progress span {
        transition: all 500ms ease;
        background: #4a72da;
        box-shadow: 1px 2px 3px #999;
        height: 10px;
        width: 10px;
        display: inline-block;
        border-radius: 10px;
        animation: wave 2s ease infinite;
    }

    .progress span:nth-child(1) {
        animation-delay: 0;
    }
    .progress span:nth-child(2) {
        animation-delay: 100ms;
    }
    .progress span:nth-child(3) {
        animation-delay: 200ms;
    }
    .progress span:nth-child(4) {
        animation-delay: 300ms;
    }
    .progress span:nth-child(5) {
        animation-delay: 400ms;
    }
    .progress span:nth-child(6) {
        animation-delay: 500ms;
    }
    .progress span:nth-child(7) {
        animation-delay: 600ms;
    }
    .progress span:nth-child(8) {
        animation-delay: 700ms;
    }

    @keyframes wave {
        0%,
        40%,
        100% {
            transform: translate(0, 0);
            background-color: #4a72da;
        }
        10% {
            transform: translate(0, -15px);
            background-color: red;
        }
    }

</style>