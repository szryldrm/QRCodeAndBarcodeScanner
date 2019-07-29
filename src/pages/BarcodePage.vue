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
          <h2 class="page_title">BARKOD TARA</h2>

          <!-- Slider -->
          <div
            class="swiper-container-pages swiper-init"
            data-effect="slide"
            data-pagination=".swiper-pagination"
          >
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <v-quagga :onDetected="onDecode" :readerTypes="['code_128_reader', 'ean_reader', 'ean_8_reader', 'code_39_reader', 'code_39_vin_reader', 'codabar_reader', 'upc_reader', 'upc_e_reader', 'i2of5_reader', '2of5_reader', 'code_93_reader']"></v-quagga>
              </div>
            </div>
            <div class="page_single layout_fullwidth_padding toolbarpage" v-if="product">
              <div class="contactform">
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
                <div class="shop_pagination">
                  <a
                    href="#"
                    v-if="product.stock > 0"
                    class="prev_shop"
                    @click="satisYap()"
                  >SATIS YAP</a>
                  <a href="shop-page2.html" class="next_shop" @click="iptalEt()">IPTAL ET</a>
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
  name: "BarcodePage",
  data() {
    return {
      readerSize: {
        width: 640,
        height: 250
      },
      product: null
    };
  },
  methods: {
    onDecode(id) {
      if(id.codeResult){
        id = id.codeResult.code;
      }
      this.product = null;
      let $this = this;
      axios
        .get(process.env.VUE_APP_PRODUCT_REST_OUT_API + "api/index.php/products/" + id)
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
          this.onDecode(this.product.sku);
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
          this.onDecode(this.product.sku);
        })
        .catch(e => window.console.log(e));
    }
  }
};
</script>

<style scoped>
.swiper-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.swiper-slide {
  width: 86%;
  margin-bottom: 10px;
}

#interactive{
       height: 240px;
       width: 90%;
}
video{
       width: 111%;
       height: 150%;
   }
</style>