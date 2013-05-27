Ext.Loader.setConfig({ enabled: true, });

Ext.application({
    name: 'TouchMill',

    models: [ 'Game', 'GameScore', ],
    stores: [ 'Games', 'GameScores', ],
    views: [ 'Games', 'GameView', 'GamesList', ],
    controllers: [ 'Games', ],

    launch: function() {
        this.getController('Games').loadInitialGames();
        Ext.create('TouchMill.view.Main');
    },
});

// ----------------------------------------------------------------------------

Ext.define('TouchMill.model.Game', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'id', },                        //": 74181,
            { name: 'team_1_id', },                 //": 19098,
            { name: 'team_2_id', },                 //": 19083,
        ],

        proxy: {
            type: 'rest',
            url: 'http://api.playwithlv.com/v1/games/',
            reader: { type: 'json', rootProperty: 'objects', },
        },

        hasMany: {
            model: 'TouchMill.model.GameScore',
            name: 'gameScores',
            autoLoad: true,
            store: {
                model: 'TouchMill.model.GameScore',
                proxy: {
                    type: 'rest',
                    url: 'http://api.playwithlv.com/v1/game_scores/',
                    reader: { type: 'json', rootProperty: 'objects', },
                },
            },
        },
    },
});

Ext.define('TouchMill.model.GameScore', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'game_id', },                   //": 28582,
            { name: 'team_1_score', },              //": 8,
            { name: 'team_2_score', },              //": 9,
            { name: 'is_final', },                  //": true,
            { name: 'id', },                        //": 27903,
        ],
    },
});

// ----------------------------------------------------------------------------


Ext.define('TouchMill.store.Games', {
    extend: 'Ext.data.Store',

    config: {
        model: 'TouchMill.model.Game',
    },

    loadByTeamId: function(team_id, opts) {
        console.log('Games.loadByTeamId(' + team_id + ')');
        opts = opts || {};
        opts.params = { team_ids: [team_id] };
        this.load(opts);
    },
});


Ext.define('TouchMill.store.GameScores', {
    extend: 'Ext.data.Store',

    config: {
        model: 'TouchMill.model.GameScore',
    },

    loadByGameId: function(game_id, opts) {
        opts = opts || {};
        opts.params = { game_id: game_id };
        this.load(opts);
    },
});

// ----------------------------------------------------------------------------

Ext.define('TouchMill.controller.Games', {
    extend: 'Ext.app.Controller',

    requires: [ 'TouchMill.view.GameView', 'TouchMill.view.GamesList', 'TouchMill.view.Games', ],

    config: {
        refs: { games: 'games', gamesList: 'gamesList', gameView: 'gameView', },
        control: {
            gamesList: { itemtap: 'onGameSelect', },
        },
    },

    loadInitialGames: function() {
        Ext.getStore('Games').load({
            params: { tournament_id: '18093', team_ids: '[19083]', },
            scope: this,
            callback: function() {
                Ext.create('TouchMill.view.Games');
            }
        });
    },

    onGameSelect: function(list, idx, item, rec, evt) {
        var gameView = this.getGameView();
        if (!gameView)
            gameView = Ext.create('TouchMill.view.GameView');

        gameView.setRecord(rec);
        /*
        Ext.getStore('GameScores').load({
            params: { game_id: rec.data.id, },
            scope: this,
            callback: function() {
                console.log(rec.gameScores());
                //gameView.setMasked(false);
            }
        });
        */
        gameView.setMasked(true);
        rec.gameScores().load({
            params: { game_id: rec.data.id, },
            scope: this,
            callback: function() {
                console.log(rec.gameScores().getRange());
                gameView.setMasked(false);
            },
        });
        this.getGames().push(gameView);
    },
});

// ----------------------------------------------------------------------------

Ext.define('TouchMill.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',

    config: {
        fullscreen: true,
        tabBar: { layout: { pack: 'center', align: 'center', }, },
        tabBarPosition: 'top',
        items: [ { xtype: 'games', }, ],
    }
});

Ext.define('TouchMill.view.Games', {
    extend: 'Ext.navigation.View',
    xtype: 'games',
    requires: [ 'TouchMill.view.GamesList', 'TouchMill.view.GameView', ],

    config: {
        iconCls: 'calendar2',
        items: [
            { xtype: 'gamesList', },
        ],
    },
});

Ext.define('TouchMill.view.GamesList', {
    extend: 'Ext.List',
    xtype: 'gamesList',

    config: {
        title: 'My Games',
        store: 'Games',
        itemTpl: '{team_1_id} vs. {team_2_id}<br/><small>{start_time} @ {game_site_id}</small>',
    },
});

Ext.define('TouchMill.view.GameView', {
    extend: 'Ext.Container',
    xtype: 'gameView',

    config: {
        title: 'Game Summary',
        record: null,
        tpl: '<h1>id: {id}</h1><h1>{team_1_id} vs. {team_2_id}</h1>{gameScores()}',
    },
});


