Ext.define('ProVita.view.Quiz', {
    extend: 'Ext.List',
    alias: 'widget.quiz',
    xtype: 'main',
    config: {
	itemId: 'quizListe',
	fullscreen: true,
	itemTpl: '{txt}',
	data: [{'txt': 'Blah'}],
	variableHeights: true,
	layout: 'fit'
    },
    control: {
	'mainContainer': {
	     itemtap: 'onItemTap'
	}
    },
    onItemTap: function(list, index, target, record, e) {
	var data = [];
	var frage = quizStore.getAt(quizFrageNo);
	data.push({
	    txt: frage.get('frage'),
	    uerberschrift: true,
	});
	console.dir(frage);
        frage.antworten().each(function(antwort) {
	    data.push({
		txt: antwort.get('antwort'),
		antwortid: antwort.get('id'),
		ueberschrift: false,
		loesung: ( antwort.get('id') == frage.get('loesung') )
	    });
        });
	quizFrageNo++;
	
	//this.removeAll(true);
	this.getItems().destroy(true);
	this.setData(data);
    }
});

var quizStore = Ext.create("Ext.data.Store", {
    model: "ProVita.model.Quizfrage",
    autoLoad: true,
    proxy: {
        type: "ajax",
        url : "quizfragen.json",
        reader: {
            type: "json",
            rootProperty: "quizfragen"
        }
    }
});

var quizFrageNo = 0;