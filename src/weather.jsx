import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useEffect,useState } from "react";
export default function WeatherComponents() {
    const [Temp, setTemp] = useState([]);
    useEffect(() => {
        fetch("https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=fd7f0fd8f47146891df5ec66586f0fab").then((api)=>{
           return api.json();
        }).then((ele)=>{
            const temp =Math.round(ele.main.temp-272.15)
            setTemp(temp);
        })
    }, []);
    return (
        <div className="container">
            <Container maxWidth="sm">
                {/* card */}
                <div className="card">
                    {/* content */}
                    <div>
                        {/* city and time */}
                        <div className="city">
                            <Typography variant="h2" gutterBottom>
                                Egypt
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                monday 16/2 2005
                            </Typography>
                        </div>
                        <hr />
                        {/* degree and description */}
                        <div className="degree">
                            <div>
                                <div>
                                    <Typography variant="h2" gutterBottom>
                                        {Temp}°C
                                    </Typography>
                                </div>
                                <Typography variant="h6" gutterBottom>
                                    broken clouds
                                </Typography>
                                {/* min and max */}
                                <div className="status">
                                    <h4>max: 35</h4>
                                    <h4>min: 25</h4>
                                </div>
                            </div>
                            <img src={"/img/rain.png"} alt="sfs" />
                        </div>
                    </div>
                </div>
                {/* translation container */}
                <div>
                    <Button variant="text" className="translation">
                        Arabic
                    </Button>
                </div>
            </Container>
        </div>
    );
}
