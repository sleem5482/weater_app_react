import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchWeather = createAsyncThunk(
    "weatherApi/fetchWeather",
    async () => {
        console.log("calling fetch weather");
        const response = await axios.get(
           `https://api.openweathermap.org/data/2.5/weather?lat=30.033333&lon=31.233334&appid=${process.env.REACT_APP_API_KEY}`, //this is latitude and longtude for egypt
            {
                // cancelToken: new axios.CancelToken((c) => {
                //     cancelAxios = c;
                // }),
            }
        );
        const temp = Math.round(response.data.main.temp - 272.15);
        const min = Math.round(response.data.main.temp_min - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        const description = response.data.weather[0].description;
        const responseIcon = response.data.weather[0].icon;
        const mainImg = response.data.weather[0].main;

        // console.log(min,max,description)
        console.log(response);
        // setTemp({number:temp,description:description,min:min,max:max,icon:`https://openweathermap.org/img/wn/${responseIcon}@2x.png`,main:`/img/${mainImg}.png`});
        return {
            number: temp,
            min,
            max,
            description,
            icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
            main: `/img/${mainImg}.png`,
        };
    }
);

const weatherApiSlice = createSlice({
    name: "WeatherApi",
    initialState: {
        result: "empty",
        weather: {},
        isLoading: false,
    },
    reducers: {
        changeResult: (state, action) => {
            state.result = "change";
        },
    },
    extraReducers(builder) {
        //we use this when create thunk function
        builder
            .addCase(fetchWeather.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.isLoading = false;
                state.weather = action.payload; //return fetch weather
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.isLoading = true;
            });
    },
});

export const { changeResult } = weatherApiSlice.actions;
export default weatherApiSlice.reducer;
