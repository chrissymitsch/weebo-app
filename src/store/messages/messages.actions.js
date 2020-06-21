import MessagesDb from '@/firebase/messages-db'

export default {
  /**
   * Fetch messages for project id
   */
  getMessages: async ({ commit }, projectId) => {
    const messagesDb = new MessagesDb(projectId);
    const messages = await messagesDb.readAll();
    commit('setMessages', messages)
  },

  /**
   * Create a message for current project
   */
  createMessage: async ({ rootState }, message) => {
    console.log(message.projectId, rootState)
    const messagesDb = new MessagesDb(message.projectId);
    await messagesDb.create(message);
  },
}
