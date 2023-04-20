import ProjectsEventsDB from '@/firebase/project-events-db'

export default {
  /**
   * Fetch events for project id
   */
  getEvents: async ({ commit }, projectId) => {
    const projectEventsDb = new ProjectsEventsDB(projectId);

    const events = await projectEventsDb.readAll();
    commit('setEvents', events)
  },

  /**
   * Create an entry for a storage event for current project
   */
  createProjectEvent: async ({ rootState, commit }, event) => {
    const newEvent = event;
    event.creator = rootState.authentication.user.id;

    const projectEventsDb = new ProjectsEventsDB(event.projectId);
    const createdEvent = await projectEventsDb.create(newEvent);
    commit('addProjectEvent', createdEvent);
  },

  /**
   * Delete event for current project
   */
  deleteProjectEvent: async ({ commit }, {projectId, eventId}) => {
    commit('addProjectEventDeletionPending', eventId);
    commit('deleteProjectEvent', eventId);
    const projectsEventsDb = new ProjectsEventsDB(projectId);
    await projectsEventsDb.delete(eventId);
    commit('removeProjectEventDeletionPending', eventId);
  },
}
