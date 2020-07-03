import ProjectPersonasDb from '@/firebase/project-personas-db'

export default {
  /**
   * Fetch personas for project id
   */
  getPersonas: async ({ commit }, projectId) => {
    const projectPersonasDb = new ProjectPersonasDb(projectId);

    const files = await projectPersonasDb.readAll();
    commit('setPersonas', files)
  },

  /**
   * Create a persona for current project
   */
  createProjectPersona: async ({ commit }, persona) => {
    const personasDb = new ProjectPersonasDb(persona.projectId);
    const createdPerson = await personasDb.create(persona);
    commit('addProjectPersona', createdPerson);
  },

  /**
   * Delete persona for current project
   */
  deleteProjectPersona: async ({ commit }, {projectId, personaId}) => {
    commit('addProjectPersonaDeletionPending', personaId);
    commit('deleteProjectPersona', personaId);
    const projectPersonasDb = new ProjectPersonasDb(projectId);
    await projectPersonasDb.delete(personaId);
    commit('removeProjectPersonaDeletionPending', personaId);
  },
}
