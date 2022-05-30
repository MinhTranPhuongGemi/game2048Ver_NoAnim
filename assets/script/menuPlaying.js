const Emitter = require("mEmitter");
cc.Class({
    extends: cc.Component,

    properties: {
        _handlePlusPoint: null,
        _handleBestScore: null,
        lblScore: {
            default: null,
            type: cc.Label
        },
        lblBestScore: {
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this._handlePlusPoint = this.handlePlusPoints;
        this._handleBestScore = this.handleBestScore;
        this.registerEvent();
        this.handlePlusPoints(5);
    },

    registerEvent() {
        Emitter.instance.registerEvent("plusPoints", this._handlePlusPoint);
    },

    start() {

    },

    handleClickReload() {
        Emitter.instance.emit("playGame");
        cc.log("reload");
    },

    handleClickSetting() {
        Emitter.instance.emit("showSetting");
        cc.log("show setting");
    },

    handlePlusPoints(newScore) {
        let actions = [cc.delayTime(0.01),
            cc.callFunc(() => { this.lblScore.string = Number(this.lblScore.string) + 1 })];
        this.lblScore.node.runAction(cc.repeat(cc.sequence(actions),newScore ))
    },

    handleBestScore() {
        this.lblBestScore.string  = "best score";
    }

    // update (dt) {},
});
