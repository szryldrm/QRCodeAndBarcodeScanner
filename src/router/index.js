import Vue from 'vue'
import store from './../store'
import Router from 'vue-router'
import HomePage from "../pages/HomePage";
import ScanPage from "../pages/ScanPage";
import BarcodePage from "../pages/BarcodePage";
import ManuelPage from "../pages/ManuelPage";
import ProductsPage from "../pages/ProductsPage";


Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/scan',
            name: 'scan',
            component: ScanPage,
            meta: {
                auth: true
            }
        },
        {
            path: '/barcode',
            name: 'barcode',
            component: BarcodePage,
            meta: {
                auth: true
            }
        },
        {
            path: '/manuel',
            name: 'manuel',
            component: ManuelPage,
            meta: {
                auth: true
            }
        },
        {
            path: '/products',
            name: 'products',
            component: ProductsPage,
            meta: {
                auth: true
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta['auth'])) {
        if (store.getters.getStore.isUserLogged) {
            next();
            return
        }
        window.openThePopup('#loginPopup');
    } else {
        next();
    }
});

export default router;