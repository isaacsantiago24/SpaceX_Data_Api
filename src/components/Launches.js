import React, {useEffect, useState} from 'react';
import axios from 'axios'; //its going to look for axios inside the node modules


function Launches(){
    const[launchesArray, setLaunchesArray]= useState(null);
    const[hasError, setHasError] = useState(false);
    
    
    // if second argument ommited, runs whenever anything changes
    // if second argument empty array, runs only on the first render
    // if something in array, runs any time that thing changes 
    
    //useEffect makes sure we only call it 1 time
    useEffect(()=> {
        //will have to access response.data when working with axios
        axios.get('https://api.spacexdata.com/v3/launches')
            .then(response => setLaunchesArray(response.data))
            .catch(() => setHasError(true));

    }, []);

    
    if(hasError){
        return(
            <div>Something went wrong!</div>
            );
        }
        
    if(launchesArray === null) return 'Loading...';
    
    return (
        <div>
            <h1>Launches</h1>

            {launchesArray.map(thing => {
                
                return(
                    <div key={thing.flight_number}>
                        <h3>{thing.mission_name}</h3>
                        <p>Launch Date: {thing.launch_date_local}</p>
                        
                        {/* turnary operator */}
                        {thing.details ? <p>{thing.details}</p>: null }
                    </div>
                )

            })}

            {/* <button onClick={()=> setLaunchesArray([])}>Click Me</button> */}
        </div>
    )
}

export default Launches;