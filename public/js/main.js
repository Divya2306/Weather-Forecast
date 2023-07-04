const cityName=document.getElementById("cityName");
const city_name=document.getElementById("city_name");
const submit=document.getElementById("submitBtn");
const temp=document.getElementById("temp");
const temp_status=document.getElementById("temp_status");
const datahide=document.querySelector(".middle_layer");
const day=document.getElementById("day");
const today_date=document.getElementById("today_date");

const api_key = "4fa1d1c7a62aac8e3286b71dad8e8d58";

const getCurrentDay=()=>{
    var weekday=new Array(7);
    weekday[0]="Sunday";
    weekday[1]="Monday";
    weekday[2]="Tuesday";
    weekday[3]="Wednesday";
    weekday[4]="Thursday";
    weekday[5]="Friday";
    weekday[6]="Saturday";

    let currentTime=new Date();
    let day=weekday[currentTime.getDay()];
    return day;
};

const getCurrentTime=()=>{
    var months=[
        "Jan","Feb","Mar","Apr","May","June","July",
        "Aug","Sept","Oct","Nov","Dec"
    ];

    var now=new Date();
    var month=months[now.getMonth()];
    var date=now.getDate();

    return `${date} ${month}`;
}

const getInfo=async (event)=>{
    event.preventDefault();
    let cityVal=cityName.value;

    if(cityVal===""){
        city_name.innerHTML="Plz write the city name first";
        datahide.classList.add('data_hide');
    }
    else{
        try{
            let url=`http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=${api_key}`;
            const response=await fetch(url);
            const data= await response.json();
            console.log(data);
            
            const arrData=[data];
            city_name.innerHTML=`${arrData[0].name} , ${arrData[0].sys.country}`;
            temp.innerHTML=arrData[0].main.temp;
            temp_mood=arrData[0].weather[0].main;

            if(temp_mood==="Clear"){
                temp_status.innerHTML="<i class='fa fa-sun' style='color: #eccc68;''></i>";
            }
            else if(temp_mood==="Clouds"){
                temp_status.innerHTML="<i class='fa fa-cloud' style='color: #f1f2f6;'></i>";
            }
            else if(temp_mood==="Rain"){
                temp_status.innerHTML="<i class='fa fa-cloud-rain' style='color: #a4b0be;'></i>";
            }
            else{
                temp_status.innerHTML="<i class='fa fa-cloud' style='color: #f1f2f6;'></i>";
            }
            datahide.classList.remove('data_hide');

        }
        catch{
            city_name.innerHTML="Plz write the city name properly";
            datahide.classList.add('data_hide');
        }
        
    }
}

day.innerHTML=getCurrentDay();
today_date.innerHTML=getCurrentTime();
submit.addEventListener("click",getInfo); 