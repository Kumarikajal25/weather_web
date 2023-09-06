import React ,{useState,useEffect} from "react"
import "./card.css"
import axios from "axios";
import apikey from "./apikey";
import Clock from "react-live-clock";
import dateBuilder from "./clock";
import Main from "./main"
import Animation from "./animation";
import Location from "./location";



function Card(){
    const [searchValue,setSearchValue]=useState("");
    const [error, setError] = useState("");
  const [weather, setWeather] = useState([]);
 
 
    
  const getWeatherinfo = (city) => {
    axios
      .get(
        `${apikey.base}weather?q=${
          city != "[object Object]" ? city :searchValue 
        }&units=metric&APPID=${apikey.key}`
      )
      .then((response) => {
        setWeather(response.data);
        setSearchValue("");
      })
      .catch(function (error) {
        console.log(error);
        setWeather("");
        setSearchValue("");
        setError({ message: "Not Found", searchValur: searchValue });
      });
  };
  
 
  useEffect(() => {
    getWeatherinfo("Durgapur");
    
  },[]);
  const handleEnter = (event) => {
    if (event.key === 'Enter') {
    getWeatherinfo(searchValue);
    }
  };
  

    return(
        <>
            <div className="box-container">
            <div className="box">
            {/* box1 started */}
            <div className="box1">
           <div className="location">
                   <Location/>
           </div>
                <div className="date-time">
              <div className="dmy">
                <div id="txt"></div>
                <div className="current-time">
                  <Clock format="HH:mm:ss" interval={1000} ticking={true} />
                </div>
                <div className="current-date">{dateBuilder(new Date())}</div>
              </div>
              <div className="temperature">
              {typeof weather.main !="undefined"?(<p>
                {Math.round(weather.main.temp)}°<span>C</span>
                </p>
               ):(
                <span>
                {error.query} {error.message}
                </span>
               )}
                
         </div>
            
          </div>
               
            
          </div>
                 
            {/* box2 started */}
                 <div className="box2">
                 <div className="icon-container">
                {/* <img className="icon" src={icon}></img>  */}
                <div className="animation">
                  <Animation {...weather}/>
                </div>

                </div>
                
                
                
                 {/* input section */}
                
                 <div className="search-box">  
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={(e)=>
                setSearchValue(e.target.value)}
                value={searchValue}
                onKeyDown={handleEnter}
        /> 
        <div className="img-box">
            {" "}
            <img
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png" 
              onClick={getWeatherinfo} 

              />
          </div></div>
          {/* list of item  */}
            <Main {...weather}/>
                   </div>
                 </div>
                
                 </div>
               
        </>
    )
}
export default Card;