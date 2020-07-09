<template>
    <div class="ProjectCreativeMode" v-if="currentProject">

        <tutorial-modal tutorialName="ProjectCreativeMode">
            <div class="md-display-1 text-center">Tob dich aus!</div>
            <p class="description"><img src="@/assets/img/astronaut1.png" width="200" /></p>
            <p class="description md-body-2">
                Du hast eine neue Funktion freigeschaltet: den Kreativmodus.
                Tob dich aus, zeichne wie ein Weltmeister und speichere dein Ergebnis ab.
                Du kannst deine Zeichnung anschließend in die Dokumenten-Cloud hochladen.
            </p>
        </tutorial-modal>

        <md-chip>{{ currentProject.name }} / Kreativmodus</md-chip>

        <div>
            <md-button class="md-raised" @click="clear"><md-icon>clear</md-icon> Leeren</md-button>
            <md-button class="md-raised md-accent" @click="undo"><md-icon>undo</md-icon> Rückgängig</md-button>
            <md-button class="md-raised md-primary" @click="save"><md-icon>save_alt</md-icon> Bild speichern</md-button>
        </div>
        <VueSignaturePad :options="{ backgroundColor: 'white' }" width="100%" height="500px" ref="signaturePad" />
    </div>
</template>
<script>
    import {mapState} from "vuex";
    import TutorialModal from "../../components/rewards/TutorialModal";

    export default {
        name: 'MySignaturePad',
        components: {TutorialModal},
        computed: {
            ...mapState('projects', ['currentProject']),
        },
        methods: {
            undo() {
                this.$refs.signaturePad.undoSignature();
            },
            clear() {
                this.$refs.signaturePad.clearSignature();
            },
            save() {
                const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
                if (!isEmpty) {
                    const newWindow = window.open();
                    const imgstring = "<img src='".concat(data).concat("' />");
                    newWindow.document.write(imgstring);
                }
            }
        }
    };
</script>

<style>
    canvas {
        border: 1px solid #000;
        background: #fff;
    }
</style>