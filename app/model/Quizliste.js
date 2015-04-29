Ext.define('ProVita.model.Quizliste', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'txt', type: 'string' },
            { name: 'antwortid', type: 'int' },
            { name: 'ueberschrift', type: 'boolean' },
            { name: 'loesung', type: 'boolean' }
        ]
    }
});
