Ext.define('TouchMill.controller.Games', {
    extend: 'Ext.app.Controller',

    requires: [
        'TouchMill.view.GameView',
        'TouchMill.view.GamesList',
        'TouchMill.view.Games',
    ],

    // ------------------------------------------------------------------------

    config: {
        refs: {
            games: 'games',
            gamesList: 'gamesList',
            gameView: 'gameView',
        },

        control: {
            gamesList: {
                itemtap: 'onGameSelect',
            },
        },
    },

    // ------------------------------------------------------------------------

    onGameSelect: function(list, idx, item, rec, evt) {
        var gameView = this.getGameView();
        if (!gameView) {
            console.log('->  instantiate GameView');
            gameView = Ext.create('TouchMill.view.GameView');
        }

        Ext.getStore('GameScores').load({
            params: { game_id: rec.data.id, limit: 1, },
            scope: this,
            callback: function(recs) {
                var first = recs[0];
                gameView.setRecord(first);
                console.log(rec.gameScores());
                this.getGames().push(gameView);
            }
        });
    },
});
