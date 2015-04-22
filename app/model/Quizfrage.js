Ext.define('ProVita.model.Quizfrage', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'id', type: 'int' },
            { name: 'frage', type: 'string' },
            { name: 'loesung', type: 'int' }
        ],
	hasMany: {
	    model: "ProVita.model.Quizantwort",
	    name: "antworten"
	}
    }
});
