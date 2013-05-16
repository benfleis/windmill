Ext.define('TouchMill.view.DevConfig', {
    extend: 'Ext.Container',
    xtype: 'v_dev_config',

    requires: [
        'Ext.form.Panel',
        'Ext.field.Toggle',
    ],

    config: {
        iconCls: 'settings',

        xtype: 'formpanel',
        scrollable: true,
        items: [
            // clear session (also implies logout)

            // toggles, buttons, etc. for dev specific crap.
            {
                xtype: 'fieldset',
                items: [
                    {
                        xtype: 'button',
                        name: 'delete_local_storage',
                        text: 'Delete Session',
                        ui: 'Decline',
                        flex: 1,
                        margin: 8,
                    },
                    {
                        xtype: 'togglefield',
                        name: 'use_live_data',
                        label: 'Live Data?',
                        value: localStorage.getItem('TouchMill') && !!localStorage.getItem('TouchMill').use_live_data,
                        // add callback that mod's localStorage
                    },
                ],
            },
        ],
    },
});


