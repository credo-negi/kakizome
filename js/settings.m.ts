import Draw from "./draw.m.js";

type Items = {
  value: string,
  label: DialogContentItem[],
  checked?: boolean
}
type InputSelection = {
  type: "checkbox" | "radio",
  name: string,
  title: {
    ja: string,
    en: string
  }
  items: Items[],
  media?: boolean
}
type InputNumber = {
  type: "number" | "range",
  name: string,
  id: string,
  title: {
    ja: string,
    en: string
  },
  max: number,
  min: number,
  step?: number,
  default?: number
}
type DialogContentItem = {
  type: "content",
  tagName: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div" | "span" | "figure" | "section" | "img" | "button",
  classNames?: string[],
  id?: string,
  src?: string,
  onClick?: string,
  contents: (string | DialogContentItem | InputSelection | InputNumber |HTMLImageElement )[] | null,
}
type SettingsList = {
  [key: string] : {
    title: {
      en: string,
      ja: string,
    }
    items: (InputSelection | InputNumber | DialogContentItem)[]
  }
}

const brushImg = new Image();
brushImg.src = "./assets/brush_white_24dp.svg";
const penImg = new Image();
penImg.src = "./assets/edit_white_24dp.svg";

const aboutPage: (InputSelection | InputNumber | DialogContentItem)[] = [
  {
    type: "content",
    tagName: "div",
    classNames: [ "kakizome--setting--section" ],
    contents: [
      {
        type: "content",
        tagName: "p",
        classNames: ["ja"],
        contents: [
          "スマホやタブレットで書き初めができるアプリです．作品は画像としてダウンロードすることができます．"
        ]
      },
      {
        type: "content",
        tagName: "p",
        classNames: ["ja"],
        contents: [
          "筆先の形状やサイズ，和紙のサイズなどを変更できます．また，和紙を拡大することで，小さい画面でもかきやすくなります．画面下部のボタンから，設定項目を探してみてください．"
        ]
      },
      {
        type: "content",
        tagName: "p",
        classNames: ["en"],
        contents: [
          "With this web app, you can enjoy *Kakizome (Drawing Kanji or other Japanese Words with a brush on New Year Day)* on your phone or on your tablet. You can also download your artwork as an image file."
        ]
      },
      {
        type: "content",
        tagName: "p",
        classNames: ["en"],
        contents: [
          "You can adjust the brush shape, the brush size, and the paper size. By expanding the paper with your fingers, you can easily draw anything on the small screen on your device. Tap the buttons at the bottom of the screen and customize various properties as you like."
        ]
      }
    ]
  },
  {
    type: "content",
    tagName: "div",
    classNames: [ "kakizome--setting--section" ],
    contents: [
      {
        type: "content",
        tagName: "h2",
        classNames: ["ja"],
        contents: [ "免責事項" ]
      },
      {
        type: "content",
        tagName: "p",
        classNames: ["ja"],
        contents: [ "このWebアプリは，ユーザーの閲覧履歴や属性などの個人情報を取得することはありません．また，利用者がこのWebアプリで作成した作品を本ウェブアプリ経由で取得したり、サーバーに保存したりすることはありません。" ]
      },
      {
        type: "content",
        tagName: "p",
        classNames: ["ja"],
        contents: [ "作品をダウンロードし，SNSなどで共有する場合は，公序良俗に反することのないように，ご配慮をお願いいたします．" ]
      },
      {
        type: "content",
        tagName: "p",
        classNames: ["ja"],
        contents: [ "このWebアプリを使用したことにより，利用者が何らかの損害やトラブルに巻き込まれた場合であっても，このWebアプリの管理者は一切の責任を負うことができません．あらかじめご了承ください．" ]
      },
      {
        type: "content",
        tagName: "h2",
        classNames: ["en"],
        contents: [ "Disclaimer" ]
      },
      {
        type: "content",
        tagName: "p",
        classNames: ["en"],
        contents: [ "This web app does not obtain any personal information such as the user's browsing history or attributes. In addition, the works you created with this web app will not be obtained via this web app, nor will they be stored on the servers." ]
      },
      {
        type: "content",
        tagName: "p",
        classNames: ["en"],
        contents: [ "Please be careful not to offend public order and morals when downloading and sharing your artwork on social networking sites." ]
      },
      {
        type: "content",
        tagName: "p",
        classNames: ["en"],
        contents: [ "The administrator of this Web application cannot be held responsible for any damage or trouble that users may encounter as a result of using this Web application. Thank you for your attention." ]
      },
    ]
  },
];

const download: (InputSelection | InputNumber | DialogContentItem)[] = [
  {
    type: "content",
    tagName: "div",
    classNames: [ "kakizome--setting--section" ],
    contents: [
      {
        type: "content",
        tagName: "h2",
        contents: [ "ご利用ありがとうございます" ],
      },
      {
        type: "content",
        tagName: "p",
        contents: [ "作品の画像は自動的にkakizome.pngという.pngファイル形式でダウンロードされます．" ]
      },
      {
        type: "content",
        tagName: "p",
        contents: [ "お知り合いにもこのWebアプリを教えてあげてください．" ]
      },
      {
        type: "content",
        tagName: "div",
        contents: [
          {
            type: "content",
            tagName: "button",
            id: "url-to-clipboard",
            contents: [ "URLをコピー" ]
          },
          {
            type: "content",
            tagName: "span",
            id: "url-to-clipboard-message",
            contents: []
          }
        ]
      }
    ]
  }
];

const penSettings: (InputSelection | InputNumber | DialogContentItem)[] = [
  {
    type: "radio",
    name: "brush-shape",
    title: {
      ja: "筆先の形状",
      en: "Shape"
    },
    media: true,
    items: [
      {
        value: "brush",
        label: [
          {
            type: "content",
            tagName: "figure",
            contents: [ brushImg ]
          },
          {
            type: "content",
            tagName: "span",
            classNames: ["en"],
            contents: ["Brush"]
          },
          {
            type: "content",
            tagName: "span",
            classNames: ["ja"],
            contents: ["毛筆"]
          }
        ]
      },
      {
        value: "circle",
        label: [
          {
            type: "content",
            tagName: "figure",
            contents: [ penImg ]
          },
          {
            type: "content",
            tagName: "span",
            classNames: ["en"],
            contents: ["Pen (Circle)"]
          },
          {
            type: "content",
            tagName: "span",
            classNames: ["ja"],
            contents: ["ペン (円形)"]
          }
        ]
      }
    ]
  },
  {
    type: "range",
    id: "brush-size",
    name: "brush-size",
    title: {
      ja: "筆のサイズ",
      en: "Size"
    },
    max: 200,
    min: 10,
    step: 5
  },
  {
    type: "checkbox",
    name: "pressure",
    title: {
      ja: "筆圧検知",
      en: "Pressure"
    },
    media: true,
    items: [
      {
        value: "prssure",
        checked: false,
        label: [
          {
            type: "content",
            tagName: "span",
            classNames: ["en"],
            contents: ["Enable Dynamic Pressure"]
          },
          {
            type: "content",
            tagName: "span",
            classNames: ["ja"],
            contents: ["筆圧検知を有効にする"]
          }
        ]
      },
    ]
  }
];
const paperSettings: (InputSelection | InputNumber | DialogContentItem)[] = [
  {
    type: "radio",
    name: "paper-size",
    title: {
      ja: "和紙のサイズ",
      en: "Paper Size",
    },
    items: [
      {
        value: "hanshi",
        label: [
          {
            type: "content",
            tagName: "span",
            classNames: ["en"],
            contents: ["Hanshi (24.2cm x 33.3cm)"]
          },
          {
            type: "content",
            tagName: "span",
            classNames: ["ja"],
            contents: ["半紙 (24.2cm x 33.3cm)"]
          }
        ],
      },
      {
        value: "saitama",
        label: [
          {
            type: "content",
            tagName: "span",
            classNames: ["en"],
            contents: ["Saitama Style (26 cm x 78cm)"]
          },
          {
            type: "content",
            tagName: "span",
            classNames: ["ja"],
            contents: ["埼玉判 (26cm x 78cm)"]
          }
        ]
      },
      {
        value: "16-9",
        label: [
          {
            type: "content",
            tagName: "span",
            classNames: ["en"],
            contents: ["16:9 (Vertical)"]
          },
          {
            type: "content",
            tagName: "span",
            classNames: ["ja"],
            contents: ["16:9 (縦長)"]
          }
        ]
      }
    ],
  }
];

export class Dialog {
  dialog: HTMLDialogElement;
  dialogOpener: HTMLCollectionOf<Element>;
  _dialogHeaderEN: HTMLSpanElement;
  _dialogHeaderJA: HTMLSpanElement;
  _dialogCloser: HTMLButtonElement;
  _dialogContent: HTMLDivElement;
  constructor ( dialog: HTMLDialogElement, dialogOpener: HTMLCollectionOf<Element> ) {
    this.dialog = dialog;
    this.dialogOpener = dialogOpener;
    this._dialogHeaderEN = document.createElement('span');
    this._dialogHeaderEN.classList.add('kakizome--dialog--header--primary--text', 'en');
    this._dialogHeaderJA = document.createElement('span');
    this._dialogHeaderJA.classList.add('kakizome--dialog--header--primary--text', 'ja');
    this._dialogCloser = document.createElement('button');
    this._dialogCloser.classList.add('kakizome--dialog--header--button');
    this._dialogContent = document.createElement('div');
    this._dialogContent.classList.add('kakizome--dialog--content');
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.init();
  }

  initDialog () {
    const header = document.createElement('div');

    const header_primary = document.createElement('div');
    header_primary.classList.add('kakizome--dialog--header--primary');
    header_primary.appendChild(this.dialogHeaderEN);
    header_primary.appendChild(this.dialogHeaderJA);

    header.classList.add('kakizome--dialog--header');
    header.appendChild(header_primary);

    const header_secondary = document.createElement('div');
    header_secondary.classList.add('kakizome--dialog--header--secondary');
    
    const closeImg = new Image();
    closeImg.src = "./assets/close_white_24dp.svg";

    this.dialogCloser.appendChild(closeImg);
    header_secondary.appendChild(this.dialogCloser);

    header.appendChild(header_secondary);

    this.dialog.appendChild(header);
    this.dialog.appendChild(this.dialogContent);

  }

  resetDialog () {
    while ( this.dialogContent.firstChild ) {
      this.dialogContent.removeChild(this.dialogContent.firstChild);
    }
  }

  openDialog (ev: Event) {
    this.dialog.showModal();
  }

  closeDialog(ev: Event) {
    this.dialog.classList.add('dialog--closing');
    setTimeout(() => {
      this.resetDialog();
      this.dialog.classList.remove('dialog--closing');
      this.dialog.close();
    }, 250);
  }

  get dialogHeaderEN () {
    return this._dialogHeaderEN;
  }
  get dialogHeaderJA () {
    return this._dialogHeaderJA;
  }
  get dialogCloser () {
    return this._dialogCloser;
  }
  get dialogContent () {
    return this._dialogContent;
  }

  init () {
    this.initDialog();
    Array.from(this.dialogOpener).forEach((item) => {
      if ( item instanceof HTMLElement ) {
        item.addEventListener('click', this.openDialog);
      }
    });

    this.dialogCloser.addEventListener('click', this.closeDialog);
  }

}

export default class Settings extends Dialog {
  draw: Draw;
  settingsList: SettingsList;
  constructor ( draw: Draw, dialog: HTMLDialogElement, dialogOpener: HTMLCollectionOf<Element> ) {
    super(dialog, dialogOpener);
    this.draw = draw;
    this.dialogOpener = dialogOpener;
    this.settingsList = {
      "pen-settings": {
        title: {
          en: "Brush Settings",
          ja: "筆の設定"
        },
        items: penSettings
      },
      "paper-settings": {
        title: {
          en: "Paper Settings",
          ja: "和紙の設定"
        },
        items: paperSettings
      },
      "about": {
        title: {
          en: "About",
          ja: "このWebアプリについて"
        },
        items: aboutPage,
      },
      "download": {
        title: {
          en: "Download",
          ja: "ダウンロード"
        },
        items: download,
      }
    };
    this.setupDialog = this.setupDialog.bind(this);
    this.downloadCreatedImg = this.downloadCreatedImg.bind(this);
    this.initSettings();
  }
  appendDialogContentItem (item: InputSelection | InputNumber | DialogContentItem ) {
    let element: HTMLElement | null = null;
    switch (item.type) {
      case "content":
        element = document.createElement(item.tagName);
        if ( item.id ) element.id = item.id;
        if ( item.classNames ) element.classList.add(...item.classNames);
        if ( item.src && element instanceof HTMLImageElement ) element.src = item.src;
        if ( !item.contents ) return;
        for ( const content of item.contents ) {
          if ( typeof content === "string" ) {
            element.appendChild(document.createTextNode(content));
          } else if ( content instanceof HTMLImageElement ) {
            element.appendChild(content);
          } else {
            const child = this.appendDialogContentItem(content);
            if ( child ) element.appendChild(child);
          }
        }
        break;
      
      case "checkbox":
      case "radio":
      case "range":
        element = this.appendDialogSettingItem(item);
      default:
        break;
    }
    return element;
  }

  onChangeSettingValue (ev: Event) {
    const target = ev.target;
    if (target instanceof HTMLInputElement ) {
      const targetName = target.name as keyof Draw["editableSettings"];

      switch (targetName) {
        case "brush-size":
          this.draw.editableSettings[targetName] = parseInt(target.value, 10);
          break;

        case "paper-size":
          const size: { 
            [key: string]: { w: number, h: number } 
          } = {
            "hanshi": { w: 953, h: 1311 },
            "saitama": { w: 1024, h: 3071 },
            "16-9": { w: 720, h: 1280 }
          }
          const sizeName = target.value as keyof (typeof size);
          this.draw.editableSettings[targetName] = target.value;
          this.draw.canvas.dataset.size = target.value;
          this.draw.canvas.width = size[sizeName].w;
          this.draw.canvas.height = size[sizeName].h;
          break;

        case "pressure":
          this.draw.editableSettings[targetName] = (target.checked ? true : false);
          break;

        default:
          this.draw.editableSettings[targetName] = target.value;
          break;
      }
    }
  }

  appendDialogSettingItem (item: InputSelection | InputNumber ) {
    const element = document.createElement('section');
    element.classList.add('kakizome--setting--section');

    const itemWrapper = document.createElement('div');
    itemWrapper.classList.add('kakizome--setting--section--item--wrapper');
    const title = document.createElement('div');
    title.classList.add('kakizome--setting--section--title');

    const title_en = document.createElement('span');
    title_en.classList.add('en');
    title_en.innerText = item.title.en;

    const title_ja = document.createElement('span');
    title_ja.classList.add('ja');
    title_ja.innerText = item.title.ja;
    
    title.appendChild(title_en);
    title.appendChild(title_ja);
    element.appendChild(title);

    const name = item.name as keyof Draw["editableSettings"];
    const nowValue = this.draw.editableSettings[name];

    switch (item.type) {
      case "checkbox":
      case "radio":
        if ( item.media ) itemWrapper.classList.add('kakizome--setting--section--item--wrapper--row');
        for ( const inputItem of item.items ) {
          const inputWrapper = document.createElement('div');
          inputWrapper.classList.add('kakizome--setting--section--item');
          const inputEl = document.createElement('input');
          inputEl.type = item.type;
          inputEl.name = item.name;
          inputEl.id = `${item.name}-${inputItem.value}`;
          inputEl.value = inputItem.value;
          inputEl.checked = (nowValue === inputItem.value || nowValue === true)
          inputEl.classList.add(`kakizome--${item.type}`);

          inputEl.addEventListener('change', this.onChangeSettingValue.bind(this));
          
          const label = document.createElement('label');
          label.htmlFor = `${item.name}-${inputItem.value}`;
          for ( const labelItem of inputItem.label ) {
            const labelContent = this.appendDialogContentItem(labelItem);
            if ( labelContent ) label.appendChild(labelContent);
          }
          inputWrapper.appendChild(inputEl);
          inputWrapper.appendChild(label);
          itemWrapper.appendChild(inputWrapper);
        }
        break;

      case "range":
        const inputWrapper = document.createElement('div');
        inputWrapper.classList.add('kakizome--setting--section--item');
        const range = document.createElement('input');
        range.classList.add(`kakizome--${item.type}`);
        range.type = item.type;
        range.name = item.name;
        range.min = item.min.toString();
        range.max = item.max.toString();
        range.value = nowValue.toString();
        if ( item.step ) range.step = item.step.toString();

        range.addEventListener('change', this.onChangeSettingValue.bind(this));
        inputWrapper.appendChild(range);
        itemWrapper.appendChild(inputWrapper);
      default:
        break;
    }
    element.appendChild(itemWrapper);
    return element;
  }

  setupDialog (ev: Event) {
    const target = ev.target;
    if ( target instanceof HTMLElement && target.dataset.dialog ) {
      const settings = this.settingsList[target.dataset.dialog];
      this.dialogHeaderEN.innerText = settings.title.en;
      this.dialogHeaderJA.innerText = settings.title.ja;
      for ( const item of settings.items ) {
        const element = this.appendDialogContentItem(item);
        if ( element ) this.dialogContent.appendChild(element);
      }
    }
  }

  private async createImg (ctx: CanvasRenderingContext2D) {
    const image = new Image;
    image.src = ctx.canvas.toDataURL("image/png");
    return image;
  }

  private async downloadImg (ctx: CanvasRenderingContext2D) {
    const link = document.createElement('a');
    link.href = ctx.canvas.toDataURL("image/png");
    link.download = "kakizome.png";
    link.click();
  }

  async downloadCreatedImg () {
    const background = document.createElement('canvas');
    background.width = this.draw.canvas.width;
    background.height = this.draw.canvas.height;
    const ctx_background = background.getContext('2d');

    if ( ctx_background ) {
      ctx_background.fillStyle = "white";
      ctx_background.fillRect(0, 0, background.width, background.height);

      const image = document.createElement('canvas');
      image.width = this.draw.canvas.width;
      image.height = this.draw.canvas.height;
      const ctx_image = image.getContext('2d');

      if ( ctx_image ) {
        ctx_image.drawImage(background, 0, 0);
        if ( this.draw.ctx ) {
          ctx_image.drawImage(this.draw.canvas, 0, 0);
          await this.downloadImg(ctx_image);
        }
      }
    }
  }

  initSettings () {
    Array.from(this.dialogOpener).forEach(element => {
      if ( element instanceof HTMLElement ) {
        element.addEventListener('click', this.setupDialog);
      }
    });
  }
}