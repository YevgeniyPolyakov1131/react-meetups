import MeetupList from "../components/meetups/MeetupList";
import { useState, useEffect } from "react";

function AllMeetupsPage(){
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    fetch("https://react-meets-5b73d-default-rtdb.firebaseio.com/meetups.json",)
    .then((response) => response.json())
    .then((data) => {
      setIsLoading(false); 
      const meetups = [];
      for (const key in data) {
        const meetup = {
          id: key,
          ...data[key]
        }
        meetups.push(meetup);
      }
  
      setLoadedMeetups(meetups); 
    });
  },[]);




  if(isLoading){
    return (
      <section>
        <h1>All meetups</h1>
        <p>loading...</p>
      </section>

    );
  }else{
    return (
        <section>
            <h1>All meetups</h1>
            <MeetupList meetups={loadedMeetups}/>

        </section>
    );

  }
}

export default AllMeetupsPage;