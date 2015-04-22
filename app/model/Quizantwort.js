Ext.define('ProVita.model.Quizantwort', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'id', type: 'int' },
            { name: 'antwort', type: 'string' }
        ]
    }
});
