Ext.define('TouchMill.view.Games', {
    extend: 'Ext.List',
    xtype: 'games',

    config: {
        title: 'Games',
        store: 'Games',
        itemTpl: '{team_1_id} vs. {team_2_id}<br/><small>{start_time} @ {game_site_id}</small>',
    },
});


