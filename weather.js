var location = document.querySelector("div.highlight_reports >figure>div");
var caption = document.querySelector("div.highlight_reports >figure span");
var icon = document.querySelector("div.highlight_reports img");
var temp = document.querySelector("div.highlight_reports strong");
var time = document.querySelector("div.highlight_reports >time");
var keys = document.querySelectorAll("div.key_info span");
var status = document.querySelectorAll("footer div.weather_alerts span");
var hours = document.querySelector("div.day_reports");
var week = document.querySelector("div.week_reports");
var d = new Date();
var first_of_week =0;
var montodays = {"0":31,"1":28,"2":30,"3":31,"4":30,"5":31,"6":30,"7":31,"8":30,"9":31,"10":30,"11":31}

function retrieve(value){
    hours.innerHTML = "";
    week.innerHTML = "";
fetch("https://api.weatherapi.com/v1/forecast.json?key=e29b9c3769764af9b96134821210504&q="+ value +"&days=1&aqi=yes&alerts=yes")
.then((res)=>{return res.json()}).then((data)=>{
    console.log(data);
 
    img_load(data);

    location.innerHTML =`${data.location.name} , ${data.location.country}` ;
    icon.src = data.current.condition.icon;
    temp.innerHTML = data.current.feelslike_c;
    time.innerHTML = `${data.location.localtime}`;
    keys[0].innerHTML = `${data.current.humidity}`;
    keys[1].innerHTML = `${data.current.pressure_in} in`;
    keys[2].innerHTML = `${data.current.wind_kph} kph`;
    keys[3].innerHTML = `${data.current.gust_kph} kph`;
    caption.innerHTML = `${data.current.condition.text}`;
    if(data.alerts.alert.length == 0){
        status[0].innerHTML = `${data.forecast.forecastday[0].astro.sunrise}`;
        status[2].innerHTML = `${data.forecast.forecastday[0].astro.sunset}`;
    }
var unit;
    data.forecast.forecastday[0].hour.forEach((v)=>{
        var blk = document.createElement('figure');
       blk.style.position = "absolute";
        blk.style.bottom ="-5px";
        blk.style.display = 'inline-block';
        if(v.is_day){
            unit = "am"
        }else{unit = "pm"}
       var img = new Image();
       img.src = v.condition.icon;
       img.style.width="40px";
       img.style.marginTop="-40px";
       img.style.position = "relative";
       img.style.top = "-20px";
       console.log(img)
       blk.appendChild(img);
        blk.innerHTML += v.temp_c+ "<br><sup>O</sup>C<br>"+v.time.substr(10,12)+"<br>"+unit;
        blk.style.borderStartEndRadius = "10px";
        blk.style.borderStartStartRadius = "10px";
        blk.style.width = "50px";
        blk.style.height = "0px";
        blk.style.transition="all 0.4s"
        setTimeout(()=>{

            blk.style.height = v.temp_c+20+"%";
        },1000)
        blk.style.backgroundColor = "#16cdee81";
        blk.style.color = "white";
        
        var div = document.createElement("div");
        div.style.position="relative";
        div.style.width="4%";
        div.style.height='100%';
        hours.style.overflow = "hidden";
        div.appendChild(blk);
        hours.appendChild(div);
        div.style.setProperty("transition","all 0.3s");
       console.log(v);
    });

    first_of_week = Number(d.getDate() - d.getDay());



    if(first_of_week < 0 ){
        var prev = d.getMonth()-1;
        first_of_week = montodays[prev] + first_of_week;
    }

    for(let i=0;i<7;i++){
        fetch("https://api.weatherapi.com/v1/history.json?key=e29b9c3769764af9b96134821210504&q=London&dt="+d.getFullYear()+"-"+(d.getMonth()+1)+"-"+(first_of_week+i)).then((res)=>{return res.json()})
        .then((data)=>{
            console.log(data)
            var blk = document.createElement('figure');
       blk.style.position = "absolute";
        blk.style.bottom ="-5px";
        blk.style.display = 'inline-block';

       var img = new Image();
       img.src = data.forecast.forecastday[0].day.condition.icon;
       img.style.width="40px";
       img.style.marginTop="-40px";
       img.style.position = "relative";
       img.style.top = "-20px";
       blk.appendChild(img);
        blk.innerHTML +="<br>"+ data.forecast.forecastday[0].day.avgtemp_c+ "<br><sup>O</sup>C<br>"+data.forecast.forecastday[0].date;
        blk.style.borderStartEndRadius = "10px";
        blk.style.borderStartStartRadius = "10px";
        blk.style.width = "100px";
        blk.style.height = "0px";
        blk.style.transition="all 0.4s"
        setTimeout(()=>{

            blk.style.height = data.forecast.forecastday[0].day.avgtemp_c+20+"%";
        },1000)
        blk.style.backgroundColor = "#16cdee81";
        blk.style.color = "white";
        
        var div = document.createElement("div");
        div.style.position="relative";
        div.style.width="12%";
        div.style.height='100%';
        week.style.overflow = "hidden";
        div.appendChild(blk);
        week.appendChild(div);
        div.style.setProperty("transition","all 0.3s");
    })
        
    }

    var air_quality_entries = Object.entries(data.current.air_quality)
    
    for(let i=0;i<6;i++){
        document.getElementsByClassName("air_quality")[i].children[2].innerHTML=air_quality_entries[i][0];
        document.getElementsByClassName("air_quality")[i].children[0].innerHTML=Math.floor(air_quality_entries[i][1]);
    }
    
    
    var locate = Object.entries(data.location);

    for(let i=0;i<6;i++){
        document.getElementsByClassName("location")[i].children[2].innerHTML=locate[i][0];
        document.getElementsByClassName("location")[i].children[0].innerHTML=locate[i][1];
    }

    astrology(data)
});
 sports(value)
return true;
}

function img_load(data){
   var query_array = [data.current.condition.text,data.location.country,data.location.region];
    var query = query_array[Math.floor(Math.random()*3)];
    console.log(query);
   fetch(`https://api.pexels.com/v1/search?query=${query}`,{
       headers:{Authorization: '563492ad6f9170000100000109a1a092b09c4fcd83e78cb1ce1c79a9'}
   } ).then((res)=>{
     return  res.json();
   }).then((url)=>{
       console.log(url.photos[0]);
      var n = Math.floor(Math.random()*url.photos.length);
      document.getElementsByTagName("header")[0].style.backgroundSize="cover";
      document.getElementsByTagName("header")[0].style.backgroundRepeat="no-repeat";
      document.getElementsByTagName("header")[0].style.backgroundPosition="center";
       document.getElementsByTagName("header")[0].style.backgroundImage = `url(${url.photos[n].src.landscape})`;

        document.getElementsByClassName("bg")[0].style.backgroundImage = `url(${url.photos[n].src.landscape})`;
   })
}

function sports(value){
    fetch("https://api.weatherapi.com/v1/sports.json?key=e29b9c3769764af9b96134821210504&q="+value).then(res=> res.json())
        .then((data)=>{
            console.log(data);
            for(let play of data.football) {
                
                fetch(`https://api.pexels.com/v1/search?query=${play.country}`,{
                    headers:{Authorization: '563492ad6f9170000100000109a1a092b09c4fcd83e78cb1ce1c79a9'}
                } ).then((res)=>{
                    return  res.json();
                }).then((url)=>{
                    var n = Math.floor(Math.random()*url.photos.length);
                    
                    var div = document.createElement("div");
                    div.className = "thumb"
                   div.style.backgroundImage = `url(${url.photos[n].src.landscape})`;
                   console.log(div);
                   var item = document.createElement("div");
                   item.className = "item-1";
                   var a = document.createElement("a"); 
                   a.className= "card";
                   var article = document.createElement("article"); 
                   var h1 = document.createElement("h1"); 
                   h1.innerHTML = "Match  : "+ play.match;
                   var span1 = document.createElement("span"); 
                   span1.innerHTML = "Tournament  : "+play.tournament;
                   var span2 = document.createElement("span"); 
                   span2.innerHTML = "Stadium  : "+play.stadium;
                   var span3 = document.createElement("span"); 
                   span3.innerHTML = "Country  : "+play.country;
                   var span4 = document.createElement("span"); 
                   span4.innerHTML = "Start  : "+play.start;
                   article.appendChild(h1);
                   article.appendChild(span1);
                   article.appendChild(span2);
                   article.appendChild(span3);
                   article.appendChild(span4);
                   a.appendChild(div);
                   a.appendChild(article);
                   item.appendChild(a);
                   document.getElementsByClassName("sports")[0].appendChild(item);
               })
               
            }

            for(let play of data.cricket) {
                
                fetch(`https://api.pexels.com/v1/search?query=${play.country}`,{
                    headers:{Authorization: '563492ad6f9170000100000109a1a092b09c4fcd83e78cb1ce1c79a9'}
                } ).then((res)=>{
                    return  res.json();
                }).then((url)=>{
                    var n = Math.floor(Math.random()*url.photos.length);
                    
                    var div = document.createElement("div");
                    div.className = "thumb"
                   div.style.backgroundImage = `url(${url.photos[n].src.landscape})`;
                   console.log(div);
                   var item = document.createElement("div");
                   item.className = "item-1";
                   var a = document.createElement("a"); 
                   a.className= "card";
                   var article = document.createElement("article"); 
                   var h1 = document.createElement("h1"); 
                   h1.innerHTML = "Match  : "+ play.match;
                   var span1 = document.createElement("span"); 
                   span1.innerHTML = "Tournament  : "+play.tournament;
                   var span2 = document.createElement("span"); 
                   span2.innerHTML = "Stadium  : "+play.stadium;
                   var span3 = document.createElement("span"); 
                   span3.innerHTML = "Country  : "+play.country;
                   var span4 = document.createElement("span"); 
                   span4.innerHTML = "Start  : "+play.start;
                   article.appendChild(h1);
                   article.appendChild(span1);
                   article.appendChild(span2);
                   article.appendChild(span3);
                   article.appendChild(span4);
                   a.appendChild(div);
                   a.appendChild(article);
                   item.appendChild(a);
                   document.getElementsByClassName("sports")[0].appendChild(item);
               })

            }

            for(let play of data.golf) {
                
                fetch(`https://api.pexels.com/v1/search?query=${play.country}`,{
                    headers:{Authorization: '563492ad6f9170000100000109a1a092b09c4fcd83e78cb1ce1c79a9'}
                } ).then((res)=>{
                    return  res.json();
                }).then((url)=>{
                    var n = Math.floor(Math.random()*url.photos.length);
                    
                    var div = document.createElement("div");
                    div.className = "thumb"
                   div.style.backgroundImage = `url(${url.photos[n].src.landscape})`;
                   console.log(div);
                   var item = document.createElement("div");
                   item.className = "item-1";
                   var a = document.createElement("a"); 
                   a.className= "card";
                   var article = document.createElement("article"); 
                   var h1 = document.createElement("h1"); 
                   h1.innerHTML = "Match  : "+ play.match;
                   var span1 = document.createElement("span"); 
                   span1.innerHTML = "Tournament  : "+play.tournament;
                   var span2 = document.createElement("span"); 
                   span2.innerHTML = "Stadium  : "+play.stadium;
                   var span3 = document.createElement("span"); 
                   span3.innerHTML = "Country  : "+play.country;
                   var span4 = document.createElement("span"); 
                   span4.innerHTML = "Start  : "+play.start;
                   article.appendChild(h1);
                   article.appendChild(span1);
                   article.appendChild(span2);
                   article.appendChild(span3);
                   article.appendChild(span4);
                   a.appendChild(div);
                   a.appendChild(article);
                   item.appendChild(a);
                   console.log(item)
                   document.getElementsByClassName("sports")[0].appendChild(item);
               })              

            }
        })
}

function astrology(value){
    console.log(value.forecast.forecastday[0])

          var  astro = value.forecast.forecastday[0].astro;
                
                fetch(`https://api.pexels.com/v1/search?query=${astro.moon_phase}`,{
                    headers:{Authorization: '563492ad6f9170000100000109a1a092b09c4fcd83e78cb1ce1c79a9'}
                } ).then((res)=>{
                    return  res.json();
                }).then((url)=>{
                    var n = Math.floor(Math.random()*url.photos.length);
                    
                    var div = document.createElement("div");
                    div.className = "thumb"
                   div.style.backgroundImage = `url(${url.photos[n].src.landscape})`;
                   console.log(div);
                   var item = document.createElement("div");
                   item.className = "item-1";
                   var a = document.createElement("a"); 
                   a.className= "card";
                   var article = document.createElement("article"); 
                   var h1 = document.createElement("h1"); 
                   h1.innerHTML = "moon_phase  : "+ astro.moon_phase;
                   var span1 = document.createElement("span"); 
                   span1.innerHTML = "moonrise  : "+astro.moonrise;
                   var span2 = document.createElement("span"); 
                   span2.innerHTML = "moonset  : "+astro.moonset;
                   var span3 = document.createElement("span"); 
                   span3.innerHTML = "sunrise  : "+astro.sunrise;
                   var span4 = document.createElement("span"); 
                   span4.innerHTML = "sunset  : "+astro.sunset;
                   article.appendChild(h1);
                   article.appendChild(span1);
                   article.appendChild(span2);
                   article.appendChild(span3);
                   article.appendChild(span4);
                   a.appendChild(div);
                   a.appendChild(article);
                   item.appendChild(a);
                   console.log(item)
                   document.getElementsByClassName("astrology")[0].appendChild(item);
               })
            
        }
            

// preloader

document.getElementsByTagName("input")[0].addEventListener("keypress",(key)=>{
    
    if(key.key == "Enter"){
        key.preventDefault();
        var slidingTagLiAfterStyle = document.createElement("style");
slidingTagLiAfterStyle.innerHTML ="div.search_bar_section::after{content:'';position: relative; border:4px solid rgb(0, 153, 255);border-top:4px solid rgb(158, 205, 243);display: inline-block;width:15px;height:15px; top:5px;left:0px; z-index: 1;border-radius:50px;animation: sheen .8s forwards infinite linear;} ";
document.head.appendChild(slidingTagLiAfterStyle);
    
     if(retrieve(document.getElementsByTagName("input")[0].value)){

        setTimeout(()=>{slidingTagLiAfterStyle.innerHTML ="div.search_bar_section::after{content:'';position: relative; border:4px solid rgb(0, 153, 255);border-top:4px solid rgb(158, 205, 243);display: inline-block;width:15px;height:15px; top:5px;left:0px; z-index: 1;border-radius:50px;display:none;} ";
        document.head.appendChild(slidingTagLiAfterStyle)},2000);
     }
   
    }
})

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } 
  }
  
  function showPosition(position) {
   retrieve(position.coords.latitude+","+position.coords.longitude);
  }
getLocation();