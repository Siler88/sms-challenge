var mJson=[];
var originalJson;
var sort = "city"; //sortierung
var order = "normal"; //reverse
var startDate = 1306886400000;
var endDate = 1557619200000;
// load JSON
//json parsen und laden
function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', './data.json', true); 
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }
 loadJSON(echoJson)

function echoJson(data){
    originalJson = JSON.parse(data);  
    getJsonRange(); 
    inputContent();
} 
// start und enddatum prüfen und speichern
function setjsonRange(e){
    if (e.preventDefault) e.preventDefault();
        startDate = Date.parse(document.getElementById("startdate").value);
        endDate = Date.parse(document.getElementById("enddate").value);
        if(endDate<startDate){
            endDate=startDate;
            window.alert("Das Enddatum kann nicht kleiner als das Startdatum sein. Deshalb wurde automatisch das Enddatum dem Startdatum gleichgesetzt.")
        }
        inputContent();
        console.log(startDate, endDate)
    return false;
}
// datum eingaben verarbeiten
function getJsonRange(){
    var form = document.getElementById('rangeform');
    if (form.attachEvent) {
        form.attachEvent("submit", setjsonRange);
    } else {
        form.addEventListener("submit", setjsonRange);
    }
}
//array auf basis der datums-range erstellen
function buildJsonByRange(){
    mJson=[];
    originalJson.forEach(function(e){
        if(Date.parse(e.start_date)>=startDate && Date.parse(e.end_date)<=endDate){
            mJson.push(e);
        }
    });

}
// inputt informations 
function inputContent(){
    buildJsonByRange();
    let myJson = getMyJson();
    cleanDom();
    if(myJson.length===0){
        window.alert("sorry we didn't found any entry in the given date range")
    }
    myJson.forEach(element => {
        let cityName = element.city;
        let startDate = element.start_date;
        let endDate = element.end_date;
        let price = element.price;
        let status = element.status;
        let color = element.color;

        let cont = document.createElement("div") // post-container erstellen
        cont.className = "subcontainer";
        document.getElementById("maincontainer").appendChild(cont)
        
        let cityDiv = document.createElement("div");
        cityDiv.className = "subline";  // username einfuegen
        cont.appendChild(cityDiv);
        cityDiv.innerHTML = cityName;

        let startDateDiv = document.createElement("div");
        startDateDiv.className = "subline";  // username einfuegen
        cont.appendChild(startDateDiv);
        startDateDiv.innerHTML = startDate;

        let endDateDiv = document.createElement("div");
        endDateDiv.className = "subline";  // username einfuegen
        cont.appendChild(endDateDiv);
        endDateDiv.innerHTML = endDate;

        let priceDiv = document.createElement("div");
        priceDiv.className = "subline";  // username einfuegen
        cont.appendChild(priceDiv);
        priceDiv.innerHTML = price;

        let statusDiv = document.createElement("div");
        statusDiv.className = "subline";  // username einfuegen
        cont.appendChild(statusDiv);
        statusDiv.innerHTML = status;

        let colorDiv = document.createElement("div");
        colorDiv.className = "subline";  // username einfuegen
        cont.appendChild(colorDiv);
        colorDiv.innerHTML = color;
        colorDiv.style.backgroundColor = color;

    });
}
//funktion zum löschen der einträge
function cleanDom(){
    let maincontainer = document.getElementById("maincontainer");
    if (maincontainer.hasChildNodes){
        while(maincontainer.firstChild){
            maincontainer.removeChild(maincontainer.firstChild);
        }
    }
    else{ return }
}
//hier wird ein neuer array erstellt und die sortierungseinstellungen verarbeitet
function getMyJson(){   // sortierung vornehmen
    let myJson=[];
    let newOrder = [];
    if(sort==="start_date"){      //nach startdatum sortiert
        let helpArray=[];
        mJson.forEach(function(e){
            helpArray.push(Date.parse(e.start_date));
        });
        helpArray.sort();
        let m = 0;
        for(let i =0; newOrder.length<mJson.length; i++){
            if (i>mJson.length-1){i=0;}
            let par = Date.parse(mJson[i].start_date);
            if(par === helpArray[m]){
                newOrder.push(mJson[i].start_date);
                if(newOrder.length<mJson.length){
                    i=0;
                }
                m++;
            }
        }
        if(newOrder.length==mJson.length){
            let n = 0;
            for(let i =0; myJson.length<mJson.length; i++){
                if(i>mJson.length-1){i=0}
                if(mJson[i].start_date==newOrder[n]){
                    myJson.push(mJson[i]);
                    if(myJson.length<newOrder.length){
                        i=0;
                    }
                    n++;
                }
            } 
        }
        if (order=="normal"){
            return (myJson);
        }
        else if(order == "reverse"){
            myJson = myJson.reverse();
            return(myJson);
        }
    }
    if(sort==="end_date"){      //nach enddatum sortiert
        let helpArray=[];
        mJson.forEach(function(e){
            helpArray.push(Date.parse(e.end_date));
        });
        helpArray.sort();
        let m = 0;
        for(let i =0; newOrder.length<mJson.length; i++){
            if (i>mJson.length-1){i=0;}
            let par = Date.parse(mJson[i].end_date);
            if(par === helpArray[m]){
                newOrder.push(mJson[i].end_date);
                if(newOrder.length<mJson.length){
                    i=0;
                }
                m++;
            }
        }
        if(newOrder.length==mJson.length){
            let n = 0;
            for(let i =0; myJson.length<mJson.length; i++){
                if(i>mJson.length-1){i=0}
                if(mJson[i].end_date==newOrder[n]){
                    myJson.push(mJson[i]);
                    if(myJson.length<newOrder.length){
                        i=0;
                    }
                    n++;
                }
            } 
        }
        if (order=="normal"){
            return (myJson);
        }
        else if(order == "reverse"){
            myJson = myJson.reverse();
            return(myJson);
        }
    }
    if(sort==="city"){  //nach stadt sortieren
        mJson.forEach(function(e){
            newOrder.push(e.city);
        });
        newOrder.sort();
        
        let n=0;
        for(let i=0; myJson.length<mJson.length; i++){
            if(i>mJson.length-1){i=0;}
            if(mJson[i].city==newOrder[n]){
                n++;
                myJson.push(mJson[i]);
                if(myJson.length<mJson.length){
                i=0;}
            }
        }
        if(order=="normal"){
            return(myJson);
        }else if(order== "reverse"){
            myJson= myJson.reverse();
            return(myJson);
        }
    }
    if(sort==="price"){     // nach preis sortieren
        mJson.forEach(function(e){
            newOrder.push(e.price);
        });
        newOrder.sort();
        
        let n=0;
        for(let i=0; myJson.length<mJson.length; i++){
            if(i>mJson.length-1){i=0;}
            if(mJson[i].price==newOrder[n]){
                n++;
                myJson.push(mJson[i]);
                if(myJson.length<mJson.length){
                i=0;}
            }
        }
        if(order=="normal"){
            return(myJson);
        }else if(order== "reverse"){
            myJson= myJson.reverse();
            return(myJson);
        }
    }
    if(sort==="status"){    //nach status sortieren.
        mJson.forEach(function(e){
            newOrder.push(e.status);
        });
        newOrder.sort();
        let n=0;
        for(let i=0; myJson.length<mJson.length; i++){
            if(!myJson.includes(mJson[i])){
                if(i>mJson.length-1){i=0;}
                if(mJson[i].status==newOrder[n]){
                    n++;
                    myJson.push(mJson[i]);
                    if(myJson.length<mJson.length){
                    i=0;}
                }
            }
        }
        if(order=="normal"){
            return(myJson);
        }else if(order== "reverse"){
            myJson= myJson.reverse();
            return(myJson);
        }
    }
    if(sort==="color"){    //!nach color sortieren. Fehlerhaft. wenn Zeit übrig darum kümmern.
        mJson.forEach(function(e){
            newOrder.push(e.color);
        });
        newOrder.sort();
        
        let n=0;
        for(let i=0; myJson.length<mJson.length; i++){
            if(i>mJson.length-1){i=0;}
            if(mJson[i].color==newOrder[n]){
                n++;
                myJson.push(mJson[i]);
                if(myJson.length<mJson.length){
                i=0;}
            }
        }
        if(order=="normal"){
            return(myJson);
        }else if(order== "reverse"){
            myJson= myJson.reverse();
            return(myJson);
        }
    }
}
function whoAmI(e){ // herausfinden auf welche spalte geklickt wurde
    if(sort === e.target.id){
        if(order=== "reverse"){
            order= "normal";
        }
        else {
            order = "reverse"; 
        }
    }
    else{ sort = e.target.id; }
    //farben wechseln um zu kennzeichnen welche spalte sortiert wurde
    for(let i=0; i<document.getElementsByClassName("headerline").length; i++){
        document.getElementsByClassName("headerline")[i].style.backgroundColor= "#0075be";
    }
    if(order==="reverse"){e.target.style.backgroundColor = "red";}
    if(order==="normal"){e.target.style.backgroundColor = "#00ffff";}
    
    inputContent();
}




