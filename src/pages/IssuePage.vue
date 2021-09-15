<template>
    <base-layout :page-title="`${comic_info.title} | #${current_issue}`" :page-default-back-link="`/comic/${name_url}`">
        <loading v-model:active="isLoading"
            :can-cancel="true"
            :on-cancel="onCancel"
            :is-full-page="fullPage"
            :background-color="loaderBackground"
            :opacity="1"
            :color="loadingIconColor"/>
        <ion-content>
            <img v-for="page in pages_list"
                v-bind:key="page"
                :src=page>

            <div class="center">
                <ion-button v-if="current_issue >= 2" v-on:click="getIssue(current_issue-1)" id="btn_prev" color="light">
                    <ion-icon :icon="caretBackOutline"></ion-icon>
                </ion-button>
                <ion-button id="page" color="tertiary" href="#">{{ current_issue }}/{{ max_issues }}</ion-button>
                <ion-button v-if="current_issue < max_issues" v-on:click="getIssue(current_issue+1)" id="btn_next" color="light">
                    <ion-icon :icon="caretForwardOutline"></ion-icon>
                </ion-button>
            </div>
        </ion-content>
    </base-layout>
</template>

<script>
import { IonButton, IonContent, IonIcon } from '@ionic/vue';
import {caretForwardOutline, caretBackOutline} from 'ionicons/icons';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    components: {
        IonButton,
        IonContent,
        IonIcon,
        Loading
    },
    data() {
        return {
            caretForwardOutline,
            caretBackOutline,
            name_url: '',
            current_issue: '',
            comic_info: [],
            max_issues: '',
            pages_list : [],
            isLoading: true,
            fullPage: false,
            loaderBackground: "#121212",
            loadingIconColor: "#FFFFFF"
        };
    },
    methods: {
        async getIssue(current = this.current_issue) {
            this.isLoading = true;
            this.pages_list = [];
            
            try {
                let response = await fetch("https://nahurup-comics-api.herokuapp.com/comic/"+this.name_url+"/"+current);
                this.pages_list = await response.json();
                this.current_issue = current;
                this.isLoading = false;
            } catch (error) {
                console.log(error);
            }
        },
        async getMaxIssues() {
            this.name_url = this.$route.params.name_url;
            this.current_issue = this.$route.params.issue_number;
            try {
                let response = await fetch("https://nahurup-comics-api.herokuapp.com/comic/info/"+this.name_url);
                this.comic_info = await response.json();
            } catch (error) {
                console.log(error);
            }

            this.max_issues = this.comic_info.max_issues;
        },
    },

    created: function() {
        this.getMaxIssues();
        this.getIssue();
    },
}
</script>

<style lang="css" scoped>
.center {
    margin: 0 auto;
    text-align: center;
}
</style>