const emitter = require("mEmitter");
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {},

    handleClickPlay(){
        emitter.instance.emit("playGame");
    },

    handleClickRank(){
        emitter.instance.emit("showRank");
    },

    start () {

    },

    // update (dt) {},
});
