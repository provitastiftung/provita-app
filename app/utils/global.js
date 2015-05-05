Ext.define('ProVita.utils.Global', {
    singleton : true,
    alias : 'widget.global',
    config : {
	quizTreffer: 0
    },
    constructor: function(config) {
        this.initConfig(config);
    }
})