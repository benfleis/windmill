Ext.define('TouchMill.controller.Tournaments', {
    extend: 'Ext.app.Controller',

    requires: [
        'TouchMill.view.TournamentNavigator',
        'TouchMill.view.Tournaments',
        'TouchMill.view.Teams',
        'TouchMill.view.Games',
        'TouchMill.view.GameView',
    ],

    // ------------------------------------------------------------------------

    config: {
        refs: {
            tournamentNavigator:            'tournamentnavigator',
            tournaments:                    'tournaments',
            teams:                          'teams',
            games:                          'games',
            gameView:                       'gameView',

            submitScoreButton:              'button[action=submitScore]',
            submitSpiritTeam1Button:        'button[action=submitSpiritTeam1]',
            submitSpiritTeam2Button:        'button[action=submitSpiritTeam2]',
        },

        control: {
            tournaments:                    { itemtap: 'onSelectTournament', },
            teams:                          { itemtap: 'onSelectTeam', },
            games:                          { itemtap: 'onSelectGame', },

            submitScoreButton:              { tap: 'onTapSubmitScore' },
            submitSpiritTeam1Button:        { tap: 'onTapSubmitSpiritTeam1' },
            submitSpiritTeam2Button:        { tap: 'onTapSubmitSpiritTeam2' },
        },
    },

    // ------------------------------------------------------------------------

    onSelectTournament: function(list, idx, item, tourney, evt) {
        // convert tourneyId into teamIds
        var tourneyId = tourney.get('id');
        var teamIds = {};
        Ext.getStore('TournamentTeams').each(function(r) {
            if (r.get('tournament_id') === tourneyId)
                teamIds[r.get('team_id')] = true;
        });
        var teamsView = Ext.create('TouchMill.view.Teams');
        teamsView.getStore().clearFilter();
        teamsView.getStore().filterBy(function(r) { return teamIds[r.get('id')]; });
        this.getTournamentNavigator().push(teamsView);
    },

    onSelectTeam: function(list, idx, item, team, evt) {
        var gamesView = Ext.create('TouchMill.view.Games');
        var teamId = team.get('id');
        gamesView.getStore().clearFilter();
        gamesView.getStore().loadByTeamId(team.get('id'),
            { scope: this, callback: function() { this.getTournamentNavigator().push(gamesView); }, });
    },

    onSelectGame: function(list, idx, item, game, evt) {
        var gameView = this.getGameView();
        if (!gameView) {
            console.log('->  instantiate GameView');
            gameView = Ext.create('TouchMill.view.GameView');
        }

        var loaded = 0;
        var maybePushGameView;
        this.getTournamentNavigator().push(gameView);
        gameView.setMasked({ xtype: 'loadmask', message: 'Loading...' });

        game.gameScores().load({
            params: { game_id: game.data.id, limit: 1, },
            scope: this,
            callback: function(gameScores) {
                console.log('LOADED gameScores!');
                console.log(game.gameScores());
                maybePushGameView();
            },
        });
        game.spiritScores().load({
            params: { game_id: game.data.id, limit: 1, },
            scope: this,
            callback: function(spiritScores) {
                console.log('LOADED spiritScores!');
                console.log(game.spiritScores());
                maybePushGameView();
            },
        });

        maybePushGameView = function() {
            if (++loaded == 2) {
                var items = gameView.getItems();
                var data = game.getData(true);      // binds associated data; I think this should be done some other way, but don't know how/what/where, can't find reference to proper way to do it.
                gameView.setRecord(game);
                items.each(function(i) { i.setRecord(game); }); // really?  shouldn't this automatically get recursively applied?
                //gameView.setRecord(gameview.gameScores.getAt(0));
                gameView.unmask();
            }
        }.bind(this);
    },

    onTapSubmitScore: function() {
        var gameView = this.getGameView();
        var gameScores = gameView.getRecord().gameScores();

        // add header: Authorization: <tok_type> <auth_tok>; this should happen @ startup
        Config.addAuthorizationHeaderToProxy(gameScores.getProxy());

        // add the real thing.  XXX add a popup that says 'uploading' or sth,
        // with the spinner, and doesn't allow any interaction until the upload
        // is confirmed (or failed)
        gameScores.add(gameView.getValues());
        gameScores.sync();
        gameView.hideAddScore();
    },

    //
    // This is a bit trickier.  If they already exist, we need to copy the last
    // set of spirit scores, and override the new values.  That way we don't
    // blow away the spirit scores received by Team2.  So, we must do this merge
    // thing.
    //
    onTapSubmitSpiritTeam1: function() {
        console.log('onTapSubmitSpiritTeam1');
        var gameView = this.getGameView();
        var spiritScores = gameView.getRecord().spiritScores();
        var prevSS = spiritScores.getCount() > 0 ? spiritScores.getAt(0).getData() : {};
        var curSS = gameView.getValues();
        var spirit = Ext.Object.merge({}, prevSS, curSS);
        delete spirit.id;

        Config.addAuthorizationHeaderToProxy(spiritScores.getProxy());
        spiritScores.add(spirit);
        var spiritInst = spiritScores.getAt(1) || spiritScores.getAt(0);
        spiritInst.encodeScores();
        spiritScores.sync();
        gameView.hideAddScore();
    },

    onTapSubmitSpiritTeam2: function() {
        console.log('onTapSubmitSpiritTeam2');
        var gameView = this.getGameView();
        var spiritScores = gameView.getRecord().spiritScores();
        Config.addAuthorizationHeaderToProxy(spiritScores.getProxy());
        spiritScores.add(gameView.getValues());
        spiritScores.sync();
        gameView.hideAddScore();
    },
});
