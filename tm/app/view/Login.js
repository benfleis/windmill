Ext.define('TouchMill.view.Login', {
    extend: 'Ext.form.Panel',
    xtype: 'v_login',

    init: function(component, options, wstitle) {
        console.log('initComponent!');
    },

    config: {
        title: 'Login',
        iconCls: 'block',

        //html: 'Login View',
        items: [
            {
                docked: 'top',
                xtype: 'titlebar',
                title: 'Login',
            },
            {
                xtype: 'fieldset',
                width: 380,
                margin: 'auto',
                items: [
                    {
                        xtype: 'textfield',
                        label: 'Username:',
                        listeners: {
                            keyup: function(fld, e) {
                                // if user hits return button or keyboard-down button
                                if (e.browserEvent.keyCode == 13 || e.browserEvent.keyCode == 10) {
                                    e.stopEvent();
                                    fld.element.dom.blur();     // hide keyboard
                                    window.scrollTo(0,0);       // Scroll to top (for android)
                                    //checkLogin();
                                }
                            },
                        },
                    },
                    {
                        xtype: 'passwordfield',
                        label: 'Password:',
                        listeners: {
                            keyup: function(fld, e) {
                                // if user hits return button or keyboard-down button
                                if (e.browserEvent.keyCode == 13 || e.browserEvent.keyCode == 10) {
                                    e.stopEvent();
                                    fld.element.dom.blur();     // hide keyboard
                                    window.scrollTo(0,0);       // Scroll to top (for android)
                                    //checkLogin();
                                    // FAKE LOGIN XXX
                                    localStorage.setItem('session', {
                                        access_token: 'BINGO',
                                        access_expiration: Date.now() + (60000 * 60 * 24 * 365),
                                        access_scope: 'universal',
                                    });
                                }
                            },
                        },
                    },
                ],
            },
            {
                xtype: 'button',
                itemId: 'loginButton',
                width: 150,
                text: 'Log In',
                margin: '15px auto',
                ui: 'action',
                handler: function() {
                    checkLogin();
                },
            },
        ],
    },

    checkLogin: function() {
        var url_params = Ext.Object.fromQueryString(window.location.search.substring(1));
        var session = localStorage.getItem('session') || {};
        var logged_in = false;
        if (url_params.access_token) {
            session.access_token = url_params.access_token;
            session.access_expiration = Date.now() + (url_params.expires_in * 1000);
            session.access_scope = url_params.scope;
            localStorage.setItem('session', session);
        }
        if (session.access_token && Date.now() < (session.access_expiration || 0)) {
            logged_in = true;
        }
        // (show logged in, and?) redirect based on logged_in status

    },
});
