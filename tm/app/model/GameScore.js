Ext.define('TouchMill.model.GameScore', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'id',               type: 'int' },

            // these fields needed for POST; the rest are optional or automatic
            { name: 'game_id',          type: 'int' },
            { name: 'team_1_score',     type: 'int' },
            { name: 'team_2_score',     type: 'int' },
            { name: 'is_final',         type: 'boolean' },

            { name: 'time', },                      //": "2012-06-15T13:23:45.965067+02:00",
            //{ name: 'time_created', },              //": "2012-06-15T11:23:45.965067+00:00",
            { name: 'time_last_updated', },         //": "2012-06-15T11:23:45.965099+00:00",
            { name: 'what_happened', },             //": ""

            //{ name: 'is_mine', type: 'boolean', defaultValue: false, },
        ],

        proxy: {
            type: 'configurableRest',
            url: 'game_scores/',
            extraParams: {
                limit: 1,
                order_by: '[-is_final,-time_last_updated]',
                fields: [
                    'id', /*'game_id',*/ 'team_1_score', 'team_2_score',
                    'is_final', 'time', 'time_last_updated', 'what_happened',
                ],
            },
            reader: { type: 'json', rootProperty: 'objects', },
        },
    },
});
