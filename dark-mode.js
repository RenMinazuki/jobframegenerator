$(window).on("load", function(){
    
    const btn = document.querySelector("#btn-mode");

    // チェックした時の挙動
    btn.addEventListener("change", () => {
        mode_theme(btn)
    });

    // Cookieから読み込んだ時の挙動
    const mode = Cookies.get('mode');
    if(mode == "dark"){
        mode_theme_dark(btn);
    } else {
        mode_theme_light(btn);
    }

});

function mode_theme(btn) {
    if (btn.checked == true) {
        mode_theme_dark(btn);
    } else {
        mode_theme_light(btn);
    }
}
function mode_theme_dark(btn){
    // ダークモード
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
    Cookies.set('mode', 'dark');
    $('#btn-mode').prop('checked', true);
}
function mode_theme_light(btn){
    // ライトモード
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
    Cookies.set('mode', 'light');
    $('#btn-mode').prop('checked', false);
};