<template>
    <div class="pages">
        <div class="page homepage">
            <div class="page-content homepagecontent">
                <div class="homenavbar">
                    <img src="images/Homerosscannerlogo.png" style="width: 100%;" />
                </div>

                <nav class="main-nav">
                    <ul>
                        <li class="navbg3">
                            <router-link to="/manuel" class="navbgtransblack">
                                <img src="images/icons/white/manuel.png" alt="" title="" />
                                <span>Manuel Barkod</span>
                            </router-link>
                        </li>
                        <li class="navbg4">
                            <router-link to="/barcode" class="navbgtransblack">
                                <img src="images/icons/white/Homerosbarcodelogo.png" alt="" title="" />
                                <span>Barkod Tara</span>
                            </router-link>
                        </li>
                        <li class="navbg1">
                            <router-link to="/scan" class="navbgtransblack">
                                <img src="images/icons/white/Homeroscodelogo.png" alt="" title="" />
                                <span>QR Kod Tara</span>
                            </router-link>
                        </li>
                        <li class="navbg2">
                            <router-link to="/products" class="navbgtransblack">
                                <img src="images/icons/white/features.png" alt="" title="" />
                                <span>Ürün Listesi</span>
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomePage"
    }
</script>

<style scoped>

</style>