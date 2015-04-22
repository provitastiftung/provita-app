Ext.define('ProVita.view.Quiz', {
    extend: 'Ext.List',
    alias: 'widget.quiz',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
	'Ext.data.Store'
    ],
    config: {
	fullscreen: true,
	store: quizStore,
	itemTpl: "Frage {id}: {frage}"
    }
});

var quizStore = Ext.create("Ext.data.Store", {
    model: "ProVita.model.Quizfrage",
    proxy: {
        type: "ajax",
        url : "quizfragen.json",
        reader: {
            type: "json",
            rootProperty: "quizfragen"
        }
    },
    autoLoad: true
});

quizStore.load({
    callback: function() {
        var output = [];

        // the user that was loaded
        var frage = quizStore.first();

        output.push("Frage 1: " + frage.get('frage'));

        // iterate over the Orders for each User
        frage.antworten().each(function(antwort) {
            output.push("Antwort " + antwort.get('id') + ": " + antwort.get('antwort'));
        });
	
        Ext.Msg.alert(output.join("<br/>"));
    }
});