<template>
    <div class="ProjectSettings">
        <tutorial-modal tutorialName="Settings">
            <div class="md-display-1 text-center">Verwalte die Einstellungen deines Projekts!</div>
            <p class="description"><img src="@/assets/img/ufo.png" width="200" /></p>
            <p class="description md-body-2">
                Du kannst jederzeit den Namen deines Projekts und die Rechte der Teilnehmer verwalten.
            </p>
        </tutorial-modal>

        <md-chip>{{ currentProject.name }} / Einstellungen</md-chip>

        <div class="md-layout md-gutter file-layout">
            <div class="md-layout-item md-small-size-100">
                <md-card class="md-layout-item md-size-50 md-small-size-100">
                    <md-card-content>
                        <div class="md-layout md-gutter">
                            <div class="md-layout-item md-small-size-100">
                                <md-field>
                                    <label>Projektname</label>
                                    <md-input v-model="projectToChange.name" name="name" id="name" />
                                </md-field>
                            </div>
                        </div>
                    </md-card-content>
                    <md-card-actions>
                        <md-button class="md-primary" @click="onSave()">Projekt speichern</md-button>
                    </md-card-actions>
                </md-card>
            </div>
        </div>

        <md-table class="role-table hide-for-small" v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
            <md-table-toolbar>
                <div class="md-toolbar-section-start">
                    <h1 class="md-title">Rollen</h1>
                </div>

                <md-field md-clearable class="md-toolbar-section-end">
                    <md-input placeholder="Nach Projektteilnehmer suchen..." v-model="search" @input="searchOnTable" />
                </md-field>
            </md-table-toolbar>

            <md-table-empty-state
                    v-if="search"
                    md-label="Keine Teilnehmer gefunden."
                    :md-description="`Niemand mit dem Namen '${search}' gefunden.`">
            </md-table-empty-state>

            <md-table-empty-state
                    v-if="!search"
                    md-label="Keine Teilnehmer gefunden."
                    :md-description="`Niemand gefunden.`">
            </md-table-empty-state>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-sort-by="id">
                    <avatar :user-id="item.id"></avatar>
                </md-table-cell>
                <md-table-cell md-label="Name" md-sort-by="displayName">
                    {{ item.displayName }}
                </md-table-cell>
                <md-table-cell md-label="Rolle" md-sort-by="role">
                    {{ item.role }}
                </md-table-cell>
            </md-table-row>
        </md-table>

    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";
    import TutorialModal from "../../components/rewards/TutorialModal";
    import Avatar from "../../components/users/Avatar";

    const toLower = text => {
        return text.toString().toLowerCase()
    };

    const searchByName = (items, term) => {
        if (term) {
            return items.filter(item => {
                if (item.name) {
                    return toLower(item.name).includes(toLower(term));
                }
                return false;
            });
        }
        return items
    };

    export default {
        computed: {
            ...mapState('authentication', ['user']),
            ...mapState('projects', ['currentProject', 'projectMembers'])
        },
        components: {Avatar, TutorialModal},
        data: () => ({
            search: null,
            searched: [],
            members: [],
            projectToChange: null
        }),
        methods: {
            ...mapActions('projects', ['triggerUpdateProjectAction']),
            searchOnTable () {
                this.searched = searchByName(this.members, this.search);
            },
            onSave () {
                this.triggerUpdateProjectAction(this.projectToChange);
            }
        },
        created () {
            this.projectToChange = JSON.parse(JSON.stringify(this.currentProject));
            this.members = JSON.parse(JSON.stringify(this.projectMembers));
            this.searched = JSON.parse(JSON.stringify(this.projectMembers));

            for (let i = 0; i < this.searched.length; i += 1) {
                if (this.searched[i].id === this.currentProject.creator) {
                    this.searched[i].role = "Admin";
                } else {
                    this.searched[i].role = "User";
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .md-table.role-table {
        margin-top: 24px;
    }
</style>