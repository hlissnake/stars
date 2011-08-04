KISSY.add("stars/core", function(S){
    var Core = function(){
        this.fakestars = [];
        for(var i = 0,len = 3000; i < len;  i++ ){

            this.fakestars.push({
                x : Math.random(),
                y : Math.random()
            });

        }
    }
    S.augment(Core, {
        getStars : function(){
            return  this.fakestars;
        }
    });
    return Core;
});
