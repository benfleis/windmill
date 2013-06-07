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

    mask: function() { this.getTournamentNavigator().setMasked({ xtype: 'loadmask', message: 'Loading...' }); },
    unmask: function() { this.getTournamentNavigator().unmask(); },

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
        this.mask();
        var gamesView = Ext.create('TouchMill.view.Games');
        var teamId = team.get('id');
        gamesView.getStore().clearFilter();
        gamesView.getStore().loadByTeamId(team.get('id'), {
            scope: this,
            callback: function() {
                this.unmask();
                this.getTournamentNavigator().push(gamesView);
            },
        });
    },

    onSelectGame: function(list, idx, item, game, evt) {
        this.mask();
        var loaded = 0;
        var maybePushGameView = function() {
            if (++loaded == 2) {
                game.stitchAssociations();
                var gameView = Ext.create('TouchMill.view.GameView', { record: game });
                this.unmask();
                this.getTournamentNavigator().push(gameView);
            }
        }.bind(this);

        game.gameScores().load({
            params: { game_id: game.get('id'), limit: 1, },
            scope: this,
            callback: function(gameScores) {
                console.log('LOADED gameScores from ' + game.get('id'));
                console.log(game.gameScores());
                maybePushGameView();
            },
        });
        game.spiritScores().load({
            params: { game_id: game.get('id'), limit: 1, },
            scope: this,
            callback: function(spiritScores) {
                console.log('LOADED spiritScores from ' + game.get('id'));
                console.log(game.spiritScores());
                maybePushGameView();
            },
        });
    },

    onTapSubmitScore: function() {
        this.mask();
        var gameView = this.getGameView();
        var vals = gameView.getGameScoreValues();
        var gameScore = Ext.create('TouchMill.model.GameScore', vals)
        Config.addAuthorizationHeaderToProxy(gameScore.getProxy());
        gameScore.save({
            failure: function(gs, operation) {
                // can I inspect the operation and log the failure?  email it?
                // post it?
                console.log('GameScore save failed!');
                this.unmask();
                Ext.Msg.alert('Submit FAILED', 'Find a Windmill Tech Nerd and ask for help!');
            }.bind(this),
            success: function() {
                var game = gameView.getRecord();
                game.set('game_score_team_1', vals.team_1_score);
                game.set('game_score_team_2', vals.team_2_score);
                game.set('game_score_is_final', vals.is_final);
                this.unmask();
                gameView.showViewScore();
            }.bind(this),
        });
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
