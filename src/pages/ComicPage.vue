<template>
    <base-layout page-title="ReadComics" page-default-back-link="/">
        <loading v-model:active="isLoading"
            :can-cancel="true"
            :on-cancel="onCancel"
            :is-full-page="fullPage"
            :background-color="loaderBackground"
            :opacity="1"
            :color="loadingIconColor"/>
        <ion-card>
            <ion-card-header>
                <ion-card-title>{{comic_info.title}}</ion-card-title>
            </ion-card-header>

            <ion-card-content>
                <ion-item>
                    <ion-thumbnail slot="start">
                        <ion-img :src="'https://readcomicsonline.ru/uploads/manga/' + name_url + '/cover/cover_250x350.jpg'"></ion-img>
                    </ion-thumbnail>
                    <ion-list slot="end">
                        <ion-card-subtitle>Status: {{comic_info.status}}</ion-card-subtitle>
                        <br>
                        <ion-card-subtitle>Date: {{comic_info.date}}</ion-card-subtitle>
                        <br>
                        <ion-card-subtitle>Views: {{comic_info.views}}</ion-card-subtitle>
                        <br>
                        <ion-card-subtitle>Rating: {{comic_info.rating}}</ion-card-subtitle>
                    </ion-list>
                </ion-item>

                <!-- List of Text Items -->
                <ion-list>
                    <ion-list-header>Issues:</ion-list-header>

                    <div id="issues-list">
                        <ion-item 
                        v-for="issue in issues_list"
                        v-bind:key="issue.issue_number"
                        :router-link="`/issue/${name_url}/${issue.issue_number}`">
                            <ion-label>{{issue.name}}</ion-label>
                        </ion-item>
                    </div>
                </ion-list>
            </ion-card-content>
        </ion-card>

    </base-layout>
</template>

<script>
import { IonCard, IonItem, IonList, IonThumbnail } from '@ionic/vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    components: {
        IonCard,
        IonItem,
        IonList,
        IonThumbnail,
        Loading
    },
    data() {
        return {
            name_url: '',
            comic_info: [],
            issues_list : [],
            isLoading: true,
            fullPage: false,
            loaderBackground: "#121212",
            loadingIconColor: "#FFFFFF"
        };
    },
    methods: {
        async getComic() {
            this.comic_info = [];
            this.name_url = this.$route.params.name_url;
            try {
                let response = await fetch("https://nahurup-comics-api.herokuapp.com/comic/info/"+this.name_url);
                this.comic_info = await response.json();
            } catch (error) {
                console.log(error);
            }
        },
        async getComicIssues() {
            try {
                let response = await fetch("https://nahurup-comics-api.herokuapp.com/comic/issues_list/"+this.name_url);
                this.issues_list = await response.json();
                this.isLoading = false;
            } catch (error) {
                console.log(error);
            }
        },
    },

    created: function() {
        this.getComic();
        this.getComicIssues();
    },
}
</script>

<style lang="css" scoped>
ion-thumbnail {
    width:130px;
    height:auto;
}
</style>