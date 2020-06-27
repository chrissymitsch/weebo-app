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
}
