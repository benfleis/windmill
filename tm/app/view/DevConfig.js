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
            // toggles, buttons, etc. for dev specific crap.
            {
                xtype: 'fieldset',
                items: [
                    {
                        xtype: 'togglefield',
                        name: 'use_live_data',
                        label: 'Live Data?',
                        value: localStorage.getItem('TouchMill').use_live_data,
                    },
                ],
            },
        ],
    },
});


