type touchData = {
  initial: [
    {
      x: number,
      y: number
    },
    {
      x: number,
      y: number
    }
  ],
  now: [
    {
      x: number,
      y: number
    },
    {
      x: number,
      y: number
    }
  ],
  distance: number,
  scale: {
    now: number,
    last: number
  }
}

type EditableSettings = {
  ["brush-shape"]: string,
  ["brush-size"]: number,
  ["paper-size"]: string,
  ["pressure"]: boolean,
}


type HistoryController = {
  parent: HTMLElement,
  buttons: HTMLButtonElement[]
}

export class Scaler {
  canvas: HTMLCanvasElement;
  canvasWrapper: HTMLElement | null;
  canvasMode: HTMLInputElement;
  touchData: touchData;
  _mode: "draw" | "touch";
  _touch: boolean;
  _scroll: { x: number, y: number };
  _lastDiff: { x: number, y: number };
  constructor (canvas: HTMLCanvasElement, canvasMode: HTMLInputElement) {
    this.canvas = canvas;
    this.canvasWrapper = this.canvas.parentElement;
    this.canvasMode = canvasMode;
    this._mode = "draw";
    this._touch = true;
    this._scroll = { x: 0, y: 0 };
    this._lastDiff = { x: 0, y: 0 };
    this.touchData = {
      initial: [
        { x: 0, y: 0 }, { x: 0, y: 0 }
      ],
      now: [
        { x: 0, y: 0 }, { x: 0, y: 0 }
      ],
      distance: 0,
      scale: {
        now: 1,
        last: 1
      }
    };
    this.initializeCanvasTouchData = this.initializeCanvasTouchData.bind(this);
    this.changeCanvasTouchData = this.changeCanvasTouchData.bind(this);
    this.finalizeCanvasTouchData = this.finalizeCanvasTouchData.bind(this);
    this.changeCanvasMode = this.changeCanvasMode.bind(this);
    this.init();
  }

  get mode () {
    return this._mode;
  }
  set mode ( mode: "draw" | "touch" ) {
    this._mode = mode;
  }

  get touch () {
    return this._touch;
  }
  set touch ( state: boolean ) {
    this._touch = state;
  }

  get scroll () {
    return this._scroll;
  }
  set scroll ( arr: { x: number, y: number } ) {
    this._scroll = arr;
  }

  get lastDiff () {
    return this._lastDiff;
  }
  set lastDiff ( arr: { x: number, y: number } ) {
    this._lastDiff = arr;
  }

  set initialTouch ( arr: { i: number, x: number, y: number } ) {
    this.touchData.initial[arr.i] = {
      x: arr.x, y: arr.y
    };
    this.touchData.distance = Math.sqrt(
      Math.pow(this.touchData.initial[1].x - this.touchData.initial[0].x, 2) +
      Math.pow(this.touchData.initial[1].y - this.touchData.initial[0].y, 2)
    );
  }

  set nowTouch ( arr: { i: number, x: number, y: number }) {
    this.touchData.now[arr.i] = {
      x: arr.x, y: arr.y
    };
    const distance = Math.sqrt(
      Math.pow(this.touchData.now[1].x - this.touchData.now[0].x, 2) +
      Math.pow(this.touchData.now[1].y - this.touchData.now[0].y, 2)
    );
    const lastScale = this.touchData.scale.last;
    const newScale = lastScale + ((distance - this.touchData.distance) / this.touchData.distance);
    if ( newScale <= 3 && newScale >= 1 ) {
      this.touchData.scale.now = newScale;
    } else if ( newScale < 1 ) {
      this.touchData.scale.now = 1;
    } else {
      this.touchData.scale.now = 3;
    }
  }

  changeCanvasScale () {
    if ( this.mode === "touch" && this.touch === true ) {
      const scale = { now: this.touchData.scale.now, last: this.touchData.scale.last };
      this.canvas.style.setProperty('--scale', scale.now.toString());
      const canvasSize = { 
        w: this.canvas.clientWidth * scale.now,
        h: this.canvas.clientHeight * scale.now
      }
      if ( this.canvasWrapper instanceof HTMLElement ) {
        const diff = {
          x: canvasSize.w - this.canvasWrapper.clientWidth,
          y: canvasSize.h - this.canvasWrapper.clientHeight
        };
        this.canvasWrapper.scroll(diff.x / 2 + (this.scroll.x - this.lastDiff.x / 2) * (scale.now / scale.last), diff.y / 2 + (this.scroll.y - this.lastDiff.y / 2) * (scale.now / scale.last));
      }
      requestAnimationFrame(this.changeCanvasScale.bind(this));
    }
  }

  initializeCanvasTouchData ( ev: TouchEvent ) {
    const touches = ev.touches;

    if ( touches.length < 2 ) return;
    if ( this.mode === "touch" ) {
      this.touch = true;
      if ( this.canvasWrapper instanceof HTMLElement ) {
        this.scroll = {
          x: this.canvasWrapper.scrollLeft,
          y: this.canvasWrapper.scrollTop
        }
      }
      for ( let i = 0; i < 2; i++ ) {
        this.initialTouch = {
          i: i,
          x: touches[i].clientX,
          y: touches[i].clientY
        }
        this.nowTouch = {
          i: i,
          x: touches[i].clientX,
          y: touches[i].clientY
        }
      }
      this.changeCanvasScale();
    }
  }

  changeCanvasTouchData ( ev: TouchEvent ) {
    const touches = ev.touches;
    if ( touches.length < 2 ) return;
    if ( this.mode === "touch" ) {
      for ( let i = 0; i < 2; i++ ) {
        this.nowTouch = {
          i: i,
          x: touches[i].clientX,
          y: touches[i].clientY
        }
      }
    }
  }

  finalizeCanvasTouchData ( ev: TouchEvent ) {
    this.touch = false;
    this.touchData.scale.last = this.touchData.scale.now;
    if ( this.canvasWrapper instanceof HTMLElement ) {
      this.scroll = {
        x: this.canvasWrapper.scrollLeft,
        y: this.canvasWrapper.scrollTop
      };
      this.lastDiff = {
        x: this.canvas.clientWidth * this.touchData.scale.last - this.canvasWrapper.clientWidth,
        y: this.canvas.clientHeight * this.touchData.scale.last - this.canvasWrapper.clientHeight
      }
    }
  }

  changeCanvasMode ( ev: Event ) {
    const target = ev.target;
    if ( target instanceof HTMLInputElement ) {
      this.mode = (target.checked ? "draw" : "touch");
    }
  }

  init () {
    this.canvas.addEventListener('touchstart', this.initializeCanvasTouchData);
    this.canvas.addEventListener('touchmove', this.changeCanvasTouchData);
    this.canvas.addEventListener('touchend', this.finalizeCanvasTouchData);
    this.canvasMode.addEventListener('change', this.changeCanvasMode);
  }
}

export class HistoryHandler extends Scaler {
  private _undo: ImageData[];
  private _redo: ImageData[];
  private _undo_max: number;
  private _redo_max: number;
  historyController: HistoryController;
  ctx: CanvasRenderingContext2D | null;
  constructor (canvas: HTMLCanvasElement, canvasMode: HTMLInputElement) {
    super(canvas, canvasMode);
    this.ctx = canvas.getContext('2d');
    this._undo = [];
    this._redo = [];
    this._undo_max = 20;
    this._redo_max = 20;

    const historyControllerButtonIDs: { [key: string]: string }= {
      ["undo"]: "undo", ["redo"]: "redo", ["clear"]: "refresh"
    }
    const historyControllerParent = document.createElement('div');
    historyControllerParent.classList.add('kakizome--history--controller');
    this.historyController = {
      parent: historyControllerParent,
      buttons: Object.keys(historyControllerButtonIDs).map((key) => {
        const img = new Image();
        img.src = `./assets/${historyControllerButtonIDs[key]}_white_24dp.svg`;
        const button = document.createElement('button');
        button.classList.add('kakizome--history--controller--button');
        button.id = key;
        button.disabled = true;
        button.appendChild(img);
        return button;
      })
    };

    this.initHistoryHandler();
  }

  pushUndo ( data: ImageData ) {
    if ( this._undo.length >= this._undo_max ) {
      this._undo.shift();
    }
    this._undo.push(data);
    this.historyController.buttons[0].disabled = false;
    this.historyController.buttons[2].disabled = false;
  }

  pushRedo ( data: ImageData ) {
    if ( this._redo.length >= this._redo_max ) {
      this._redo.shift();
    }
    this._redo.push(data);
    this.historyController.buttons[1].disabled = false;
    this.historyController.buttons[2].disabled = false;
  }

  clearRedo () {
    this._redo = [];
    this.historyController.buttons[1].disabled = true;
  }

  onClickHistoryButton (ev: Event) {
    const target = ev.currentTarget;
    if ( target instanceof HTMLButtonElement && this.ctx ) {
      console.log(target.id);
      const id = target.id;
      const w = this.canvas.width;
      const h = this.canvas.height;
      switch (id) {
        case "undo":
          const imgDataFromUndo = this._undo.pop();
          if ( imgDataFromUndo ) {
            const imgDataToRedo = this.ctx.getImageData(0, 0, w, h);
            this.pushRedo(imgDataToRedo);
            this.ctx.clearRect(0, 0, w, h);
            this.ctx.putImageData(imgDataFromUndo, 0, 0);
          }
          if ( this._undo.length < 1 ) {
            target.disabled = true;
          }
          break;
        case "redo":
          const imgDataFromRedo = this._redo.pop();
          if ( imgDataFromRedo ) {
            const imgDataToUndo = this.ctx.getImageData(0, 0, w, h);
            this.pushUndo(imgDataToUndo);
            this.ctx.clearRect(0, 0, w, h);
            this.ctx.putImageData(imgDataFromRedo, 0, 0);
          }
          if ( this._redo.length < 1 ) {
            target.disabled = true;
          }
          break;
        case "clear":
          const imgDataToUndo = this.ctx.getImageData(0, 0, w, h);
          this.pushUndo(imgDataToUndo);
          this.ctx.clearRect(0, 0, w, h);
        default:
          break;
      }
    }
  }  

  initHistoryHandler () {
    for ( const button of this.historyController.buttons) {
      button.addEventListener('click', this.onClickHistoryButton.bind(this));
      this.historyController.parent.appendChild(button);
    }
    const kakizomeArea = this.canvas.parentElement;
    if ( kakizomeArea ) {
      kakizomeArea.appendChild(this.historyController.parent);
    }
  }
}

export default class Draw extends HistoryHandler {
  _isDtawing: boolean;
  _lastPoint: { x: number, y: number };
  _lastPressure: number;
  _shapeAngle: number;
  editableSettings: {
    ["brush-shape"]: string,
    ["brush-size"]: number,
    ["paper-size"]: string,
    ["pressure"]: boolean,
  };
  constructor(canvas: HTMLCanvasElement, canvasMode: HTMLInputElement) {
    super(canvas, canvasMode);
    this._isDtawing = false;
    this._lastPoint = {x: 0, y: 0};
    this._lastPressure = 0;
    this._shapeAngle = Math.PI / (-4);
    this.editableSettings = {
      ["brush-shape"]: "brush",
      ["brush-size"]: 100,
      ["paper-size"]: "hanshi",
      ["pressure"]: false,
    }
    this.startDrawing = this.startDrawing.bind(this);
    this.whileDrawing = this.whileDrawing.bind(this);
    this.endDrawing = this.endDrawing.bind(this);
    this.initDraw();
  }

  get isDrawing () {
    return this._isDtawing;
  }

  set isDrawing ( flag: boolean ) {
    this._isDtawing = flag;
  }

  get lastPoint () {
    return this._lastPoint;
  }

  set lastPoint (arr: { x: number, y: number}) {
    this._lastPoint = arr;
  }

  get lastPressure () {
    return this._lastPressure;
  }
  set lastPressure (press: number) {
    this._lastPressure = press;
  }

  get shapeAngle () {
    return this._shapeAngle;
  }
  set shapeAngle ( angle: number ) {
    this._shapeAngle = angle;
  }

  private distanceBetween (point1: {x: number, y: number}, point2: {x: number, y: number}) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  }

  private angleBetween ( point1: {x: number, y: number}, point2: {x: number, y: number}) {
    return Math.atan2( point2.x - point1.x, point2.y - point1.y );
  }

  private calculateShapePlot (center: {x: number, y: number}, stepNum: number, rad: number) {
    let list: number[][] = [];
    for ( let i = 0; i < stepNum; i++ ) {
      const shapeX = Math.sin(2 * (i - stepNum / 2) * Math.PI / stepNum) * rad / 4;
      const shapeY = (0.5 - Math.cos((i - stepNum / 2) * Math.PI / stepNum)) * rad * (-1);
      const x = center.x + shapeX * Math.cos(this.shapeAngle) - shapeY * Math.sin(this.shapeAngle);
      const y = center.y + shapeX * Math.sin(this.shapeAngle) + shapeY * Math.cos(this.shapeAngle);
      const set = [x, y];
      list.push(set);
    }
    return list;
  }

  drawBrushFootprint (arr: {i: number, x: number, y: number, stepPress: number}) {
    if ( !this.ctx ) return;
    const press = this.lastPressure + arr.stepPress * (arr.i + 1);
    const brushSize = this.editableSettings["brush-size"];
    const xrad = (press >= 0.4) ? (brushSize * (press - 0.4) + 16) : (brushSize * press / 2);
    const stepNum = 20;
    const center = { x: arr.x + 20, y: arr.y + 20 };
    const shapePlot = this.calculateShapePlot(center, stepNum, xrad);
    this.ctx.beginPath();
    this.ctx.moveTo(shapePlot[0][0], shapePlot[0][1]);
    for (const item of shapePlot) {
      this.ctx.lineTo(item[0], item[1]);
    }
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawCircleFootprint (arr: {i: number, x: number, y: number, stepPress: number}) {
    if ( !this.ctx ) return;
    const press = this.lastPressure + arr.stepPress * (arr.i + 1);
    const brushSize = this.editableSettings["brush-size"];
    const rad = (press >= 0.4) ? (brushSize * (press - 0.4) + 16) : (brushSize * press / 2);
    this.ctx.beginPath();
    this.ctx.arc(arr.x + 20, arr.y + 20, rad, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
  }

  startDrawing (ev: PointerEvent) {
    ev.preventDefault();
    if ( !ev.isPrimary ) return;
    this.isDrawing = true;
    let scrollCal: {w: number, h: number} = { w: 0, h: 0 };
    if ( this.canvasWrapper instanceof HTMLElement ) {
      scrollCal = {
        w: this.canvasWrapper.scrollLeft,
        h: this.canvasWrapper.scrollTop
      }
    }
    if ( this.ctx && this.mode === "draw" ) {
      const imgDatatoUndo = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
      this.pushUndo(imgDatatoUndo);
      this.clearRedo();
      this.historyController.parent.dataset.hide = "hide";
    }
    const calibration = this.canvas.width / this.canvas.offsetWidth;
    this.lastPoint = { x: (ev.offsetX) * calibration, y: (ev.offsetY) * calibration };
    this.lastPressure = ev.pressure;
  }

  whileDrawing (ev: PointerEvent) {
    ev.preventDefault();
    if ( !this.isDrawing || this.mode !== "draw" || !ev.isPrimary ) return;
    const calibration = this.canvas.width / this.canvas.offsetWidth;
    const currentPoint = { x: (ev.offsetX) * calibration, y: (ev.offsetY) * calibration };
    const currentPressure = this.editableSettings["pressure"] ? ev.pressure : 1;
    const diffPressure = currentPressure - this.lastPressure;
    const distance = this.distanceBetween(this.lastPoint, currentPoint);
    const angle = this.angleBetween(this.lastPoint, currentPoint);
    const step = 0.5;
    const stepPressure = diffPressure / (distance / step);
    if ( !this.ctx ) return;

    for ( let i = 0; i < distance; i+=step ) {
      const x = this.lastPoint.x + (Math.sin(angle) * i) - 25;
      const y = this.lastPoint.y + (Math.cos(angle) * i) - 25;
      const arr = { i: i, x: x, y: y, stepPress: stepPressure };
      if ( this.editableSettings["brush-shape"] === "brush" ) this.drawBrushFootprint(arr);
      else this.drawCircleFootprint(arr);
    }
    this.lastPoint = currentPoint;
    this.lastPressure = currentPressure;
  }

  endDrawing (ev: PointerEvent) {
    ev.preventDefault();
    if ( !ev.isPrimary ) return;
    this.isDrawing = false;
    this.historyController.parent.dataset.hide = "";
  }

  initDraw () {
    if ( this.ctx ) {
      this.ctx.fillStyle = "black"
      this.ctx.strokeStyle = 'black';
    }
    this.canvas.addEventListener('pointerdown', this.startDrawing);
    this.canvas.addEventListener('pointermove', this.whileDrawing);
    this.canvas.addEventListener('pointerup', this.endDrawing);
  }
}