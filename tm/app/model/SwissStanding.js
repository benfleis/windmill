Ext.define('TouchMill.model.SwissStanding', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'id',                       type: 'int' },
            { name: 'ranking',                  type: 'int' },
            { name: 'wins',                     type: 'int' },
            { name: 'losses',                   type: 'int' },
            { name: 'swiss_score',              type: 'float' },
            { name: 'swiss_opponent_score_avg', type: 'float' },
            { name: 'team_id',                  type: 'int',        mapping: 'team.id', },
            { name: 'team_name',                type: 'string',     mapping: 'team.name', },
            { name: 'team_short_name',          type: 'string',     mapping: 'team.short_name', },

            // only used when top-8 move to brack or sth, so that new #1 == #9, and should be displayed as such.
            { name: 'ranking_offset',           type: 'int',        defaultValue: 0 },
        ],
    },

});
