var mJson;
var jsonUsers;
var popup = false;
var sort = "city"; //sortierung
var order = "normal"; //reverse
// load JSON

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
    mJson = JSON.parse(data);   
    inputContent();
} 

// inputt informations 
function inputContent(){
    let myJson = getMyJson();
    cleanDom();
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

    });
}
function cleanDom(){
    let maincontainer = document.getElementById("maincontainer");
    if (maincontainer.hasChildNodes){
        while(maincontainer.firstChild){
            maincontainer.removeChild(maincontainer.firstChild);
        }
    }
    else{ return }
}

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
    if(sort==="city"){
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
    if(sort==="price"){
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
    if(sort==="status"){
        mJson.forEach(function(e){
            newOrder.push(e.status);
        });
        newOrder.sort();
        
        let n=0;
        for(let i=0; myJson.length<mJson.length; i++){
            if(i>mJson.length-1){i=0;}
            if(mJson[i].status==newOrder[n]){
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
function whoAmI(e){
    console.log(e.target.id);
    if(sort === e.target.id){
        console.log("gotit")
        if(order=== "reverse"){
            console.log("von reverse nach normal")
            order= "normal";
        }
        else {
            order = "reverse"; 
            console.log("von normal nach reverse")
        }
    }
    else{ sort = e.target.id; }
    inputContent();
    console.log(order);
}




