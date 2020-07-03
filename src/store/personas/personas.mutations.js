export default {
    /* Personas */
    setPersonas: (state, persona) => (state.personas = persona),
    addProjectPersona: (state, persona) => {
        if (state.personas) {
            state.personas.push(persona);
        } else {
            state.personas = [persona];
        }
    },
    deleteProjectPersona: (state, personaId) => {
        const index = state.personas.findIndex(persona => persona.id === personaId);
        state.personas.splice(index, 1)
    },
    addProjectPersonaDeletionPending: (state, personaId) =>
        state.projectPersonaDeletionPending.push(personaId),
    removeProjectPersonaDeletionPending: (state, personaId) => {
        const index = state.projectPersonaDeletionPending.findIndex(persona => persona === personaId);
        state.projectPersonaDeletionPending.splice(index, 1)
    },
}
