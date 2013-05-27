Ext.define('TouchMill.model.GameScore', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            // these fields needed for POST; the rest are optional or automatic
            { name: 'game_id', },                   //": 28582,
            { name: 'team_1_score', },              //": 8,
            { name: 'team_2_score', },              //": 9,
            { name: 'is_final', },                  //": true,

            //{ name: 'game_sets', },                 //": [],
            { name: 'id', },                        //": 27903,
            //{ name: 'resource_uri', },              //": "http://api.playwithlv.com/v1/game_scores/27903/",
            { name: 'team_1_id', },                 //": 19083,
            { name: 'team_2_id', },                 //": 19087,
            { name: 'time', },                      //": "2012-06-15T13:23:45.965067+02:00",
            //{ name: 'time_created', },              //": "2012-06-15T11:23:45.965067+00:00",
            //{ name: 'time_last_updated', },         //": "2012-06-15T11:23:45.965099+00:00",
            { name: 'what_happened', },             //": ""

            { name: 'is_mine', type: 'boolean', defaultValue: false, },
        ],
    },
});
