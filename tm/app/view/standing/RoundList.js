Ext.define('TouchMill.view.standing.RoundList', {
    extend: 'Ext.List',
    xtype: 'standingRoundList',

    config: {
        title: 'Swiss Rounds',
        store: 'SwissRounds',
        itemTpl: 'Round {round_number} : {time_last_updated:date("l H:i")}',
    },
});

