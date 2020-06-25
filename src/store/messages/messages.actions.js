import MessagesDb from '@/firebase/messages-db'
import ProjectsDB from "@/firebase/projects-db";

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
    console.log("createMessage", rootState.authentication.user.id);
    const messagesDb = new MessagesDb(message.projectId);
    const projectsDb = new ProjectsDB();
    const newMessage = await messagesDb.create(message);
    await projectsDb.update({id: message.projectId, newMessage: newMessage.id});
  },
}
