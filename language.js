let Language,langdata;
$(window).on("load", function(){
    Language = $("language").attr("initial");
    langdata = $("language").attr("lang").split(",");
    langmain(0);
    $(".language").on("click", function(){
        langmain(500);
    });
});
function langmain(time){
    this.main = function(){
        url = location.href;
        if(url.match("#")){
            for(i in langdata){
                if(langdata[i].indexOf(url.split("#")[1]) >= 0){
                    Language = url.split("#")[1];
                    $(".lang").each(function(i) {
                        lang = $(this).attr("language");
                        if(lang == Language) {
                            $(this).show();
                        } else {
                            $(this).hide();
                        }
                    });
                }
            }
        } else {

            $(".lang").each(function(i) {
                lang = $(this).attr("language");
                if(lang == Language) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }
    }
    setTimeout(this.main, time);
}
