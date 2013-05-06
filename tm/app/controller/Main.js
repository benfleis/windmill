Ext.define('TouchMill.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        cls: 'app',

        refs: { games: 'v_games_list' },

        control: {
            'v_games_list': {
                //disclose: function() { this.push_game_view(); },
            }
        },

        push_game_view: function() {
            console.log('asdf');
            this.getGames().push({ xtype: 'v_game_view' });
        },
    },

});
