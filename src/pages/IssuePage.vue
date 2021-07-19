<template>
    <base-layout :page-title="`${comic_info.title} | #${current_issue}`" :page-default-back-link="`/comic/${name_url}`">
        <ion-content>
            <ion-img v-for="page in pages_list"
                v-bind:key="page"
                :src=page></ion-img>

            <div class="center">
                <ion-button v-if="current_issue >= 2" id="btn_prev" color="light">
                    <ion-icon :icon="caretBackOutline"></ion-icon>
                </ion-button>
                <ion-button id="page" color="tertiary" href="#">{{ current_issue }}/{{ max_issues }}</ion-button>
                <ion-button v-if="current_issue < max_issues" id="btn_next" color="light">
                    <ion-icon :icon="caretForwardOutline"></ion-icon>
                </ion-button>
            </div>
        </ion-content>
    </base-layout>
</template>

<script>
import { IonButton, IonContent, IonIcon, IonImg } from '@ionic/vue'
import {caretForwardOutline, caretBackOutline} from 'ionicons/icons';

export default {
    components: {
        IonButton,
        IonContent,
        IonIcon,
        IonImg
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
        };
    },
    methods: {
        async getIssue() {
            this.pages_list = [];
            
            try {
                let response = await fetch("https://nahurup-comics-api.herokuapp.com/comic/"+this.name_url+"/"+this.current_issue);
                this.pages_list = await response.json();
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