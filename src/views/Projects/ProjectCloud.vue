<template>
    <div class="ProjectCloud" v-if="currentProject">
        <Modal :showModal="fileCommentModalActive" @closeModal="fileCommentModalActive=false" size="large">
            <div v-if="selectedFile">
                <p class="md-title"><a :href="selectedFile.url" target=_blank>{{selectedFile.name}}</a></p>
                <md-table>
                    <md-table-row>
                        <md-table-head>Von</md-table-head>
                        <md-table-head>Am</md-table-head>
                    </md-table-row>

                    <md-table-row>
                        <md-table-cell><avatar :user-id="selectedFile.creator"></avatar></md-table-cell>
                        <md-table-cell>{{ format_date(selectedFile.createTimestamp) }}</md-table-cell>
                    </md-table-row>
                </md-table>
                <p>
                    Du kannst hier die Datei <i>{{selectedFile.name}}</i> kommentieren oder dich dafür bedanken!
                </p>
                <md-button v-if="selectedFile.creator === user.id" class="md-raised" disabled><md-icon>favorite_border</md-icon>Danke</md-button>
                <md-button v-if="selectedFile.creator !== user.id" class="md-raised md-accent" @click="addThankYou(selectedFile.creator)">
                    <md-icon>favorite_border</md-icon>
                    Danke
                </md-button>

                <md-card>
                    <md-card-content>
                        <md-field>
                            <label>Kommentar</label>
                            <md-input v-model="form.comment" ref="comment"
                                      maxlength="200"
                            />
                        </md-field>
                    </md-card-content>
                    <md-card-actions>
                        <md-button class="md-raised md-primary" @click="addComment()">Kommentieren</md-button>
                    </md-card-actions>
                </md-card>
                <md-card>
                    <md-card-content v-for="selectedFileMessage in selectedFileMessages" :key="selectedFileMessage.id">
                        <avatar :user-id="selectedFileMessage.author"></avatar> {{selectedFileMessage.data.text}}
                    </md-card-content>
                </md-card>
            </div>
        </Modal>

        <md-chip>{{ currentProject.name }} / Dateilen und Dokumente</md-chip>
        <div class="md-layout md-gutter file-layout">
            <div class="md-layout-item md-small-size-100">
                <md-card>
                    <md-card-header>
                        <md-field>
                            <label>Datei hochladen</label>
                            <md-file @change="previewFile" />
                        </md-field>
                    </md-card-header>
                    <md-card-content v-if="fileData">
                        <div class="md-layout md-gutter">
                            <div class="md-layout-item md-small-size-100">
                                <p class="md-caption">
                                    {{uploadValue.toFixed()+"%"}}
                                    <md-progress-bar md-mode="determinate" :md-value="uploadValue"></md-progress-bar>
                                </p>
                            </div>
                            <div class="md-layout-item md-small-size-100">
                                <md-button @click="onUpload" class="md-accent md-raised">Datei hochladen</md-button>
                            </div>
                        </div>
                    </md-card-content>
                </md-card>
            </div>

            <div class="md-layout-item md-small-size-100">
                <div v-if="errorMessage">{{errorMessage}}</div>
            </div>
        </div>

        <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
            <md-table-toolbar>
                <div class="md-toolbar-section-start">
                    <h1 class="md-title">Dateien</h1>
                </div>

                <md-field md-clearable class="md-toolbar-section-end">
                    <md-input placeholder="Nach Dateinamen suchen..." v-model="search" @input="searchOnTable" />
                </md-field>
            </md-table-toolbar>

            <md-table-empty-state
                    md-label="Keine Dateien gefunden."
                    :md-description="`Für '${search}' wurden keine Dateien gefunden.`">
            </md-table-empty-state>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-sort-by="type">
                    <a :href="item.url" target=_blank>
                        <md-icon>
                            {{getTypeIcon(item.type)}}
                        </md-icon>
                        <md-tooltip md-direction="top">{{ item.type }}</md-tooltip>
                    </a>
                </md-table-cell>
                <md-table-cell md-label="Dateiname" md-sort-by="name">
                    <a :href="item.url" target=_blank>{{ item.name }}</a>
                </md-table-cell>
                <md-table-cell md-label="Kommentare" md-sort-by="type">
                    <md-button class="md-icon-button" @click="triggerFileModal(item)"><md-icon>message</md-icon></md-button>
                </md-table-cell>
                <md-table-cell md-label="Größe" md-sort-by="size">{{ formatBytes(item.size) }}</md-table-cell>
                <md-table-cell md-label="" md-sort-by="createTimestamp">{{ format_date(item.createTimestamp) }}</md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
    import firebase from 'firebase';
    import {mapActions, mapState} from "vuex";
    import moment from "moment";
    import Modal from "../../components/Modal";
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
        name: 'ProjectCloud',
        components: {Avatar, Modal},
        computed: {
            ...mapState('authentication', ['user']),
            ...mapState('projects', ['currentProject', 'projectUpdatePending']),
            ...mapState('files', ['files']),
            ...mapState('messages', ['messages'])
        },
        data: () => ({
            errorMessage: null,
            search: null,
            searched: [],
            filteredFiles: null,

            fileData: null,
            uploadFile: null,
            uploadValue: 0,

            fileCommentModalActive: false,
            selectedFile: null,
            selectedFileMessages: null,
            form: {
                comment: null,
            },
        }),
        methods:{
            ...mapActions('projects', ['triggerUpdateProjectAction', 'triggerUpdateThankYouAction']),
            ...mapActions('files', ['createProjectFile']),
            ...mapActions('messages', ['createMessage']),
            ...mapActions('rewards', ['triggerScoreAction']),
            previewFile(event) {
                this.uploadValue = 0;
                this.uploadFile = null;
                this.fileData = event.target.files;
            },
            filterFilesByPhase(files) {
                const filesToFilter = JSON.parse(JSON.stringify(files));
                return filesToFilter.filter(file => file.phase === this.currentProject.phase);
            },
            onUpload() {
                this.errorMessage = null;
                this.uploadFile = null;
                const metaData = this.fileData;
                const storageRef = firebase.storage().ref(`${this.currentProject.id}/${this.fileData[0].name}`).put(this.fileData[0]);
                storageRef.on(`state_changed`,
                    snapshot => {
                        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    },
                    () => {
                        this.errorMessage = "Da ist etwas schief gelaufen";
                    },
                    () => {
                        this.uploadValue = 100;
                        storageRef.snapshot.ref.getDownloadURL().then((url) => {
                            this.uploadFile = url;
                            this.createProjectFile({
                                "phase": this.currentProject.phase,
                                "url": url,
                                "projectId": this.currentProject.id,
                                "name": metaData[0].name,
                                "size": metaData[0].size,
                                "type": metaData[0].type
                            });
                            this.createMessage({
                                "projectId": this.currentProject.id,
                                "type": "system",
                                "data": {
                                    "text": `${this.user.displayName} hat die Datei "${this.fileData[0].name}" hochgeladen.`
                                }
                            });
                            this.searched = this.filterFilesByPhase(this.files);
                            this.fileData = null;

                            this.triggerScoreAction({name: "addFile", score: 1, type: "score"});
                            this.$toast.success('+1 Punkt für Dateien hochladen', {
                                position: 'top-right',
                                duration: 60000 // 1 minute
                            });
                        });
                    }
                );
            },
            searchOnTable () {
                this.searched = searchByName(this.filterFilesByPhase(this.files), this.search);
            },
            getTypeIcon(type) {
                if (type && type.startsWith("image")) {
                    return "insert_photo";
                }
                if (type && type.startsWith("text")) {
                    return "text_snippet";
                }
                return "insert_drive_file";
            },
            formatBytes(bytes) {
                if (!bytes || bytes === 0) return '0 Bytes';

                const k = 1024;
                const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

                const i = Math.floor(Math.log(bytes) / Math.log(k));

                return `${parseFloat((bytes / (k ** i)).toFixed(0))} ${sizes[i]}`;
            },
            format_date(value){
                if (value) {
                    return moment(value).format('DD.MM.YYYY, HH:mm')
                }
                return '';
            },
            triggerFileModal(file) {
                this.fileCommentModalActive = true;
                this.selectedFile = JSON.parse(JSON.stringify(file));
                this.getFileMessages(file.id);
            },
            addThankYou(receiver) {
                this.triggerUpdateThankYouAction(receiver);
                this.triggerScoreAction({name: "thankYou", score: 1, type: "score"});
                this.$toast.success('Du hast ein Dankeschön verteilt (+1 Punkt)', {
                    position: 'top-right',
                    duration: 60000 // 1 minute
                });
            },
            sortMessageList(list) {
                function compare(a, b) {
                    if (a.createTimestamp > b.createTimestamp)
                        return -1;
                    if (a.createTimestamp < b.createTimestamp)
                        return 1;
                    return 0;
                }
                return list.sort(compare);
            },
            getFileMessages(fileId) {
                this.selectedFileMessages = this.sortMessageList(this.messages.filter(message => message.type === "fileComment" && message.fileId === fileId));
            },
            addComment () {
                if (this.form.comment != null) {
                    this.form.fileId = this.selectedFile.id;
                    this.form.projectId = this.currentProject.id;
                    this.form.type = "fileComment";
                    this.form.data = {
                        "text": this.form.comment
                    };
                    this.form.author = this.user.id;
                    this.$store.dispatch('messages/createMessage', this.form).then(() => {
                        this.form.comment = null;
                    }).finally(() => {
                        this.triggerScoreAction({name: "addMessage", score: 1, type: "score"});
                        this.$toast.success('+1 Punkt für das Erstellen eines Kommentars', {
                            position: 'top-right',
                            duration: 60000 // 1 minute
                        });
                        this.createMessage({
                            "projectId": this.currentProject.id,
                            "type": "system",
                            "data": {
                                "text": `Neuer Kommentar von ${this.user.displayName} für "${this.selectedFile.name}".`
                            }
                        });
                        this.getFileMessages(this.form.fileId);
                    });
                }
            },
        },
        created () {
            this.searched = this.filterFilesByPhase(this.files);
        }
    }
</script>

<style scoped>
    .file-layout {
        margin-top: 24px;
    }
</style>