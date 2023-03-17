const apikey=  `6f2a1fb1239909bf096b1b8c6dfc7523`;

const btn=document.getElementById("search");
const textValEl=document.getElementById("textVal");
const tempEl=document.getElementById("temp");
const weatherEl=document.getElementById("weather");
const iconEl=document.getElementById("icon");
//const dayEL1= document.getElementById("day1");
//const dayEL2= document.getElementById("day2"); 
//const dayEL3= document.getElementById("day3");
//const dayEL4= document.getElementById("day4");
//const dayEL5= document.getElementById("day5");
const forecastEl=document.getElementById("forecast");

//const countryCode=91;

async function getloc(city)
{
   
    const resp= await fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apikey}`);
    const respData= await resp.json();
    //console.log(respData);
    const lat=respData[0].lat;
    const lon=respData[0].lon;
    console.log(lat);
    console.log(lon);
    getWeather(lat,lon);
}

async function getWeather(lat,lon)
{
    const Currresp=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`);
    const respData1=await Currresp.json();
    const Foreresp= await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`);
    const ForeData= await Foreresp.json();
    const ForeData1= await ForeData.list[0].main.temp;
    const precp=await ForeData.list[0].dt_txt;
    const icon=await ForeData.list[0].weather[0].icon;
    const iconData= `https://openweathermap.org/img/wn/${icon}@2x.png`;
    console.log(ForeData);
    console.log(ForeData1);
    console.log(precp);
    //console.log(respData1);
    Currweather(ForeData1,precp,icon);
    let a=[ForeData.list[7].main.temp,ForeData.list[15].main.temp,ForeData.list[23].main.temp,ForeData.list[31].main.temp,ForeData.list[39].main.temp];
    let b=[ForeData.list[7].weather[0].description,ForeData.list[15].weather[0].description,ForeData.list[23].weather[0].description,ForeData.list[31].weather[0].description,ForeData.list[39].weather[0].description];
    let c=[ForeData.list[7].weather[0].icon,ForeData.list[15].weather[0].icon,ForeData.list[23].weather[0].icon,ForeData.list[31].weather[0].icon,ForeData.list[39].weather[0].icon];
    let d=[ForeData.list[7].dt_txt,ForeData.list[15].dt_txt,ForeData.list[23].dt_txt,ForeData.list[31].dt_txt,ForeData.list[39].dt_txt];
    forecast(a,b,c,d)
}

btn.addEventListener("click", async()=>
{
    forecastEl.innerHTML="";
   const city=textValEl.value;
    await getloc(city);

});
function Currweather(currtemp,precp,icon)
{
   tempEl.innerHTML=`${currtemp}°C`;
   let text=`${precp}`;
   let date=text.substring(0,11);
    let dateFormat = new Date(date);
    let text1=`${dateFormat}`;
   console.log(dateFormat);
   let day=text1.substring(0,4);
   weatherEl.innerHTML=day;
   iconEl.innerHTML=`<img src="https://openweathermap.org/img/wn/${icon}@2x.png"></img>`;
}
function forecast(a,b,c,d)

{   for(let i=0;i<a.length;i++)
    {
    let text=`${d[i]}`;
    let date=text.substring(0,11);
     let dateFormat = new Date(date);
     let text1=`${dateFormat}`;
    console.log(dateFormat);
    let day=text1.substring(0,4);
    console.log(day);
    const foreDay= document.createElement('div');
    
    
    foreDay.innerHTML=`
    <div class="day fore" id="day${i+1}">
    <div class="dayF fore"> ${day} </div>
    <div class="tempF fore">  ${a[i]}°C</div>
    <div class="icon1 fore"> <img src="https://openweathermap.org/img/wn/${c[i]}@2x.png"></img></div>
    
    <div class="weatherF"> ${b[i]}</div>
    
    </div>`;
    forecastEl.appendChild(foreDay);
    
    }
    foreDay.innerHTML="";
}

