export default {
    /**
     * Check if a message is loading
     */
    isMessageLoading: state => messageId =>
        state.messageLoading.includes(messageId),
}
