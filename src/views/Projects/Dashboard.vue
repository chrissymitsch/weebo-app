<template>
    <div class="Dashboard">
        <h1 class="title">Projekt-Dashboard</h1>
        <md-card class="process-step" md-with-hover>
            <md-ripple>
                <md-card-header>
                    <div class="md-title">Projektstatus</div>
                </md-card-header>

                <md-card-content>
                    Level 1
                </md-card-content>
            </md-ripple>
        </md-card>

        <p></p>

        <div class="md-layout">
            <div class="md-layout-item">
                <md-card class="process-step md-accent" md-with-hover>
                    <md-ripple>
                        <md-card-header>
                            <div class="md-title">Phase 1</div>
                            <div class="md-subhead">Analyse</div>
                        </md-card-header>

                        <md-card-actions>
                            <md-button class="md-icon-button"><md-icon>search</md-icon></md-button>
                            <md-button class="md-icon-button"><md-icon>done</md-icon></md-button>
                        </md-card-actions>
                    </md-ripple>
                </md-card>
            </div>
            <div class="md-layout-item">
                <md-card class="process-step" md-with-hover>
                    <md-ripple>
                        <md-card-header>
                            <div class="md-title">Phase 2</div>
                            <div class="md-subhead">Spezifikation</div>
                        </md-card-header>

                        <md-card-actions>
                            <md-button class="md-icon-button"><md-icon>search</md-icon></md-button>
                            <md-button class="md-icon-button"><md-icon>done</md-icon></md-button>
                        </md-card-actions>
                    </md-ripple>
                </md-card>
            </div>
            <div class="md-layout-item">
                <md-card class="process-step" md-with-hover>
                    <md-ripple>
                        <md-card-header>
                            <div class="md-title">Phase 3</div>
                            <div class="md-subhead">Modellierung</div>
                        </md-card-header>

                        <md-card-actions>
                            <md-button class="md-icon-button"><md-icon>search</md-icon></md-button>
                            <md-button class="md-icon-button"><md-icon>done</md-icon></md-button>
                        </md-card-actions>
                    </md-ripple>
                </md-card>
            </div>
            <div class="md-layout-item">
                <md-card class="process-step" md-with-hover>
                    <md-ripple>
                        <md-card-header>
                            <div class="md-title">Phase 4</div>
                            <div class="md-subhead">Evaluation</div>
                        </md-card-header>

                        <md-card-actions>
                            <md-button class="md-icon-button"><md-icon>search</md-icon></md-button>
                            <md-button class="md-icon-button"><md-icon>done</md-icon></md-button>
                        </md-card-actions>
                    </md-ripple>
                </md-card>
            </div>
        </div>
        <p></p>
        <md-card class="process-step" md-with-hover>
            <md-ripple>
                <md-card-media md-small>
                    <img src="@/assets/img/pokal.png" alt="Pokal">
                </md-card-media>

                <md-card-header>
                    <div class="md-title">ENDGAME</div>
                    <div class="md-subhead">Softwareeinführung</div>
                </md-card-header>

                <md-card-actions>
                    <md-button class="md-icon-button"><md-icon>search</md-icon></md-button>
                    <md-button class="md-icon-button"><md-icon>done</md-icon></md-button>
                </md-card-actions>
            </md-ripple>
        </md-card>
    </div>
</template>

<script>

</script>

<style lang="scss" scoped>
    .process-step {
        max-height: 100px;

        .md-ripple {
            display: flex;
            justify-content: space-between;

            .md-card-media {
                padding: 8px;

                img {
                    width: 50px;
                }
            }

            .md-card-header {
                padding: 8px;
                margin-top: 0;
                max-width: 50%;

                .md-title {
                    margin-top: 0;
                    font-size: 16px;
                }
            }

            .md-card-actions {
                max-width: 50%;
            }
        }
    }
</style>