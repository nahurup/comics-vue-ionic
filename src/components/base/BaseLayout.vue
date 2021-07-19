<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button :default-href="pageDefaultBackLink"></ion-back-button>
                </ion-buttons>
                <ion-title>
                   {{ pageTitle }}</ion-title>
                <ion-buttons slot="end">
                    <ion-item :router-link="`/search`">
                        <ion-icon name="search-outline"></ion-icon>
                    </ion-item>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <slot />
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonIcon, IonItem } from '@ionic/vue'
import {bookOutline} from 'ionicons/icons';

export default {
    props: ['pageTitle', "pageDefaultBackLink"],
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonBackButton,
        IonButtons,
        IonIcon,
        IonItem
    },
    data() {
        return {
            bookOutline
        };
    }
}
</script>