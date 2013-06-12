Ext.define('TouchMill.view.game.List', {
    extend: 'Ext.List',
    xtype: 'gameList',

    config: {
        title: 'Games',
        store: 'Games',
        itemTpl: [
            '<tpl if="team_perspective_id === team_2_id">',
                'vs. {team_1_short_name}',
                '<div>{team_2_score} - {team_1_score}</div>',
            '</tpl>',
            '<tpl if="team_perspective_id === team_1_id">',
                'vs. {team_2_short_name}',
                '<div>{team_1_score} - {team_2_score}</div>',
            '</tpl>',
            ' <div style="rhs"><small>{start_time:date("l H:i")} @ {game_site_name}</small></div>',
        ],
    },
});


