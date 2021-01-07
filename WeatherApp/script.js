const getWeatherTab=document.getElementById("getWeatherTab");
const getWeatherButton=document.getElementById("getWeatherButton");
let resultTab=document.getElementById("resultTab");
getWeatherButton.addEventListener("click",()=>{
    getWeatherButton.classList.add("hide");
    getWeatherTab.classList.remove("hide");
    resultTab.classList.add("hide");
})
document.getElementById("current").addEventListener('click',()=>{
    getUpdate(true);
})
document.getElementById("submitByLatLong").addEventListener('click',()=>{
    let lat=document.getElementById("lat");
    let long=document.getElementById("long");
    getWeatherUpdate(lat.value,long.value);
    lat.value=null;
    long.value=null;
})
document.getElementById("submitByCity").addEventListener("click",()=>{
    let city=document.getElementById("city");
    getWeatherUpdateByCity(city.value);
    city.value=null;
})
function getUpdate(isCurrent){
    if(isCurrent){
        navigator.geolocation.getCurrentPosition((e)=>{
            getWeatherUpdate(e["coords"]["latitude"],e["coords"]["longitude"]);
        })
    }
}
let weatherJSON;
function getWeatherUpdate(latitude,longitude){
    const response=fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=868a82b49bc90748528afad95e4d3b8f`)
    response.then(result=>{
        if(result.status!=200){
            alert("Error Occured. Try again.");
            return;
        }
        result.json().then(data=>{
            weatherJSON=data;
            print(weatherJSON,getWeatherTab,getWeatherButton,resultTab);
        })
    })
}
function print(weatherJSON,getWeatherTab,getWeatherButton,resultTab){
    resultTab.innerHTML=`<div class="row text-center">
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <img src="Images/temperature.png" class="img img-responsive" alt="Icon"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        ${(weatherJSON["main"]["temp"]-272.15).toPrecision(4)} °C
                    </div>
                </div>
            </div>
            <div class="col-sm">
                <div class="row p-2">
                    <div class="col-sm">
                        ${weatherJSON["weather"][0]["description"]}
                    </div>
                </div>
                <div class="row p-2">
                    <div class="col-sm">
                        Humidity : ${weatherJSON["main"]["humidity"]}
                    </div>
                </div>
                <div class="row p-2">
                    <div class="col-sm">
                        Pressure : ${weatherJSON["main"]["pressure"]}
                    </div>
                </div>
            </div>
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <img src="https://openweathermap.org/img/wn/${weatherJSON["weather"][0]["icon"]}@2x.png" alt="Icon"/>
                    </div>
                </div>
            </div>
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <img src="Images/wind.webp" alt="Icon"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        ${weatherJSON["wind"]["speed"]} meters/sec
                    </div>
                </div>
            </div>
        </div>`;
    getWeatherTab.classList.add("hide");
    getWeatherButton.classList.remove('hide');
    resultTab.classList.remove("hide");
}
function getWeatherUpdateByCity(city){
    const response=fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=868a82b49bc90748528afad95e4d3b8f`)
    response.then(result=>{
        if(result.status!=200){
            alert("Error Occured. Try again.");
            return;
        }
        result.json().then(data=>{
            weatherJSON=data;
            print(weatherJSON,getWeatherTab,getWeatherButton,resultTab);
        })
    })
}
