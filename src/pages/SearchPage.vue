<template>
    <base-layout page-title="ReadComics" page-default-back-link="/">
        <loading v-model:active="isLoading"
                :can-cancel="true"
                :on-cancel="onCancel"
                :is-full-page="fullPage"
                :background-color="loaderBackground"
                :opacity="1"
                :color="loadingIconColor"/>
        <ion-searchbar
        v-on:click="getInput()">
        </ion-searchbar>
        <ion-grid>
            <ion-row>

                <ion-card class="comic-card"
                v-for="comic in comics"
                v-bind:key="comic.name">
                    <ion-item class="ion-no-padding" :router-link="`/comic/${comic.name}`">
                        <ion-img :src="`https://readcomicsonline.ru/uploads/manga/${comic.name}/cover/cover_250x350.jpg`"></ion-img>
                        <div class="overlay">
                            <div class="card-title">{{ comic.title }}</div>
                        </div>
                    </ion-item>
                </ion-card>

                <ion-card v-if="sin_resultados">
                    <ion-card-content>
                        <ion-card-title>Sorry! we couldn't find any results.</ion-card-title>
                    </ion-card-content>
                </ion-card>

            </ion-row>
        </ion-grid>
    </base-layout>
</template>

<script>
import { IonGrid, IonRow, IonSearchbar, IonItem } from '@ionic/vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    components: {
        IonGrid,
        IonRow,
        IonSearchbar,
        IonItem,
        Loading
    },
    data() {
        return {
            comics: [],
            words: '',
            sin_resultados: false,
            isLoading: false,
            fullPage: false,
            loaderBackground: "#121212",
            loadingIconColor: "#FFFFFF"
        };
    },
    methods: {
        async getSearch(words_input) {
            this.comics = [];
            this.isLoading = true;
            try {
                let response = await fetch("https://nahurup-comics-api.herokuapp.com/search/"+words_input);
                this.comics = await response.json();
                this.isLoading = false;
                if(this.comics.length > 0) {
                    this.sin_resultados = false;
                }else{
                    this.sin_resultados = true;
                }
                
            } catch (error) {
                console.log(error);
            }
        },
        async getInput() {
            this.words = document.querySelector("input[type=search]").value;
            if (this.words.length > 0) {
                this.getSearch(this.words);
            }
        },
    },

    created: function() {
        this.sin_resultados = false;
    },
}
</script>

<style lang="css" scoped>
ion-item {
  --ion-safe-area-right: 0;
}

ion-searchbar input {
    background: #292929;
}
</style>