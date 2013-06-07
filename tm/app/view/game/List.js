Ext.define('TouchMill.view.game.List', {
    extend: 'Ext.List',
    xtype: 'gameList',

    config: {
        title: 'Games',
        store: 'Games',
        itemTpl: [
            '{team_1_short_name} vs. {team_2_short_name}<br/><small>{start_time} @ {game_site_id}</small>',
        ],
    },
});


