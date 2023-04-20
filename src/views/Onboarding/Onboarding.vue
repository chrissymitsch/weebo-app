<template>
    <div class="Onboarding">
        <md-steppers :md-active-step.sync="active" md-linear>
            <md-step class="without-bg" id="first" :md-done.sync="first">
                <md-empty-state
                        md-icon="important_devices"
                        md-label="Erstelle dein Projekt"
                        md-description="Starte den nutzerzentrierten Designprozess, indem du dein Projekt in Weebo erstellst.">
                    <md-button class="md-raised md-accent" @click="setDone('first', 'second')">Weiter</md-button>
                    <router-link to="/projects"><md-button class="md-raised">Überspringen</md-button></router-link>
                </md-empty-state>
            </md-step>

            <md-step class="without-bg" id="second" :md-done.sync="second">
                <md-empty-state
                        md-icon="group_add"
                        md-label="Nimm alle mit an Board"
                        md-description="Füge alle Stakeholder deines Projekts hinzu. Von Nutzern über Auftraggeber, von Entwicklerteams
                         bis ins Management, schicke ihnen allen einen Einladungslink!">
                    <md-button class="md-raised md-accent" @click="setDone('second', 'third')">Weiter</md-button>
                    <router-link to="/projects"><md-button class="md-raised">Überspringen</md-button></router-link>
                </md-empty-state>
            </md-step>

            <md-step class="without-bg" id="third" :md-done.sync="third">
                <md-empty-state
                        md-icon="trending_up"
                        md-label="Erhöhe die Transparenz"
                        md-description="Erstellt und trackt Aufgaben, diskutiert im Gruppenchat, plant Events und feiert Erfolge!
                        All das hilft euch, die Transparenz eures Projekts zu steigern.">
                    <md-button class="md-raised md-accent" @click="setDone('third', 'fourth')">Weiter</md-button>
                    <router-link to="/projects"><md-button class="md-raised">Überspringen</md-button></router-link>
                </md-empty-state>
            </md-step>

            <md-step class="without-bg" id="fourth" :md-done.sync="fourth">
                <md-empty-state
                        md-icon="emoji_events"
                        md-label="Projekt gemeinsam gestalten"
                        md-description="Analysiert die Bedürfnisse der Nutzer, erarbeitet und diskutiert gemeinsam Lösungen,
                        ladet Dokumente hoch und holt Feedback ein.
                        Plant Events und feiert Projekterfolge!">
                    <md-button class="button md-primary md-raised" @click="triggerReward()">Los geht's &rarr;</md-button>
                </md-empty-state>
            </md-step>
        </md-steppers>

        <Modal :showModal="rewardModalActive" @closeModal="closeModal()">
            <md-progress-spinner v-if="!rewardSaved" class="md-accent" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
            <div v-if="rewardSaved">
                <div class="md-display-1 text-center">Bravo!</div>
                <p class="description md-body-2">Du hast eine Trophäe erhalten!</p>
                <p class="description"><img src="@/assets/img/pokal.png" /></p>
            </div>
        </Modal>
    </div>
</template>

<script>
    import {mapState} from "vuex"
    import Modal from "../../components/Modal";

    export default {
        name: 'StepperHorizontal',
        components: {Modal},
        computed: {
            ...mapState('rewards', ['userBadges'])
        },
        data: () => ({
            active: 'first',
            first: false,
            second: false,
            third: false,
            fourth: false,
            secondStepError: null,
            rewardModalActive: false,
            rewardSaved: false
        }),
        methods: {
            setDone (id, index) {
                this[id] = true;

                this.secondStepError = null;

                if (index) {
                    this.active = index
                }
            },
            triggerReward() {
                const checkIfUserHasBadge = this.userBadges.filter(function(elem) {
                    if(elem.name === "Onboarding") return elem;
                    return null;
                });
                if (checkIfUserHasBadge.length > 0) {
                    this.closeModal();
                } else {
                    const badge = {
                        name: "Onboarding",
                        type: "badge"
                    };
                    this.$store.dispatch('rewards/createUserBadge', badge).then(() => {
                        this.rewardSaved = true;
                    });
                    this.rewardModalActive = true;
                }
            },
            closeModal() {
                this.$router.push("/projects");
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/theme/variables.scss';

    .md-steppers {
        background: $light-grey-color;
    }

    .md-steppers-wrapper {
        background: #ffffff!important;
    }

    .md-steppers-container {
        background: #ffffff;
    }

    .without-bg {
        background: #ffffff;
    }
    .md-stepper-editable {
        height: 14px;
        width: 14px;
    }
</style>