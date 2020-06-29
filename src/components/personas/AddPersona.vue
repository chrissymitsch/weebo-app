<template>
    <div class="AddPersona">
        <md-card v-if="active" class="persona-form">
            <md-card-header>
                <div class="md-title">Neue Persona hinzufügen</div>
            </md-card-header>
            <md-card-content>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-medium-size-33 md-small-size-50 md-small-size-100">
                        <md-radio v-model="form.gender" value="female" @click="getTimestamp()">w</md-radio>
                        <md-radio v-model="form.gender" value="male" @click="getTimestamp()">m</md-radio>
                        <md-button class="md-icon-button md-dense" @click="getTimestamp()">
                            <md-icon>refresh</md-icon>
                            <md-tooltip md-direction="top">neue Bilder laden</md-tooltip>
                        </md-button>
                        <img :src="`https://avatars.dicebear.com/api/${form.gender}/${currentTimestamp}.svg?options[mood][]=happy`" />
                    </div>
                    <div class="md-layout-item md-medium-size-33 md-small-size-50 md-small-size-100">
                        <p class="md-subheading">Werdegang</p>
                        <md-field>
                            <label>Bildung</label>
                            <md-input v-model="form.education" ref="education" maxlength="120" />
                        </md-field>
                        <md-field>
                            <label>Beruf</label>
                            <md-input v-model="form.job" ref="job" maxlength="120" />
                        </md-field>
                        <md-field>
                            <label>Sonstiges</label>
                            <md-input v-model="form.other" ref="other" maxlength="120" />
                        </md-field>
                    </div>
                    <div class="md-layout-item md-medium-size-33 md-small-size-50 md-small-size-100">
                        <p class="md-subheading">Kompetenzen</p>
                        <div v-for="(rangeName, index) in form.rangeNames" :key="index">
                            <md-field>
                                <md-input v-model="form.rangeNames[index]" maxlength="30" />
                            </md-field>
                            <label>
                                <input type="range" v-model="form.ranges[index]" ref="range" min="0" max="100" step="10" />
                                {{form.ranges[index]}}%
                            </label>
                        </div>
                        <p class="text-right">
                            <md-button class="md-icon-button md-raised" @click="addCompLine()"><md-icon>add</md-icon></md-button>
                        </p>
                    </div>
                </div>
                <md-divider></md-divider>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-medium-size-33 md-small-size-50 md-small-size-100">
                        <p class="md-subheading">Persönliche Information</p>
                        <md-field>
                            <label>Name</label>
                            <md-input v-model="form.name" ref="name" maxlength="30" />
                        </md-field>
                        <md-field>
                            <label>Alter</label>
                            <md-input v-model="form.age" ref="age" type="number" />
                        </md-field>
                        <md-field>
                            <label>Interessen</label>
                            <md-input v-model="form.interests" ref="interests" maxlength="120" />
                        </md-field>
                        <md-field>
                            <label>Familie (Beziehungsstatus, Kinder)</label>
                            <md-input v-model="form.family" ref="family" maxlength="60" />
                        </md-field>

                    </div>
                    <div class="md-layout-item md-medium-size-33 md-small-size-50 md-small-size-100">
                        <p class="md-subheading">Verhaltensweisen</p>
                        <p class="md-caption">Füge Stichpunkte hinzu und drücke Enter</p>
                        <md-chips v-model="form.behaviour" md-placeholder="Stichpunkte..."></md-chips>
                    </div>
                    <div class="md-layout-item md-medium-size-33 md-small-size-50 md-small-size-100">
                        <p class="md-subheading">Beschreibung</p>
                        <p class="md-caption">Füge eine Beschreibung hinzu, z.B. in Form von Momentaufnahmen, Szenarien, Bedürfnissen, Wünsche, usw.</p>
                        <md-field>
                            <md-textarea v-model="form.description"></md-textarea>
                            <md-icon>description</md-icon>
                        </md-field>
                    </div>
                </div>
            </md-card-content>
            <md-card-actions>
                <md-button @click="onCancel()">Abbrechen</md-button>
                <md-button class="md-raised md-primary" @click="addPersona()">Persona erstellen</md-button>
            </md-card-actions>
        </md-card>

        <md-button v-if="!active" @click="openModal()" class="md-raised"><md-icon>add</md-icon> Persona erstellen</md-button>
    </div>
</template>
<script>
    import {mapActions, mapState} from "vuex";
    import moment from 'moment';

    export default {
        computed: {
            ...mapState('authentication', ['user']),
            ...mapState('personas', ['personas']),
            ...mapState('projects', ['currentProject']),
        },
        props: {
            id: String
        },
        data: () => ({
            active: false,
            value: null,
            form: {
                gender: "female",
                name: null,
                age: null,
                interests: null,
                education: null,
                job: null,
                other: null,
                family: null,
                behaviour: [],
                description: [],
                rangeNames: ["Technisches KnowHow", "Internet"],
                ranges: [40, 60]
            },
            taskSaved: false,
            currentTimestamp: moment().unix()
        }),
        methods: {
            ...mapActions('rewards', ['triggerScoreAction']),
            ...mapActions('messages', ['createMessage']),
            openModal() {
                this.active = true;
                this.$nextTick(() => {
                    this.$refs.name.$el.focus();
                });
            },
            resetForm() {
                this.form = {
                        gender: "female",
                        name: null,
                        age: null,
                        interests: null,
                        education: null,
                        job: null,
                        other: null,
                        family: null,
                        behaviour: [],
                        description: [],
                        rangeNames: ["Technisches KnowHow", "Internet"],
                        ranges: [40, 60]
                };
            },
            addPersona () {
                this.form.picture = `https://avatars.dicebear.com/api/${this.form.gender}/${this.currentTimestamp}.svg?options[mood][]=happy`;
                this.form.projectId = this.currentProject.id;
                this.form.creator = this.user.id;
                const name = ''.concat(this.form.name);
                this.$store.dispatch('personas/createProjectPersona', this.form).then(() => {
                    this.taskSaved = true;
                    this.active = false;
                }).finally(() => {
                    this.triggerScoreAction({name: "addPersona", score: 1, type: "score"});
                    this.$toast.success('+1 Punkt für Persona erstellen', {
                        position: 'top-right',
                        duration: 60000 // 1 minute
                    });
                    this.resetForm();
                    this.createMessage({
                        "projectId": this.currentProject.id,
                        "type": "system",
                        "data": {
                            "text": `${this.user.displayName} hat eine neue Persona "${name}" erstellt.`
                        }
                    });
                    this.$emit('personaCreated');
                });
            },
            onCancel () {
                this.active = false;
                this.form.title = null;
                this.form.type = null;
            },
            addCompLine() {
                this.form.rangeNames.push("");
                this.form.ranges.push(0);
            },
            getTimestamp() {
                this.currentTimestamp = moment().unix();
            }
        }
    }
</script>
<style>
    .md-chips.md-field .md-chip {
        padding-top: 8px;
        white-space: break-spaces;
        height: auto;
        line-height: normal;
    }

    .persona-form img {
        max-width: 200px;
    }

    .persona-form .md-field {
        margin: 4px 0 4px;
        min-height: inherit;
    }

    .persona-form .md-field .md-input, .persona-form .md-field .md-textarea, .persona-form .md-field label {
        font-size: 12px;
        height: 28px;
    }
</style>