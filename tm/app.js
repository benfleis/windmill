Ext.Loader.setConfig({
    enabled: true,
});

Ext.application({
    name: 'TouchMill',

    models: ['Team'],
    views: ['Viewport', 'Home', 'Team',],
    controllers: ['Main',],

    launch: function() {
        Ext.create('TouchMill.view.Viewport');
        /*
        Ext.create('Ext.tab.Panel', {
            fullscreen: true,
            tabBarPosition: 'bottom',

            items: [
                {
                    xtype: 'nestedlist',
                    title: 'Blog',
                    iconCls: 'star',
                    displayField: 'title',

                    store: {
                        type: 'tree',

                        fields: [
                            'title', 'link', 'author', 'contentSnippet', 'content',
                            {name: 'leaf', defaultValue: true},
                        ],

                        root: {
                            leaf: false,
                        },

                        proxy: {
                            type: 'jsonp',
                            url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://rss.slashdot.org/Slashdot/slashdot',
                            //url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://feeds.feedburner.com/SenchaBlog',
                            reader: {
                                type: 'json',
                                rootProperty: 'responseData.feed.entries',
                            },
                        },
                    },

                    detailCard: {
                        xtype: 'panel',
                        scrollable: true,
                        styleHtmlContent: true,
                    },

                    listeners: {
                        itemtap: function(nestedList, list, index, elt, post) {
                            this.getDetailCard().setHtml(post.get('content'));
                        },
                    },
                },

                {
                    title: 'Contact',
                    iconCls: 'user',
                    xtype: 'formpanel',
                    url: 'contact.php',
                    layout: 'vbox',

                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Contact Us',
                            instructions: '(email address is optional)',
                            items: [
                                { xtype: 'textfield', label: 'Name', },
                                { xtype: 'emailfield', label: 'Email', },
                                { xtype: 'textareafield', label: 'Message', },
                            ],
                        },
                        {
                            xtype: 'button',
                            text: 'Send',
                            ui: 'confirm',
                            handler: function() { this.up('formpanel').submit(); },
                        },
                    ],
                },
            ],
            //dockedItems: [{xtype:'toolbar', title:'Windmill Windup'}],
        });
      */
    },
});
