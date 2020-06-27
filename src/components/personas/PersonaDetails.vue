<template>
    <div class="PersonaDetails">
        <md-card class="persona-form">
            <md-card-header>
                <div class="md-title">{{persona.name}}</div>
            </md-card-header>
            <md-card-content>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-medium-size-33 md-small-size-50 md-small-size-100">
                        <img :src="persona.picture" />
                    </div>
                    <div class="md-layout-item md-medium-size-33 md-small-size-50 md-small-size-100">
                        <p class="md-subheading">Werdegang</p>
                        <p class="md-body-2">Bildung</p>
                        <p class="md-caption">{{persona.education}}</p>
                        <p class="md-body-2">Beruf</p>
                        <p class="md-caption">{{persona.job}}</p>
                        <p class="md-body-2">Sonstiges</p>
                        <p class="md-caption">{{persona.other}}</p>
                    </div>
                    <div class="md-layout-item md-medium-size-33 md-small-size-50 md-small-size-100">
                        <p class="md-subheading">Kompetenzen</p>
                        <div v-for="(rangeName, index) in persona.rangeNames" :key="index">
                            <p class="md-body-2">{{persona.rangeNames[index]}}</p>
                            <p class="md-caption">{{persona.ranges[index]}}%</p>
                        </div>
                    </div>
                </div>
                <md-divider></md-divider>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-medium-size-33 md-small-size-50 md-small-size-100">
                        <p class="md-body-2">Alter</p>
                        <p class="md-caption">{{persona.age}}</p>
                        <p class="md-body-2">Interessen</p>
                        <p class="md-caption">{{persona.interests}}</p>
                        <p class="md-body-2">Familie</p>
                        <p class="md-caption">{{persona.family}}</p>
                    </div>
                    <div class="md-layout-item md-medium-size-66 md-small-size-66 md-small-size-100">
                        <p class="md-subheading">Verhaltensweisen</p>
                        <md-chip v-for="(behaviour, index) in persona.behaviour" :key="index">{{behaviour}}</md-chip>
                    </div>
                </div>
                <md-divider></md-divider>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-medium-size-100 md-small-size-100 md-small-size-100">
                        <p class="md-subheading">Beschreibung</p>
                        <p class="md-caption">{{persona.description}}</p>
                    </div>
                </div>
            </md-card-content>
        </md-card>
    </div>
</template>
<script>
    export default {
        props: {
            persona: Object
        },
    }
</script>
<style>
    .md-chip {
        white-space: break-spaces;
        height: auto;
    }

    .persona-form img {
        max-width: 200px;
    }
</style>