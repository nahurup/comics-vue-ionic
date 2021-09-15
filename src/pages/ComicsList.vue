<template>
    <base-layout page-title="ReadComics">
        <loading v-model:active="isLoading"
                :can-cancel="true"
                :on-cancel="onCancel"
                :is-full-page="fullPage"
                :background-color="loaderBackground"
                :opacity="1"
                :color="loadingIconColor"/>
        <ion-grid>
            <ion-row>
                <ion-card class="comic-card"
                v-for="comic in comics"
                v-bind:key="comic.name_url">
                    <ion-item class="ion-no-padding" :router-link="`/comic/${comic.name_url}`">
                        <ion-img :src="comic.img_url"></ion-img>
                        <div class="overlay">
                            <div class="card-title">{{ comic.name }}</div>
                        </div>
                    </ion-item>
                </ion-card>
            </ion-row>

            <div class="center">
                <ion-button v-if="current_page >= 2" v-on:click="getData(current_page-1)" id="btn_prev" color="light">
                    <ion-icon :icon="caretBackOutline"></ion-icon>
                </ion-button>
                <ion-button id="page" color="tertiary" href="#">{{ current_page }}/{{ max_pages }}</ion-button>
                <ion-button v-if="current_page < max_pages" v-on:click="getData(current_page+1)" id="btn_next" color="light">
                    <ion-icon :icon="caretForwardOutline"></ion-icon>
                </ion-button>
            </div>
        </ion-grid>
    </base-layout>
</template>

<script>
import { IonGrid, IonRow, IonItem, IonButton, IonIcon } from '@ionic/vue'
import {caretForwardOutline, caretBackOutline} from 'ionicons/icons';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    components: {
        IonGrid,
        IonRow,
        IonItem,
        IonButton,
        IonIcon,
        Loading
    },
    data() {
        return {
            caretForwardOutline,
            caretBackOutline,
            comics: [],
            max_pages: '',
            current_page: '',
            isLoading: true,
            fullPage: false,
            loaderBackground: "#121212",
            loadingIconColor: "#FFFFFF"
        };
    },
    methods: {
        async getData(page_number = 1) {
            this.isLoading = true;
            this.comics = [];
            try {
                let response = await fetch("https://nahurup-comics-api.herokuapp.com/page/"+page_number);
                this.comics = await response.json()
                this.isLoading = false;
                this.current_page = page_number;
            } catch (error) {
                console.log(error);
            }
        },
        async getMaxPages() {
            console.log("hola");
            try {
                let response = await fetch("https://nahurup-comics-api.herokuapp.com/pages_number");
                this.max_pages = await response.json();
            } catch (error) {
                console.log(error);
            }
        },
    },

    created: function() {
        this.getData();
        this.getMaxPages();
    },
}
</script>

<style lang="css" scoped>
ion-item {
  --ion-safe-area-right: 0;
}

.center {
    margin: 0 auto;
    text-align: center;
}
</style>