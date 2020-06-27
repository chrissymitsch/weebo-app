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
}
