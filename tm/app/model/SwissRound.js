Ext.define('TouchMill.model.SwissRound', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'id',                   type: 'int' },
            { name: 'round_number',         type: 'int' },
            { name: 'tournament_id',        type: 'int' },
            { name: 'visibility',           type: 'string' },
            { name: 'start_time',           type: 'date', },
            { name: 'time_created',         type: 'date', },
            { name: 'time_last_updated',    type: 'date', },
        ],
    },

});

