import woocommerce from 'woocommerce-api';

const URL =  process.env.VUE_APP_URL;
const KEY =  process.env.VUE_APP_WC_KEY;
const SECRET =  process.env.VUE_APP_WC_SECRET;

const WC = new woocommerce({
    url: URL,
    consumerKey: KEY,
    consumerSecret: SECRET,
    wpAPI: true,
    version: 'wc/v3'
});

export default WC;
