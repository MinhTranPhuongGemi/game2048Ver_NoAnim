const Emitter = require("mEmitter");
const COLOR = require("Color");

cc.Class({
    extends: cc.Component,

    properties: {
        _handleMoveDown: null,
        _handleMoveUp: null,
        _handleMoveLeft: null,
        _handleMoveRight: null,
        _arrBlocks: [],
        gameBoard: {
            default: null,
            type: cc.Node
        },
        card: {
            default: null,
            type: cc.Prefab
        },
        _canPress: false,
        newValue: null,
        arrAnim: [],
    },

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.handleKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.handleKeyUp, this);
        this.createCard();
        this.randomCard();
    },

    handleKeyUp(evt) {
        switch (evt.keyCode) {
            case cc.macro.KEY.up:
            case cc.macro.KEY.down:
            case cc.macro.KEY.left:
            case cc.macro.KEY.right:
                this._canPress = false;
                this.randomCard();
                break;
            default:
                break;
        }
    },

    handleKeyDown(evt) {
        if (this._canPress) return;
        this._canPress = true;
        switch (evt.keyCode) {
            case cc.macro.KEY.up:
                this.moveUp();
                break;
            case cc.macro.KEY.down:
                this.moveDown();
                break;
            case cc.macro.KEY.left:
                this.moveLeft();
                break;
            case cc.macro.KEY.right:
                this.moveRight();
                break;
            default:
                break;
        }
    },

    moveUp() {
        for (let col = 0; col < 4; col++) {
            let flatArrCard = [0, 0, 0, 0];
            for (let row = 0; row < 4; row++) {
                flatArrCard[row] = this._arrBlocks[row][col];
            }
            this.handle(flatArrCard)
        }
    },
    moveDown() {
        for (let col = 0; col < 4; col++) {
            let flatArrCard = [0, 0, 0, 0];
            for (let row = 0; row < 4; row++) {
                flatArrCard[row] = this._arrBlocks[row][col];
            }
            this.handle(flatArrCard.reverse())

        }
    },

    moveLeft() {
        for (let row = 0; row < 4; row++) {
            let flatArrCard = [0, 0, 0, 0];
            for (let col = 0; col < 4; col++) {
                flatArrCard[col] = this._arrBlocks[row][col];
            }
            this.handle(flatArrCard)
        }
    },


    moveRight() {
        for (let row = 0; row < 4; row++) {
            let flatArrCard = [0, 0, 0, 0];
            for (let col = 0; col < 4; col++) {
                flatArrCard[col] = this._arrBlocks[row][col];
            }
            this.handle(flatArrCard.reverse())
        }
    },

    handle(arrCard) {
        let mergeCardTrue = [];
        for (let i = 1; i < arrCard.length; i++) {
            if (arrCard[i].opacity == 0) {
                continue;
            }
            let checkCompare = false;
            for (let j = i - 1; j >= 0; j--) {
                if (checkCompare == true) {
                    j = -1;
                    break;
                }
                checkCompare = this.changeValueCards(arrCard, i, j, mergeCardTrue);
            }
        }
    },

    changeValueCards(arrCard, i, j, mergeCardTrue) {
        if (arrCard[j].opacity == 0) {
            return this.compareCardNull(arrCard, i , j);
        }
        else {
            if (arrCard[j].getComponent("card").contentCard.string == arrCard[i].getComponent("card").contentCard.string) {
                return this.compareCardEqual(arrCard, i , j,mergeCardTrue);
            }
            else if (arrCard[j].getComponent("card").contentCard.string != arrCard[i].getComponent("card").contentCard.string) {
                return this.compareCardDifferent(arrCard, i , j);
            }
        }
    },

    compareCardNull(arrCard, i , j) {
        if (j == 0) {
            arrCard[j].getComponent("card").contentCard.string = arrCard[i].getComponent("card").contentCard.string;
            arrCard[i].getComponent("card").contentCard.string = "";
            arrCard[i].opacity = 0;
            arrCard[j].opacity = 255;
            return true;
        }
    },

    compareCardEqual(arrCard, i , j, mergeCardTrue) {
        if (mergeCardTrue.indexOf(j) != -1) {
            let oldJ = j + 1;
            arrCard[oldJ].getComponent("card").contentCard.string = arrCard[i].getComponent("card").contentCard.string;
            arrCard[i].getComponent("card").contentCard.string = "";
            arrCard[i].opacity = 0;
            arrCard[oldJ].opacity = 255;
            return true;
        }
        mergeCardTrue.push(j);
        arrCard[j].getComponent("card").contentCard.string = Number(arrCard[j].getComponent("card").contentCard.string) * 2 + "";
        arrCard[i].getComponent("card").contentCard.string = "";
        arrCard[j].opacity = 255;
        arrCard[i].opacity = 0;
        return true;
    },

    compareCardDifferent(arrCard, i , j) {
        let reValue = j + 1;
        if (reValue != i) {
            arrCard[reValue].getComponent("card").contentCard.string = arrCard[i].getComponent("card").contentCard.string;
            arrCard[i].getComponent("card").contentCard.string = "";
            arrCard[reValue].opacity = 255;
            arrCard[i].opacity = 0;
        }
        return true;
    },

    createCard() {
        for (let col = 0; col < 4; col++) {
            let arrRow = [];
            for (let row = 0; row < 4; row++) {
                let x = -225 + row * 150;
                let y = 225 - col * 150;
                let newCard = cc.instantiate(this.card);
                newCard.parent = this.gameBoard
                newCard.x = x;
                newCard.y = y;
                newCard.width = 140;
                newCard.height = 140;
                newCard.opacity = 0;
                newCard.color = COLOR[0];
                arrRow.push(newCard);
            }
            this._arrBlocks.push(arrRow)
        }
    },

    randomCard() {
        
        let flatArray = this._arrBlocks.flat(Infinity);
        let arrNone = flatArray.filter((value) => {
            return value.opacity == 0;
        })
        let index = Math.floor(Math.random() * arrNone.length)
        let arrRandomNum = [2, 4];
        let num = arrRandomNum[Math.floor(Math.random() * arrRandomNum.length)]
        arrNone[index].getComponent("card").contentCard.string = num;
        arrNone[index].color = COLOR[2];
        arrNone[index].opacity = 255;
    },

    handleMoveDown() {
        // moveCard 
    },

    handleMoveUp() {
        // moveCard
    },

    handleMoveLeft() {
        // moveCard
    },

    handleMoveRight() {
        // moveCard
    },

    start() {

    },

    update(dt) {
    },


});
/////////////////// DEMO //////////////////////////////
