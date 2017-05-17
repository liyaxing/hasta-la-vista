'use babel';

import { CompositeDisposable } from 'atom';

export default {
  marks: null,
  subscriptions: null,

  activate(state) {
    this.marks = [];
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        "hasta-la-vista:i'll be back": () => this.mark(0),
        "hasta-la-vista:i'm coming": () => this.back(0),
        'hasta-la-vista:sayonara': () => this.mark(1),
        'hasta-la-vista:hasta la vista': () => this.back(1)
      })
    );
  },

  deactivate() {
    this.marks = null;
    this.subscriptions.dispose();
  },

  serialize() {
    return {};
  },

  mark(index) {
    let editor;
    if ((editor = atom.workspace.getActiveTextEditor())) {
      const path = editor.getPath();
      const location = editor.getCursorScreenPosition();
      this.marks[index] = { path, location };
    }
  },

  back(index) {
    if (this.marks[index]) {
      const { path, location } = this.marks[index];
      let editor;
      if ((editor = atom.workspace.getActiveTextEditor())) {
        if (editor.getPath() === path) {
          editor.setCursorScreenPosition(location);
          return;
        }
      }
      atom.workspace.open(path).then(editor => editor.setCursorScreenPosition(location));
    }
  }
};
