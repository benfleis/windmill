Ext.define('TouchMill.model.TournamentTeam', {
    extend: 'Ext.data.Model',

    config: {
        idProperty: 'team_id',
        //belongsTo: [ { model: 'TouchMill.model.Tournament', associationKey: '}, ],
        fields: [
            { name: 'final_standing', }         //: 13,
            { name: 'time_created', }           //: '2012-05-24T17:25:28.425127+00:00',
            { name: 'time_last_updated', }      //: '2012-06-17T12:32:12.630068+00:00',
            { name: 'team_id', }                //: 19115,
            { name: 'seed', }                   //: 14,
            { name: 'tournament_id', }          //: 18094,
            { name: 'resource_uri', }           //: 'http://api.playwithlv.com/v1/tournament_teams/18094/19115/'
        ],

    },
});


