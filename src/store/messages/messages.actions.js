import MessagesDb from '@/firebase/messages-db'
import ProjectsDB from '@/firebase/projects-db'

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
   * Fetch message by id
   */
  getMessage: async ({ commit, state }, messageId) => {
    commit('addMessageLoading', messageId);
    const messagesDb = new MessagesDb(state.currentProject.id);
    const message = await messagesDb.read(messageId);
    commit('removeMessageLoading', messageId);
    return message;
  },

  /**
   * Create a message for current project
   */
  createMessage: async ({ commit }, message) => {
    commit('addMessageCreationPending', message);
    const messagesDb = new MessagesDb(message.projectId);
    const projectsDb = new ProjectsDB();
    const newMessage = await messagesDb.create(message);
    await projectsDb.update({id: message.projectId, newMessage: newMessage.id});
    commit('addMessages', newMessage);
    commit('removeMessageCreationPending', message);
  },
}
