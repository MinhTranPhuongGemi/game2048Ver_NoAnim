const Emitter = require("mEmitter");
cc.Class({
    extends: cc.Component,

    properties: {
        contentCard: {
            default: null,
            type: cc.Label
        },
        stringCard: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.stringCard = "";
    },

    start() {

    },

    update(dt) {
        //this.stringCard = this.contentCard.string;
    },
});

