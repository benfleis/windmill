Ext.define('TouchMill.view.Games', {
    extend: 'Ext.navigation.View',
    xtype: 'v_games',
    requires: [
        'TouchMill.view.GamesList',
        'TouchMill.view.GameView',
    ],

    config: {
        title: 'Games',
        iconCls: 'calendar2',
        items: [
            {
                xtype: 'v_games_list',
                store: {
                    fields: [ 'game_id', 'team_1', 'team_2', 'time', 'location'],
                    data: [
                        { game_id: 0, team_1: 'Lotus', team_2: 'Primavera', time: 'Today, 14:00', location: 'Field 12', },
                        { game_id: 1, team_1: 'Lotus', team_2: 'Viita', time: 'Today, 18:00', location: 'Field 2', },
                    ],
                },
            }
        ],
    },
});

