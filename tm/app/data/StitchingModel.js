Ext.define("TouchMill.data.StitchingModel", {
    extend: 'Ext.data.Model',
    alias: 'data.StitchingModel',

    stitchAssociations: function() {
        // only worry about hasOne stitching for now; 
        this.associations.each(function(ass) {
            if (ass.getType() == 'hasone') {
                
            }
        });
    }
});

