Ext.define('TouchMill.model.Team', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'city', },                // : "",
            { name: 'country', },             // : "",
            { name: 'id', },                  // : 18011,
            { name: 'info', },                // : "",
            { name: 'leaguevine_url', },      // : "http://www.playwithlv.com/teams/18011/machine/",
            { name: 'losses', },              // : 5,
            { name: 'name', },                // : "Machine",
            { name: 'profile_image_200', },   // : "https://s3.amazonaws.com/playwithlv/v2/img/icons/teams/colored/ultimate2_3_200.png",
            { name: 'profile_image_50', },    // : "https://s3.amazonaws.com/playwithlv/v2/img/icons/teams/colored/ultimate2_3_50.png",
            { name: 'resource_uri', },        // : "http://api.playwithlv.com/v1/teams/18011/",
            //{ name: 'season_id', },           // : 7291,
            { name: 'short_name', },          // : "",
            //{ name: 'sport', },               // : "ultimate",
            { name: 'time_created', },        // : "2011-09-03T15:30:16.987347+00:00",
            { name: 'time_last_updated', },   // : "2011-09-03T15:30:16.987347+00:00",
            { name: 'wins', },                // : 8
        ],

        /*
        associations: [
            {
                type: 'hasMany',
                model: 'TouchMill.model.Game',
                name: 'games',
                // autoLoad: true,
                // kill store to revert to original model.
                store: {
                    model: 'TouchMill.model.Game',
                    proxy: {
                        type: 'configurableRest',
                        url: 'teams/',
                        useStaticUrls: true,
                        reader: { type: 'json', rootProperty: 'objects', },
                    },
                },
            },
        ],
        */
    },

});
