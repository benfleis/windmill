Ext.define('TouchMill.view.Events', {
    extend: 'Ext.Container',
    xtype: 'events',

    initialize: function() {
      var items = this.getItems();
      var item = items.getAt(1);
      var d = new Date();
      
      item.setHtml("loading");
      _WW_Callback = function(html) {
        item.setHtml(html);
      };
      
      loadSchedule("1");
    },
    

    
    config: {
        iconCls: 'calendar',
        title: 'Events',
        
        layout: {
          type: 'vbox',
          align: "start",
          pack: "start",
        },
    
        items: [
            {
                    docked: 'top',
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'container',
                            html: 'Day: ',
                            style: 'color: #fff; padding: 0 10px; width: 85px;'
                        },
                        {
                            xtype: 'segmentedbutton',
                            allowDepress: false,
                            items: [
                                { text: 'Thu',   handler: function() {       loadSchedule("1"); console.log("thu"); }, pressed:isDay(13)  },
                                { text: 'Fri',  handler: function() {       loadSchedule("2"); console.log("fri"); }, pressed: isDay(14) },
                                { text: 'Sat',     handler: function() {       loadSchedule("3"); console.log("sat"); }, pressed: isDay(15) },
                                { text: 'Sun', handler: function() {       loadSchedule("4"); console.log("sun"); }, pressed: isDay(16) }
                            ]
                        }
                    ]
            },
            
            {
              xtype: 'container',
              html: 'loading',
            }
    
        ],
    },
  });
  
  

