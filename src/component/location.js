import React ,{useState,useEffect} from "react"



function Location(){
     
   const [locit,setLocit]=useState("");
   const [locsta ,setLocsta]=useState(" ");
    function getdata(){
     
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(position =>{
            const {latitude ,longitude}=position.coords;
            const url=`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            fetch(url).then(res =>res.json()).then(data =>{
                    setLocit(data.address.city);
                    setLocsta(data.address.state);
            }).catch(()=>{
                setLocit("");
                setLocsta("");
            })
          },(error) => {
            alert("Error getting location: " + error.message);
          }
          
          );
        }else{
            alert("Geolocation not available");
        }
    }
    useEffect(()=>{
      window.alert("This website uses your current location for Real-time Weather Information");
        getdata();
        
    },[])
   
    
    return (
        <>
        <i class="material-icons">&#xe55f;</i>
      <p id="city">{locit}</p>
      <br></br>
      <p id="state">{locsta}</p>
        </>
    )
}
export default Location;