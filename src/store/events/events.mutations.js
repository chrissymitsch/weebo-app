export default {
  /* Events */
  setEvents: (state, events) => (state.events = events),
  addProjectEvent: (state, event) => {
    if (state.events) {
      state.events.push(event);
    } else {
      state.events = [event];
    }
  },
  deleteProjectEvent: (state, eventId) => {
    const index = state.events.findIndex(event => event.id === eventId);
    state.events.splice(index, 1)
  },
  addProjectEventDeletionPending: (state, eventId) =>
      state.projectEventDeletionPending.push(eventId),
  removeProjectEventDeletionPending: (state, eventId) => {
    const index = state.projectEventDeletionPending.findIndex(event => event === eventId);
    state.projectEventDeletionPending.splice(index, 1)
  },
}
