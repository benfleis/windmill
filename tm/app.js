Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,      // false == disable "disable caching" -- confusing, yes.  in production, flip.
    paths: {
        'TouchMill': 'app',
        //'Ext.ux.proxy': 'app/ux/proxy',
    },
});

// kill HTTP OPTIONS requests: // http://stackoverflow.com/questions/10236056/when-loading-a-store-in-sencha-touch-2-how-can-i-stop-the-additional-options-ht
Ext.Ajax.setUseDefaultXhrHeader(false);

// XXX need to add way to logout, effectively clearing localStorage.TouchMill
Ext.application({
    name: 'TouchMill',

    // requires that are used all around
    requires: [ 'TouchMill.data.proxy.ConfigurableRest', 'TouchMill.util.Config', ], //'Ext.ux.proxy.ProxyCache', ],

    models: [
        'Event', 'Tournament', 'TournamentTeam', 'Team', 'Game', 'GameScore', 'SpiritScore', 'TeamPlayer',
        'Player', 'SwissStanding', 'SwissRound',
    ],

    stores: [
        'Events', 'Tournaments', 'TournamentTeams', 'Teams', 'Games', 'GameScores', 'TeamPlayers', 'Players',
        'Me', 'SwissRounds', 'SwissStandings',
    ],

    views: [
        'Main', 'EventList', 'TournamentNavigator', 'TournamentList', 'TeamList', 'game.List', 'game.Details',
        'standing.Navigator', 'standing.RoundList', 'standing.StandingList', 'Stream', 'Login', 'Logout', 'DevConfig',
    ],

    controllers: [ 'Main', 'Tournaments', 'Standings', ],

    launch: function() {
        // load base config first
        Config.loadActive(serverConfig);
        Config.loadSession();

        // check if access token is available; if not redir to LV login
        var urlParams = Ext.Object.fromQueryString(window.location.search.substring(1));
        var hashParams = Ext.Object.fromQueryString(window.location.hash.substring(1));

        // XXX if there's a login error, stop here o/w we descend into infinite loop
        if (hashParams.error) {
            console.log('Login error: ' + hashParams.error + '; ' + hashParams.error_description);
            Ext.Msg.alert('Login error: ' + hashParams.error + '; ' + hashParams.error_description);
        }

        if (urlParams.logout) {
            Config.clearSession();
        }
        else {
            if (serverConfig === 'local' && urlParams.login_debug) {
                Config.loadDebugSession();
                urlParams = Config.session.urlParams;
                hashParams = Config.session.hashParams;
            }
            else if (hashParams.access_token) {
                Config.session.urlParams = urlParams;
                Config.session.hashParams = hashParams;
                Config.storeSession();
            }
            if (hashParams.expires_in && hashParams.access_token) {
                expiration = Date.now() + (hashParams.expires_in * 1000);
                if (hashParams.access_token && Date.now() >= expiration)
                    Config.clearSession();
            }
        }

        // replace browser URL with clean version - remove trailing hash
        // IFF it contains LV info; will this complicate using routes?
        if (window.location.hash && window.location.hash.search('access_token=') != -1) {
            var l = window.location;
            //history.replaceState('', document.title, l.pathname + l.search);
        }
        Config.mergeActive({ apiParams: { access_token: hashParams.access_token } });
        this.getController('Main').loadInitialData();
        Ext.create('TouchMill.view.Main');
    },
});
