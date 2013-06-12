Ext.define('TouchMill.util.Config', {
    singleton: true,
    alternateClassName: ['Config'],

    // ------------------------------------------------------------------------

    constructor: function() {
        return this.loadActive();
    },

    active: {},

    // type in { null, 'production', 'play', 'local' }, where production
    // uses static data and real league vine, play uses static data;
    // anything sent in to overrides will override!
    loadActive: function(type, overrides) {
        var active = Ext.Object.merge({}, this.default);
        if (type && type !== 'default') {
            Ext.Object.merge(active, this[type], overrides || {});
            active.apiLoginUrl += '&client_id=' + active.apiClientId + '&redirect_uri=' + active.appUrl;
        }
        active.dynamicBaseUrl = active.apiUrl;
        this.active = active;
        console.log('Config.load(' + type + ', ' + overrides + ')');
        return this;
    },

    mergeActive: function(overrides) {
        Ext.Object.merge(this.active, overrides || {});
    },

    // ------------------------------------------------------------------------

    // there are 3 vars stored in session atm, all coming back from LV auth
    // (named differently there): apiToken, apiExpiration, apiScope,
    loadSession: function() {
        this.session = JSON.parse(localStorage.getItem('TouchMill.session')) || {};
    },

    storeSession: function() {
        localStorage.setItem('TouchMill.session', JSON.stringify(this.session));
    },

    clearSession: function() {          // empties session both in Config and in localStorage.
        localStorage.removeItem('TouchMill.session');
        this.session = {};
    },

    loadDebugSession: function() {      // inserts debugging session for localhost work
        this.loadSession();
        this.session.urlParams = {};
        this.session.hashParams = {
            access_token:       '474ffcfcbc',
            token_type:         'bearer',
            expires_in:         1526456781664,
            scope:              'universal',
        };
    },

    // is somebody logged in?
    sessionIsLoggedIn: function() {
        return !!(this.session && this.session.hashParams && this.session.hashParams.access_token);
    },

    // ------------------------------------------------------------------------

    addAuthorizationHeaderToProxy: function(proxy) {
        var hp = this.session.hashParams;
        proxy.setHeaders(_.merge(proxy.getHeaders(),
            { Authorization: hp.token_type + ' ' + hp.access_token }
        ));
    },

    // ------------------------------------------------------------------------

    default: {
        appUrl:             null,                   // where does this app live?  Needed if using LV auth redirect
        apiUrlBase:         null,                   // normal LV rest url base
        apiClientId:        null,
        apiLoginUrl:        null,

        apiParams: {                                // passed directly to REST API
            access_token:       null,
            limit:              200,
        },

        useStaticUrls:      true,                   // where appropriate, use static data instead of LV data
        staticUrlBase:      'static/data/2013/',    // static/cached LV rest url base
        tournamentIds:      [],
    },

    production: {
        useStaticUrls:      true,

        appUrl:             'http://m.windmillwindup.com/',
        apiUrlBase:         'https://api.leaguevine.com/v1/',
        apiClientId:        'ec72ad44ea54d9af1d38d56f41a738',
        apiLoginUrl:        'http://leaguevine.com/oauth2/authorize/?scope=universal&response_type=token',
        apiLogoutUrl:       'http://www.playwithlv.com/users/logout/?next=',
    },

    play: {
        useStaticUrls:      true,

        appUrl:             'http://m.windmillwindup.com/play.html',
        apiUrlBase:         'http://api.playwithlv.com/v1/',
        apiClientId:        'ec72ad44ea54d9af1d38d56f41a738',
        apiLoginUrl:        'http://playwithlv.com/oauth2/authorize/?scope=universal&response_type=token',
        apiLogoutUrl:       'http://www.playwithlv.com/users/logout/?next=',

        tournamentIds:      [ 19176, 19178, 19177, ],
        //tournamentIds:      [ 18091, 18093, 18094, ],   // XXX playwithlv.com for 2012
    },

    local: {
        useStaticUrls:      true,

        appUrl:             'http://local.appUrl/not/used',
        apiUrlBase:         'http://api.playwithlv.com/v1/',
        apiClientId:        'ec72ad44ea54d9af1d38d56f41a738',
        apiLoginUrl:        'http://local.apiLoginUrl/not/used',
        apiLogoutUrl:       'http://local.apiLoginUrl/not/used/?next=',

        tournamentIds:      [ 19176, 19178, 19177, ],
        //tournamentIds:      [ 18091, 18093, 18094, ],   // XXX playwithlv.com for 2012
    },

    test: {
        useStaticUrls:      false,

        appUrl:             'http://m.windmillwindup.com/test.html',
        apiUrlBase:         'https://api.leaguevine.com/v1/',
        apiClientId:        'ec72ad44ea54d9af1d38d56f41a738',
        apiLoginUrl:        'http://leaguevine.com/oauth2/authorize/?scope=universal&response_type=token',
        apiLogoutUrl:       'http://www.playwithlv.com/users/logout/?next=',

        tournamentIds:      [ 19284, 19292, 19290, ],
        //tournamentIds:      [ 18091, 18093, 18094, ],   // XXX playwithlv.com for 2012
    },

});
