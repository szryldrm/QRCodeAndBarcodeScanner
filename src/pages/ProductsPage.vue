<template>
<div class="pages">
    <div data-page="features" class="page no-navbar">
        <div class="page-content">
            <div class="navbarpages">
                <div class="navbar_left">
                    <div class="logo_text">
                        <router-link to="/">
                            <img src="images/Homeroslogoo.png" style="width: 100%;">
                        </router-link></div>
                </div>
                <a href="#" data-panel="left" class="open-panel">
                    <div class="navbar_right"><img src="images/icons/red/menu.png" alt="" title="" /></div>
                </a>
            </div>
            <div id="pages_maincontent">
                <h2 class="page_title">Urun Listesi</h2>
                <div class="page_single layout_fullwidth_padding">
                    <p>Bu bolumden sistemdeki butun urunlerinizin listesini gorebilirsiniz.</p>
                    <ul class="responsive_table">
                        <li class="table_row">
                            <div class="table_section">Urun Adi</div>
                            <div class="table_section">Barkod Kodu</div>
                            <div class="table_section_small">Adet</div>
                        </li>
                        <br>
                        <li class="table_row" v-for="product in products" :key="product.id">
                            <div class="table_section">{{ product.title}}</div>
                            <div class="table_section">{{ product.sku}}</div>
                            <div class="table_section_small">{{ product.stock}}</div>
                        </li>
                        <li class="table_row" v-show="nullP">
                            <div class="table_section">Ürün Bulunamadı...!</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
require("vue-toasted").default;

export default {
  name: "ProductsPage",
  data() {
    return {
      products: null,
      nullP: false,
    };
  },
  created() {
      this.products = null;
      let $this = this;
      axios
        .get(process.env.VUE_APP_PRODUCT_REST_OUT_API + "api/index.php/products")
        .then(response => {
          if(Object.keys(response.data).length === 0){
                this.$toasted.info("Ürün Bulunamadı", {
                duration: 1000,
                position: "bottom-center",
                theme: "outline"});
                $this.nullP = true;
            }else{
                $this.products = response.data;  
            }
        })
        .catch(e => window.console.log(e));
    },
  };
</script>