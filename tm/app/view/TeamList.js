Ext.define('TouchMill.view.TeamList', {
    extend: 'Ext.List',
    xtype: 'teamList',

    config: {
        title: 'Teams',
        store: 'Teams',
        itemTpl: '{name}: <em class="muted"><tpl if="country">(<tpl if="city">{city}, </tpl>{country})</tpl></em>',
    },
});
