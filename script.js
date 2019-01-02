var globalResult = null
var globalEventType = null
var globalIndivResult = null
//calls other functions on load.
function loader(){
    darkModeSetting();
    matsuri_ver();
    matsuriEventInfo();

}

function electionLoader(){
    darkModeSetting()
    matsuriElectionDramaTable()
    darkModeSetting()
    populateTables()
    darkModeSetting()
}

//simple API wrapper.
function matsuriApi(param){
    var url = 'https://api.matsurihi.me/mltd/v1/' + param
    var req = new XMLHttpRequest();
    var data
    req.open('GET',url,false)
    req.onload = function requester(){
        if (req.readyState === 4){
            if (req.status === 200){
                result = JSON.parse(req.responseText)
                window.globalResult = result
            }
        }
        
        
    }
    req.send();
    return globalResult
    

    
};
function darkModeSetting(){
    decodedCookie = decodeURIComponent(document.cookie);
    if (decodedCookie == 'darkModeSetting=ON'){
        darkMode('ON',true);
    }
}

//darkmode script.
function darkMode(state,FromCookie){
    var title_style = document.getElementsByClassName("dmode_change");
    var setting = document.cookie['darkModeSetting'];
    if ((state.value == "OFF") || (FromCookie)){
        var i;
        for (i = 0; i < title_style.length; i++) {
            title_style[i].style.color = "white";
          } 
        document.body.style.backgroundColor = "#303030";
        document.getElementById("darkmode_toggle").innerHTML = "Light Mode";
        state.value = "ON";
        document.cookie = "darkModeSetting = ON"
    } else{
        var i;
        for (i = 0; i < title_style.length; i++) {
            title_style[i].style.color = "black";
          } 
        document.getElementById("darkmode_toggle").innerHTML = "Dark Mode";
        state.value = "OFF";
        document.body.style.backgroundColor = "white";
        document.cookie = "darkModeSetting = OFF"
    }
};
//call for version
function matsuri_ver(){
    var result = matsuriApi("version/latest");
    document.getElementById("ver").innerHTML = result['app']['version'];
    date = result['app']['updateTime'].split("T")
    time = date[1].split("+")
    document.getElementById("datever").innerHTML = date[0] + " " + time[0] + " JST";
};

function matsuriEventInfo(){
    var result = matsuriApi("events");
    var eventInfo = result[result.length-1];
    date = eventInfo['schedule']['beginDate'].split("T")
    time = date[1].split("+")
    document.getElementById("eventtitle").innerHTML = eventInfo['name'];
    document.getElementById("startdate").innerHTML = date[0] + " " + time[0] + " JST";

};

function matsuriElectionDramaTable(){
    var result = matsuriApi("election");
    
    document.getElementById("electionName").innerHTML = result['name'];
    dramaTitles = [];
    parentElement = document.getElementById('dramaTitlesElement');
    for (i in result['dramas']){
        var rowElement = document.createElement('div');;
        var titleElement = document.createElement('h4');
        var dramaName = document.createTextNode(result['dramas'][i]['name']);
        var colElement = document.createElement('div');
        var childRowElement = document.createElement('div');
        colElement.className = "col s12 l12 offset-l1";
        titleElement.className = "dmode_change";
        childRowElement.setAttribute("id","dramaID" + result['dramas'][i]['id']);
        rowElement.className = "row";
        titleElement.appendChild(dramaName);
        colElement.appendChild(titleElement);
        rowElement.appendChild(colElement);
        rowElement.appendChild(childRowElement)
        var element = document.getElementById('electionResults');
        element.appendChild(rowElement);
        for (j in result['dramas'][i]['roles']){
            var colElement = document.createElement('div');
            var cardElement = document.createElement('div');
            var cardContent = document.createElement('div');
            var spanElement = document.createElement('span');
            var cardTitle = document.createElement('span');
            var cardTitleText = document.createTextNode(result['dramas'][i]['roles'][j]['name']);
            var masterElement = document.getElementById("dramaID" + result['dramas'][i]['id'])
            
            colElement.className = "col s12 l4 offset-l1";
            cardElement.className = "card blue-grey darken-1";
            cardContent.className = "card-content white-text";
            cardTitle.className = "card-title";
            spanElement.setAttribute("id","roleID" + result['dramas'][i]['roles'][j]['id'])

            cardTitle.appendChild(cardTitleText);
            cardContent.appendChild(cardTitle);
            cardContent.appendChild(spanElement)
            cardElement.appendChild(cardContent);
            colElement.appendChild(cardElement);
            masterElement.appendChild(colElement);      
        }
    }
    };

function populateTables(){
    var scores = matsuriApi("election/current")
    for (k in scores){
        targetElement = "roleID" + scores[k]['id'] ;
        var TableContentElement = document.getElementById(targetElement);
        for (l in scores[k]['data'][0]){
            var text = document.createTextNode(scores[k]['data'][0][l]['idol_name'] + " : " + scores[k]['data'][0][l]['score']);
            var breakline = document.createElement("br")
            TableContentElement.appendChild(text);
            TableContentElement.appendChild(breakline)
        }
    
    }
}

