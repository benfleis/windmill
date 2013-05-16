Ext.define('TouchMill.model.Tournament', {
    extend: 'Ext.data.Model',

    config: {
        idProperty: 'id',
        hasMany: [
            {
                model: 'TouchMill.model.TournamentTeams',
                foreignKey: 'team_id',
            },
        ],

        fields: [
            { name: 'end_date', },                          //: '2012-06-17',
            { name: 'id', },                                //: 18091,
            { name: 'info', },                              //: '',
            { name: 'name', },                              //: 'Windmill Windup 2012 open',
            { name: 'start_date', },                        //: '2012-06-15',
            { name: 'time_created', },                      //: '2012-05-24T17:13:02.614883+00:00',
            { name: 'time_last_updated', },                 //: '2012-06-12T08:19:58.615630+00:00',
            { name: 'timezone', },                          //: 'Europe/Amsterdam',
            { name: 'uses_seeds', },                        //: false,
            { name: 'visibility', },                        //: 'live'
        ],
    },
});

