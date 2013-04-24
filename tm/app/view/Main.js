Ext.define('TouchMill.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'v_main',

    config: {
        fullscreen: true,

        tabBar: {
            layout: {
                pack: 'center',
                align: 'center',
            },
        },
        tabBarPosition: 'top',
        items: [
            {
                xtype: 'v_events',
                store: {
                    fields: ['name', 'description', 'link'],
                    data: [
                        {name: 'Drinks @ the Bar!', description: 'duh.', link: 'http://www.nl'},
                        {name: 'Opening Ceremony', description: 'Watch Yves give a long boring speech.', link: 'http://www.nl'},
                        {name: 'Showcase Game', description: 'Fearsome Threesome vs. Toes on Fire', link: 'http://www.nl'},
                    ],
                },
            },
            { xtype: 'v_games', },
            {
                xtype: 'v_game_view',
                store: {
                    fields: [ 'game_id', 'team_1', 'team_2', 'time', 'location', 'team_1_game_score', 'team_1_spirit_score', 'team_2_game_score', 'team_2_spirit_score', ],
                    data: [
                        {
                            'game_id': 0, 'time': 'Today, 14:00', 'location': 'Field 12',
                            'team_1': 'Lotus', 'team_1_game_score': 15, 'team_1_spirit_score': 3,
                            'team_2': 'Primavera', 'team_2_game_score': 8, 'team_2_spirit_score': 3,
                        },
                        {
                            'game_id': 1, 'time': 'Today, 18:00', 'location': 'Field 2',
                            'team_1': 'Lotus', 'team_1_game_score': 9, 'team_1_spirit_score': 2,
                            'team_2': 'Viita', 'team_2_game_score': 12, 'team_2_spirit_score': 4,
                        },
                    ],
                },
            },
        ],
    }
});
