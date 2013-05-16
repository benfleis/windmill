//
// Configuration elements.  Put into application.tm_config.
//
// XXX
//
// sencha class system video:
//
// coding convention:
//  Org.group[.subgroup].ClassName
//  one class per file
//  file name matches class name [Org.view.ClassName -> Org/view/ClassName.js]
//
// class definition:
//  Ext.define('My.sample.Person', {
//      constructor: function(name) { this.name = name; },
//      walk: function(steps) { alert('walking ' + steps + ' steps.';); },
//  }
//  var tommy = new My.sample.Person('tommy');
//  tommy.walk(5);
//
// class 'config' objects automatically gets getFoo() and setFoo() funcs, for
// every child
//
// when using setFoo(), applyFoo() is called before set - for validation,
// transformation, etc.; similarly updateFoo() gets called after its set, for
// notification, etc.
//
var _config = {
    servers: {
        'real': {
            app_url: 'http://monkey.org/~ben/tm/real.html',
            client_id: 'ec72ad44ea54d9af1d38d56f41a738',
            client_key: '83f6273168fd588a65af52259369ef',
            login_url: 'http://leaguevine.com/oauth2/authorize/?client_id=ec72ad44ea54d9af1d38d56f41a738&scope=universal&response_type=token&redirect_uri=http://monkey.org/~ben/tm/real.html',
            api_url: 'http://api.leaguevine.com/v1',
            tournament_ids: '[18091,18093,18094]',
            // XXX this will come from user
            access_token: '91bd68e2a1'
        },
        'play': {
            app_url: 'http://monkey.org/~ben/tm/play.html',
            client_id: '4836b4afe7458d0bbeb43f593a7e89',
            login_url: 'http://playwithlv.com/oauth2/authorize/?client_id=4836b4afe7458d0bbeb43f593a7e89&scope=universal&response_type=token&redirect_uri=http://monkey.org/~ben/tm/play.html',
            api_url: 'http://api.playwithlv.com/v1',
            tournament_ids: '[18091,18093,18094]',
            // XXX comes from user
            access_token: 'a042642c0f',
        },
        'local': {
            app_url: 'http://localhost:8080/local.html',
            client_id: 'FAKE',
            login_url: null,
            api_url: null,
            tournament_ids: '',
        },
    },
};

var _util = {
    setup_server_config: function(server_config) {
        console.log('IN setup_server_config(' + server_config + ')');
        Ext.getStore('Tournaments').config.proxy.extraParams.tournament_ids = '[18091]';
        Ext.getStore('Tournaments').load();
    },
};


Ext.Loader.setConfig({
    enabled: true,
});

// XXX need to add way to logout, effectively clearing localStorage.TouchMill
Ext.application({
    name: 'TouchMill',

    models: [ 'Event', 'Tournament', ], //'TournamentTeam' ],
    views: [ 'Main', 'Events', 'Tournaments', 'Games', 'GameView', 'DevConfig', ],
    controllers: [ 'Main', ],
    stores: [ 'Events', 'Tournaments', ],

    launch: function() {
        // setup first
        TouchMill.app.util.setup_server_config(serverConfig);

        // local storage debugging:
        window.addEventListener('storage', function(evt) {
            if (evt.key === null)
                console.log('localStorage.clear()d');
            else if (evt.newValue === null)
                console.log('localStorage.removeItem(' + evt.key + ')');
            else {
                console.log('localStorage.setItem(' + evt.key + ')');
                console.log(evt.newValue);
            }
        }, false);

        // check if access token is available; if not redir to LV login
        var logged_in = false;
        var url_params = Ext.Object.fromQueryString(window.location.search.substring(1));
        var hash_params = Ext.Object.fromQueryString(window.location.hash.substring(1));
        var session = JSON.parse(localStorage.getItem('TouchMill')) || {};

        // XXX debug hack for localhost testing
        var debug = !!url_params.debug;
        if (window.location.origin === 'http://localhost:8080')
            hash_params = { access_token: '9944451a27', expires_in: 60 * 60 * 24 * 365 * 5, scope: 'universal', };

        if (url_params.logout) {
            session = {};
            localStorage.removeItem('TouchMill');
        }
        else if (hash_params.access_token) {
            session.lv_token = hash_params.access_token;
            session.lv_expiration = Date.now() + (hash_params.expires_in * 1000);
            session.lv_scope = hash_params.scope;
            localStorage.setItem('TouchMill', JSON.stringify(session));
        }
        logged_in = session.lv_token && (Date.now() < (session.lv_expiration || 0));

        if (logged_in) {
            if (window.location.hash && window.location.hash.search('access_token=') != -1) {
                // remove trailing hash IFF it contains LV info; not sure how
                // this will complicate using routes in Touch.
                var l = window.location;
                history.replaceState('', document.title, l.pathname + l.search);
            }
            Ext.create('TouchMill.view.Main');
        }
        else {
            if (!url_params.dont_login)
                window.open('http://playwithlv.com/oauth2/authorize/?client_id=4836b4afe7458d0bbeb43f593a7e89&scope=universal&response_type=token&redirect_uri=http://monkey.org/~ben/tm/index.html', '_self')
        }
    },

    // --------------------------------------------------------------------------
    // application wide variables here
    //
    config: _config,
    util: _util,
});
