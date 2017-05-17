'use babel';

import HastaLaVista from '../lib/hasta-la-vista';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('HastaLaVista', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('hasta-la-vista');
  });

  describe("when the hasta-la-vista:i'll be back event is triggered", () => {
    it('has one valid test', () => {
      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, "hasta-la-vista:i'll be back");

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect('life').toBe('easy');
      });
    });
  });
});
