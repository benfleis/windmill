Ext.define('TouchMill.controller.Main', {
    extend: 'Ext.app.Controller',

    init: function() {},

    requires: [ 'TouchMill.view.Login', 'TouchMill.view.Logout', ],

    config: {
        control: {
            '#login': { activate: 'onLoginTap', },
            '#logout': { activate: 'onLogoutTap', },
        },
    },

    // ------------------------------------------------------------------------

    onLoginTap: function() {
        // redir to LV login, which redirs to the app
        window.open(Config.active.apiLoginUrl, '_self');
    },

    onLogoutTap: function() {
        // clear session and reset to clean URL, without urlParams or hashParams
        Config.clearSession();
        window.location.href = window.location.pathname;
    },

    /*
    displayLoginOnly: function() {
        var main = Ext.getCmp('main');
        var items = main.getItems();
        main.remove(items.getAt(items.getCount()), true);
        main.add({ xtype: 'login' });
    },

    displayLogoutOnly: function() {
        var main = Ext.getCmp('main');
        var items = main.getItems();
        main.remove(items.getAt(items.getCount()), true);
        main.add({ xtype: 'logout' });
    },
    */

    // ------------------------------------------------------------------------

    loadInitialData: function() {
        // load chains:
        // Me           -> MyTeamPlayers    -> (below)  -> MyGames
        // Tournaments  -> TournamentTeams  -> Teams
        Ext.getStore('Me').removeAll();
        Ext.getStore('Events').load();
        this.loadTournaments();
        // XXX turn off Me loading for now since it's unused and causes a race
        // with games loading against/before? the team is available in the
        // potentially filtered store.
        //this.loadMe();
    },

    loadTournaments: function() {
        console.log('Main.loadTournaments()');
        Ext.getStore('Tournaments').load(
            { params: { tournament_ids: Config.active.tournamentIds }, callback: this.loadTournamentTeams, scope: this });
    },

    loadTournamentTeams: function() {
        console.log('Main.loadTournamentTeams()');
        Ext.getStore('TournamentTeams').load(
            { params: { tournament_ids: Config.active.tournamentIds }, callback: this.loadTeams, scope: this });
    },

    loadTeams: function() {
        console.log('Main.loadTeams()');
        Ext.getStore('Teams').loadByTournamentTeamsStore({ callback: this.loadMyGames, scope: this });
    },

    loadMe: function() {
        console.log('Main.Me.load()');
        Ext.getStore('Me').load(this.loadMyTeamPlayers, this);
    },

    loadMyTeamPlayers: function() {
        console.log('Main.loadMyTeamPlayers()');
        Ext.getStore('TeamPlayers').loadByPlayerId(
            Ext.getStore('Me').getPlayerId(), { callback: this.loadMyGames, scope: this });
    },

    loadMyGames: function() {
        console.log('try... Main.loadMyGames()');
        if (!Ext.getStore('TeamPlayers').isLoaded() || !Ext.getStore('Teams').isLoaded())
            return;

        console.log('Main.loadMyGames()');
        var my_team_ids = Ext.getStore('Teams').getMyTeamIds();
        var games_store = Ext.getStore('Games');
        // XXX need callback to run only when games for all teams, but we don't
        // expect any 1 player to be on >1 team for the tournament, so ignore
        // this corner case.
        _.map(my_team_ids, function(team_id) {
            games_store.loadByTeamId(team_id, {
                callback: function(recs) { console.log('Games loaded for team_id=' + team_id + ': ' + (recs ? recs.length : 0)); },
                scope: this,
            });
        }.bind(this));
    },
});
