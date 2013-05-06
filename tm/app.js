Ext.Loader.setConfig({
    enabled: true,
});

Ext.application({
    name: 'TouchMill',

    models: [ 'Tournament', 'TournamentTeam' ],
    // XXX need to add way to logout, effectively clearing localStorage.TouchMill
    views: [ 'Main', 'Events', 'Games', 'GameView', ],
    controllers: [ 'Main', ],

    launch: function() {
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
        if (session.length === 0 && window.location.origin === 'http://localhost:8080')
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
            if (window.location.hash) {
                // http://stackoverflow.com/questions/1397329/how-to-remove-the-hash-from-window-location-with-javascript-without-page-refresh
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
});
