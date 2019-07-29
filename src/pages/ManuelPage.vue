<template>
  <div class="pages">
    <div data-page="features" class="page no-navbar">
      <div class="page-content">
        <div class="navbarpages">
          <div class="navbar_left">
            <div class="logo_text">
              <router-link to="/">
                <img src="images/Homeroslogoo.png" style="width: 100%;">
              </router-link>
            </div>
          </div>
          <a href="#" data-panel="left" class="open-panel">
            <div class="navbar_right">
              <img src="images/icons/red/menu.png" alt title>
            </div>
          </a>
        </div>

        <div id="pages_maincontent">
          <h2 class="page_title">MANUEL BARKOD</h2>

          <div class="page_single layout_fullwidth_padding toolbarpage">
            <div class="contactform">
              <div class="form_row">
                <label>BarKod Kodunu Giriniz:</label>
                <input type="text" v-model="id" name="name" value class="form_input">
                <a href="#" class="button_full" @click="urunGetir()">Barkod Ara</a>
              </div>
            <div v-if="product">


              <ul class="responsive_table">
                <li class="table_row">
                  <div class="table_section_14">Stok Kodu</div>
                  <div class="table_section_14">{{ product.sku }}</div>
                </li>
                <li class="table_row">
                  <div class="table_section_14">Urun Resmi</div>
                  <div class="table_section_14">
                    <img :src="product.images" alt title width="180px" height="150px">
                  </div>
                </li>
                <li class="table_row">
                  <div class="table_section_14">Urun Adi</div>
                  <div class="table_section_14">{{ product.title }}</div>
                </li>
                <li class="table_row">
                  <div class="table_section_14">Stok Adedi</div>
                  <div class="table_section_14">{{ product.stock }}</div>
                </li>

                <li class="table_row">
                  <div class="table_section_14">Fiyat</div>
                  <div class="table_section_14">
                    <strong>{{ product.price }}TL</strong>
                  </div>
                </li>
              </ul>
              <div class="shop_pagination" v-if="this.product.id != null">
                <a href="#" v-if="this.product.stock > 0" class="prev_shop" @click="satisYap()">SATIS YAP</a>
                <a href="#" class="next_shop" @click="iptalEt()">IPTAL ET</a>
              </div>
              </div>
            </div>
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
  name: "ManuelPage",
  data() {
    return {
      product: null,
      id: null
    };
  },
  methods: {
    urunGetir() {
    if(this.id != null && this.id != ""){
      this.product = null;
      let $this = this;
      axios
        .get(process.env.VUE_APP_PRODUCT_REST_OUT_API + "api/index.php/products/" + this.id)
        .then(response => {
            if(response.data == null){
                this.$toasted.info("Ürün Bulunamadı", {
                duration: 1000,
                position: "bottom-center",
                theme: "outline"})
            }else{
                $this.product = response.data;
            }
          
        })
        .catch(e => window.console.log(e));
        }else{
            this.$toasted.error("Alanı Doldurun", {
            duration: 2000,
            position: "bottom-center",
            theme: "outline"
          });
        }
    },
    satisYap() {
      let q = Number(this.product["stock"]) - 1;
      let $this = this;
      axios
        .put(process.env.VUE_APP_PRODUCT_REST_OUT_API + 
          "api/index.php/products/update/" + this.product.id,
          {
            stock: q
          }
        )
        .then(() => {
          this.$toasted.success("Satış Tamamlandı.", {
            duration: 2000,
            position: "bottom-center",
            theme: "outline"
          });
          $this["stock"] = q;
          this.urunGetir(this.product.sku);
        })
        .catch(e => window.console.log(e));
    },
    iptalEt() {
      let q = Number(this.product["stock"]) + 1;
      let $this = this;
      axios
        .put(process.env.VUE_APP_PRODUCT_REST_OUT_API + 
          "api/index.php/products/update/" + this.product.id,
          {
            stock: q
          }
        )
        .then(() => {
          this.$toasted.error("Satış İptal Edildi.", {
            duration: 2000,
            position: "bottom-center",
            theme: "outline"
          });
          $this["stock"] = q;
          this.urunGetir(this.product.sku);
        })
        .catch(e => window.console.log(e));
    }
  }
};
</script>