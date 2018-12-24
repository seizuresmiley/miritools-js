function matsuri_ver(){
    var req = new XMLHttpRequest();
    req.open('GET','https://api.matsurihi.me/mltd/v1/version/latest',false)
    req.onload = function(){
        var data = JSON.parse(this.response);
        var txt = "";
        var x;
        date = data['app']['updateTime']
        result = date.split("T")
        time = result[1].split("+")
        document.getElementById("ver").innerHTML = data['app']['version']
        document.getElementById("datever").innerHTML = result[0] +" " + time[0] + " JST"
    }
    req.send();
};

function darkmode(state){
    var title_style = document.getElementById("header")
    if (state.value == "OFF"){
        title_style.style.color = "white";
        document.body.style.backgroundColor = "#303030";
        document.getElementById("darkmode_toggle").innerHTML = "Light Mode";
        state.value = "ON";
    } else{
        document.getElementById("darkmode_toggle").innerHTML = "Dark Mode";
        state.value = "OFF";
        title_style.style.color = "black";
        document.body.style.backgroundColor = "white";
    }

    //title_style.style.color = "white";
    //document.body.style.backgroundColor = "#303030";
    //document.getElementById("darkmode_toggle").innerHTML = " Light Mode";
}