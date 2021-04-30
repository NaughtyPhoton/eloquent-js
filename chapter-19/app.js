// import Picture from './picture';
// import PictureCanvas from './pictureCanvas';
// import {elt} from './util';

window.startPixelEditor = () => {
    console.log('hiiii')
    const h = document.createElement('h1')
    h.innerText = 'hi frands'
    return h
}


window.alertMe = () => {
    alert('HIIII')
}

// class PixelEditor {
//     constructor(state, config) {
//         let {tools, controls, dispatch} = config;
//         this.state = state;
//
//         this.canvas = new PictureCanvas(state.picture, pos => {
//             let tool = tools[this.state.tool];
//             let onMove = tool(pos, this.state, dispatch);
//             if (onMove) return pos => onMove(pos, this.state);
//         });
//         this.controls = controls.map(
//             Control => new Control(state, config));
//         this.dom = elt("div", {}, this.canvas.dom, elt("br"),
//             ...this.controls.reduce(
//                 (a, c) => a.concat(" ", c.dom), []));
//     }
//
//     syncState(state) {
//         this.state = state;
//         this.canvas.syncState(state.picture);
//         for (let ctrl of this.controls) ctrl.syncState(state);
//     }
// }
//
// class ToolSelect {
//     constructor(state, {tools, dispatch}) {
//         this.select = elt("select", {
//             onchange: () => dispatch({tool: this.select.value})
//         }, ...Object.keys(tools).map(name => elt("option", {
//             selected: name === state.tool
//         }, name)));
//         this.dom = elt("label", null, " Tool: ", this.select);
//     }
//     syncState(state) { this.select.value = state.tool; }
// }
