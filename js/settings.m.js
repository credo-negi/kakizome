var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const brushImg = new Image();
brushImg.src = "./assets/brush_white_24dp.svg";
const penImg = new Image();
penImg.src = "./assets/edit_white_24dp.svg";
const aboutPage = [
    {
        type: "content",
        tagName: "div",
        classNames: ["kakizome--setting--section"],
        contents: [
            {
                type: "content",
                tagName: "p",
                contents: [
                    "スマホやタブレットで書き初めができるアプリです．作品は画像としてダウンロードすることができます．"
                ]
            },
            {
                type: "content",
                tagName: "p",
                contents: [
                    "筆先の形状やサイズ，和紙のサイズなどを変更できます．また，和紙を拡大することで，小さい画面でもかきやすくなります．画面下部のボタンから，設定項目を探してみてください．"
                ]
            }
        ]
    },
    {
        type: "content",
        tagName: "div",
        classNames: ["kakizome--setting--section"],
        contents: [
            {
                type: "content",
                tagName: "h2",
                contents: ["免責事項"]
            },
            {
                type: "content",
                tagName: "p",
                contents: ["このWebアプリでは，利用者の閲覧履歴や属性といった利用者の個人情報を一切入手しません．また，利用者がこのWebアプリを利用して作成した作品を，このWebアプリを経由して取得したり，サーバーに保存したりすることもございません．"]
            },
            {
                type: "content",
                tagName: "p",
                contents: ["作品をダウンロードし，SNSなどで共有する場合は，公序良俗に反することのないように，ご配慮をお願いいたします．"]
            },
            {
                type: "content",
                tagName: "p",
                contents: ["このWebアプリを使用したことにより，利用者が何らかの損害やトラブルに巻き込まれた場合であっても，このWebアプリの管理者は一切の責任を負うことができません．あらかじめご了承ください．"]
            }
        ]
    },
];
const penSettings = [
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
                        contents: [brushImg]
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
                        contents: [penImg]
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
    }
];
const paperSettings = [
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
                        contents: ["Hanshi (000x000)"]
                    },
                    {
                        type: "content",
                        tagName: "span",
                        classNames: ["ja"],
                        contents: ["半紙 (000x000)"]
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
                        contents: ["Saitama Style (000x000)"]
                    },
                    {
                        type: "content",
                        tagName: "span",
                        classNames: ["ja"],
                        contents: ["埼玉判 (000x000)"]
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
    constructor(dialog, dialogOpener) {
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
    initDialog() {
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
    resetDialog() {
        while (this.dialogContent.firstChild) {
            this.dialogContent.removeChild(this.dialogContent.firstChild);
        }
    }
    openDialog(ev) {
        this.dialog.showModal();
    }
    closeDialog(ev) {
        this.dialog.classList.add('dialog--closing');
        setTimeout(() => {
            this.resetDialog();
            this.dialog.classList.remove('dialog--closing');
            this.dialog.close();
        }, 250);
    }
    get dialogHeaderEN() {
        return this._dialogHeaderEN;
    }
    get dialogHeaderJA() {
        return this._dialogHeaderJA;
    }
    get dialogCloser() {
        return this._dialogCloser;
    }
    get dialogContent() {
        return this._dialogContent;
    }
    init() {
        this.initDialog();
        Array.from(this.dialogOpener).forEach((item) => {
            if (item instanceof HTMLElement) {
                item.addEventListener('click', this.openDialog);
            }
        });
        this.dialogCloser.addEventListener('click', this.closeDialog);
    }
}
export default class Settings extends Dialog {
    constructor(draw, dialog, dialogOpener) {
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
            }
        };
        this.setupDialog = this.setupDialog.bind(this);
        this.downloadCreatedImg = this.downloadCreatedImg.bind(this);
        this.initSettings();
    }
    appendDialogContentItem(item) {
        let element = null;
        switch (item.type) {
            case "content":
                element = document.createElement(item.tagName);
                if (item.id)
                    element.id = item.id;
                if (item.classNames)
                    element.classList.add(...item.classNames);
                if (item.src && element instanceof HTMLImageElement)
                    element.src = item.src;
                if (!item.contents)
                    return;
                for (const content of item.contents) {
                    if (typeof content === "string") {
                        element.appendChild(document.createTextNode(content));
                    }
                    else if (content instanceof HTMLImageElement) {
                        element.appendChild(content);
                    }
                    else {
                        const child = this.appendDialogContentItem(content);
                        if (child)
                            element.appendChild(child);
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
    onChangeSettingValue(ev) {
        const target = ev.target;
        if (target instanceof HTMLInputElement && (target.checked || target.type === "range")) {
            const targetName = target.name;
            if (targetName === "brush-size") {
                this.draw.editableSettings[targetName] = parseInt(target.value, 10);
            }
            else if (targetName === "paper-size") {
                const size = {
                    "hanshi": { w: 953, h: 1311 },
                    "saitama": { w: 1024, h: 3071 },
                    "16-9": { w: 720, h: 1280 }
                };
                const sizeName = target.value;
                this.draw.editableSettings[targetName] = target.value;
                this.draw.canvas.dataset.size = target.value;
                this.draw.canvas.width = size[sizeName].w;
                this.draw.canvas.height = size[sizeName].h;
            }
            else {
                this.draw.editableSettings[targetName] = target.value;
            }
        }
    }
    appendDialogSettingItem(item) {
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
        const name = item.name;
        const nowValue = this.draw.editableSettings[name];
        switch (item.type) {
            case "checkbox":
            case "radio":
                if (item.media)
                    itemWrapper.classList.add('kakizome--setting--section--item--wrapper--row');
                for (const inputItem of item.items) {
                    const inputWrapper = document.createElement('div');
                    inputWrapper.classList.add('kakizome--setting--section--item');
                    const inputEl = document.createElement('input');
                    inputEl.type = item.type;
                    inputEl.name = item.name;
                    inputEl.id = `${item.name}-${inputItem.value}`;
                    inputEl.value = inputItem.value;
                    inputEl.checked = (nowValue === inputItem.value);
                    inputEl.classList.add(`kakizome--${item.type}`);
                    inputEl.addEventListener('change', this.onChangeSettingValue.bind(this));
                    const label = document.createElement('label');
                    label.htmlFor = `${item.name}-${inputItem.value}`;
                    for (const labelItem of inputItem.label) {
                        const labelContent = this.appendDialogContentItem(labelItem);
                        if (labelContent)
                            label.appendChild(labelContent);
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
                if (item.step)
                    range.step = item.step.toString();
                range.addEventListener('change', this.onChangeSettingValue.bind(this));
                inputWrapper.appendChild(range);
                itemWrapper.appendChild(inputWrapper);
            default:
                break;
        }
        element.appendChild(itemWrapper);
        return element;
    }
    setupDialog(ev) {
        const target = ev.target;
        if (target instanceof HTMLElement && target.dataset.dialog) {
            const settings = this.settingsList[target.dataset.dialog];
            this.dialogHeaderEN.innerText = settings.title.en;
            this.dialogHeaderJA.innerText = settings.title.ja;
            for (const item of settings.items) {
                const element = this.appendDialogContentItem(item);
                if (element)
                    this.dialogContent.appendChild(element);
            }
        }
    }
    createImg(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = new Image;
            image.src = ctx.canvas.toDataURL("image/png");
            return image;
        });
    }
    downloadImg(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const link = document.createElement('a');
            link.href = ctx.canvas.toDataURL("image/png");
            link.download = "hoge.png";
            link.click();
        });
    }
    downloadCreatedImg() {
        return __awaiter(this, void 0, void 0, function* () {
            const background = document.createElement('canvas');
            background.width = this.draw.canvas.width;
            background.height = this.draw.canvas.height;
            const ctx_background = background.getContext('2d');
            if (ctx_background) {
                ctx_background.fillStyle = "white";
                ctx_background.fillRect(0, 0, background.width, background.height);
                const image = document.createElement('canvas');
                image.width = this.draw.canvas.width;
                image.height = this.draw.canvas.height;
                const ctx_image = image.getContext('2d');
                if (ctx_image) {
                    ctx_image.drawImage(yield this.createImg(ctx_background), 0, 0);
                    if (this.draw.ctx) {
                        ctx_image.drawImage(yield this.createImg(this.draw.ctx), 0, 0);
                        yield this.downloadImg(ctx_image);
                    }
                }
            }
        });
    }
    initSettings() {
        Array.from(this.dialogOpener).forEach(element => {
            if (element instanceof HTMLElement) {
                element.addEventListener('click', this.setupDialog);
            }
        });
    }
}
