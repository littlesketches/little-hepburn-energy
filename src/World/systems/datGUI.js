import { GUI } from 'https://unpkg.com/three@0.127.0/examples/jsm/libs/dat.gui.module.js';

function createDatGUI() {

    const gui = new GUI({name: 'Little Hepburn Energy'});

  return gui;
}

export { createDatGUI };
