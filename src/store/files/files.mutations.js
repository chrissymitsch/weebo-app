export default {
  /* Files */
  setFiles: (state, files) => (state.files = files),
  addProjectFile: (state, file) => {
    if (state.files) {
      state.files.push(file);
    } else {
      state.files = [file];
    }
  },
  deleteProjectFile: (state, fileId) => {
    const index = state.files.findIndex(file => file.id === fileId);
    state.files.splice(index, 1)
  },
  addProjectFileDeletionPending: (state, fileId) =>
      state.projectFileDeletionPending.push(fileId),
  removeProjectFileDeletionPending: (state, fileId) => {
    const index = state.projectFileDeletionPending.findIndex(file => file === fileId);
    state.projectFileDeletionPending.splice(index, 1)
  },
}
