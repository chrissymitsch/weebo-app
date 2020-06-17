<template>
    <div class="Onboarding">
        <md-steppers :md-active-step.sync="active" md-linear>
            <md-step class="without-bg" id="first" md-label="Projekt anlegen" :md-done.sync="first">
                <md-empty-state
                        md-icon="important_devices"
                        md-label="Erstelle dein Projekt"
                        md-description="Starte den nutzerzentrierten Gestaltprozess für dein Projekt.">
                    <md-button class="md-raised md-primary" @click="setDone('first', 'second')">Weiter &rarr;</md-button>
                    <router-link to="/projects"><md-button class="md-raised">Überspringen</md-button></router-link>
                </md-empty-state>
            </md-step>

            <md-step class="without-bg" id="second" md-label="Stakeholder einladen" :md-done.sync="second">
                <md-empty-state
                        md-icon="group_add"
                        md-label="Stakeholder einladen"
                        md-description="Füge Auftraggeber, Nutzer, Teams usw. hinzu für Transparenz.">
                    <md-button class="md-raised md-primary" @click="setDone('second', 'third')">Weiter &rarr;</md-button>
                    <router-link to="/projects"><md-button class="md-raised">Überspringen</md-button></router-link>
                </md-empty-state>
            </md-step>

            <md-step class="without-bg" id="third" md-label="Projekt gemeinsam gestalten" :md-done.sync="third">
                <md-empty-state
                        md-icon="emoji_events"
                        md-label="Projekt gemeinsam gestalten"
                        md-description="Erarbeite gemeinsam Lösungen, lade Dokumente hoch und hole Feedback ein. Feiert Projekterfolge!">
                    <md-button class="button md-primary md-raised" @click="triggerReward()">Los geht's &rarr;</md-button>
                </md-empty-state>
            </md-step>
        </md-steppers>

        <rewarding :showModal="rewardModalActive" @closeModal="closeModal()">
            <md-progress-spinner v-if="!rewardSaved" class="md-accent" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
            <div v-if="rewardSaved">
                <div class="md-display-1">Bravo!</div>
                <p class="description md-body-2">Du hast eine Trophäe erhalten!</p>
                <p class="description"><img src="@/assets/img/pokal.png" /></p>
            </div>
        </rewarding>
    </div>
</template>

<script>
    import {mapState} from "vuex"
    import Rewarding from "../../components/Rewarding";

    export default {
        name: 'StepperHorizontal',
        components: {Rewarding},
        computed: {
            ...mapState('rewards', ['userBadges'])
        },
        data: () => ({
            active: 'first',
            first: false,
            second: false,
            third: false,
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
    .md-steppers {
        background: url("~@/assets/img/1800w/background2.jpg") fixed;
        background-size: 100% 100%;
    }
    .without-bg {
        background: #ffffff;
    }
    .md-stepper-editable {
        height: 14px;
        width: 14px;
    }
</style>