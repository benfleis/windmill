Ext.define('TouchMill.model.Player', {
    extend: 'Ext.data.Model',

    config: {
        hasMany: [
            {
                model: 'TouchMill.model.TeamPlayer',
                foreignKey: 'player_id',
                name: 'getTeamPlayers',
            },
        ],

        fields: [
            { name: 'gender', },              //: 0,
            { name: 'first_name', },          //: 'ben',
            { name: 'id', },                  //: 14090,
            { name: 'last_name', },           //: 'fleis',
            { name: 'leaguevine_url', },      //: 'http://www.playwithlv.com/players/14090/ben-fleis/',
            { name: 'nickname', },            //: '',
            { name: 'number_of_fans', },      //: 0,
            { name: 'number_of_props', },     //: 0,
            { name: 'profile_image_200', },   //: 'https://s3.amazonaws.com/playwithlv/uploads/photos/3902/resized/200/237c460f30a4ff795b09989ea248f5c7.jpg',
            { name: 'profile_image_50', },    //: 'https://s3.amazonaws.com/playwithlv/uploads/photos/3902/resized/50/237c460f30a4ff795b09989ea248f5c7.jpg',
            { name: 'resource_uri', },        //: '',
            { name: 'time_created', },        //: '2013-03-02T14:47:06.934121+00:00',
            { name: 'time_last_updated', },   //: '2013-03-02T15:21:25.702273+00:00',

            { name: 'is_mine', type: 'boolean', defaultValue: false, },
        ],
    },
});

