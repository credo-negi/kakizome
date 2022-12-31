import Draw from './draw.m.js';
import Settings from './settings.m.js';
const canvas = document.getElementById('canvas');
const canvasModeCheckbox = document.getElementById('canvas-mode');
const dialogOpener = document.getElementsByClassName('dialog-opener');
const dialog = document.getElementById('setting-dialog');
const downloadButton = document.getElementById('download-button');
const draw = new Draw(canvas, canvasModeCheckbox);
const settings = new Settings(draw, dialog, dialogOpener);
downloadButton.addEventListener('click', settings.downloadCreatedImg);
const user_language = window.navigator.language;
if (user_language !== "ja") {
    document.documentElement.lang = "en";
}
