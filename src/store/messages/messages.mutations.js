export default {
  /* Messages */
  setMessages: (state, messages) => (state.messages = messages),
  addMessages: (state, message) => {
    if (state.messages) {
      state.messages.push(message);
    } else {
      state.messages = [message];
    }
  },
  addMessageCreationPending: (state, message) =>
      state.messageCreationPending.push(message),
  removeMessageCreationPending: (state, createdMessage) => {
    const index = state.messageCreationPending.findIndex(message => message.id === createdMessage.id);
    state.messageCreationPending.splice(index, 1)
  },

  addMessageLoading: (state, messageId) =>
      state.messageLoading.push(messageId),
  removeMessageLoading: (state, messageId) => {
    const index = state.messageLoading.findIndex(message => message.id === messageId);
    state.messageLoading.splice(index, 1)
  },

}
