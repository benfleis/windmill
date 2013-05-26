Ext.define('TouchMill.model.TeamPlayer', {
    extend: 'Ext.data.Model',

    config: {
        hasOne: [
            {
                model: 'TouchMill.model.Team',
                name: 'getTeam',
            },
            {
                model: 'TouchMill.model.Team',
                name: 'getPlayer',
            },
        ],

        fields: [
            { name: 'player_id', },
            { name: 'team_id', },
            { name: 'number', },

            { name: 'is_mine', type: 'boolean', defaultValue: false, },
        ],
    },
});
