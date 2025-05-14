import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

// import axios from "axios";
import moment from "moment";
import { useTranslation } from 'react-i18next';
import "moment/min/locales"
import CircularProgress from '@mui/material/CircularProgress';
//reudx import 
import { fetchWeather } from "./weatherApiSlice";
import { useSelector,useDispatch } from "react-redux";
// import {changeResult} from "./weatherApiSlice"


moment.locale("en"); // Set the default locale to English

// let cancelAxios = null;
export default function WeatherComponents() {
    //redux code
    const dispatch=useDispatch()
    const Temp=useSelector((state)=>{
        return state.weather.weather;
    })

    const isLoading=useSelector((state)=>{
        return state.weather.isLoading
    })
// const DateAndTime = moment().format('MMMM Do YYYY, h:mm:ss a')
// console.log(DateAndTime)
const { t, i18n } = useTranslation();
const [DateAndTime, setDateAndTime] = useState("");
    // const [Temp, setTemp] = useState({number:null,description:"",min:null,max:null ,icon:null,main:null});
    const [locale,setLocale]=useState("en")

// console.log(locale)
    // event handler
    function handleLanguageclick() {
        const newLocale = locale === "en" ? "ar" : "en"; // Determine the new locale
        setLocale(newLocale); // Update the state
        i18n.changeLanguage(newLocale); // Use the new locale to change the language
        moment.locale(newLocale); // Change the locale for moment.js
        setDateAndTime(moment().format('MMMM Do YYYY, h:mm:ss a')) //to change the date language
    }
    useEffect(() => {
        //trying redux
        console.log("start dispatching fetch weather")
        dispatch(fetchWeather())

i18n.changeLanguage("en")//i18 help me to change the language
       setDateAndTime(moment().format('MMMM Do YYYY, h:mm:ss a')) 
        // fetch("https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=fd7f0fd8f47146891df5ec66586f0fab").then((api)=>{
        //    return api.json();
        // }).then((ele)=>{
        //     const temp =Math.round(ele.main.temp-272.15)
        //     setTemp(temp);
        // })
        // axios
        //     .get(
        //         "https://api.openweathermap.org/data/2.5/weather?lat=30.033333&lon=31.233334&appid=fd7f0fd8f47146891df5ec66586f0fab",//this is latitude and longtude for egypt
        //         {
        //             cancelToken: new axios.CancelToken((c) => {
        //                 cancelAxios = c;
        //             }),
        //         }
        //     )
        //     .then(function (response) {
        //         // console.log(response.data);
        //         const temp = Math.round(response.data.main.temp - 272.15);
        //         const min = Math.round(response.data.main.temp_min - 272.15);
        //         const max = Math.round(response.data.main.temp_max - 272.15);
        //         const description = response.data.weather[0].description;
        //        const responseIcon = response.data.weather[0].icon;
        //         const mainImg = response.data.weather[0].main;
                
        //         // console.log(min,max,description)
        //         setTemp({number:temp,description:description,min:min,max:max,icon:`https://openweathermap.org/img/wn/${responseIcon}@2x.png`,main:`/img/${mainImg}.png`});
        //     })
        //     .catch(function (error) {
        //         // handle error
        //         console.log(error);
        //     });
        // return () => {
        //     console.log("cancelled");
        //     cancelAxios();
        // };
    }, []);
    return (
        <div className="container" dir={locale=="en"?"ltr":"rtl"}>
            <Container maxWidth="sm" >
                {/* card */}
                <div className="card"  >
                    {/* content */}
                    <div>
                        {/* city and time */}
                        <div className="city">
                            <Typography variant="h2" gutterBottom>
                                {t("Egypt")}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                {DateAndTime}
                            </Typography>
                        </div>
                        <hr />
                        {/* degree and description */}
                        <div className="degree">
                            <div>
                                <div className="temp">
                                    {/* degree */}
                                    {isLoading?  <CircularProgress />:""}
                                  
                                    <Typography variant="h2" gutterBottom>
                                        {Temp.number}°C
                                    </Typography>
                                    {/* icon */}
                                    <img src={Temp.icon} />
                                </div>
                                <Typography variant="h6" gutterBottom>
                                    {t(`${Temp.description}`)}
                                </Typography>
                                {/* min and max */}
                                <div className="status">
                                    <h4>{t("max")} : {Temp.max}</h4>
                                    <h4>{t("min")} : {Temp.min}</h4>
                                </div>
                            </div>
                            {isLoading?  <CircularProgress />:""}
                            <img src={Temp.main}  />
                        </div>
                    </div>
                </div>
                {/* translation container */}
                <div>
                    <Button variant="text" className="translation" onClick={handleLanguageclick}>
                        {locale=="ar"?"الانجليزى":"Arabic"}
                    </Button>
                </div>
            </Container>
        </div>
    );
}
