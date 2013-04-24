Ext.define('TouchMill.model.Team', {
  extend: 'Ext.data.Model',

  config: {
    fields: [
      { name: 'player_id', },
      { name: 'first_name', },
      { name: 'last_name', },
      { name: 'nickname', },
    ],
  },
});
