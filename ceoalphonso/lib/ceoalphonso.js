'use babel';

import CeoalphonsoView from './ceoalphonso-view';
import { CompositeDisposable } from 'atom';

export default {

  ceoalphonsoView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.ceoalphonsoView = new CeoalphonsoView(state.ceoalphonsoViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.ceoalphonsoView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ceoalphonso:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ceoalphonsoView.destroy();
  },

  serialize() {
    return {
      ceoalphonsoViewState: this.ceoalphonsoView.serialize()
    };
  },

  toggle() {
    console.log('Ceoalphonso was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
