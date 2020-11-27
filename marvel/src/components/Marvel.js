import React, { useState, useEffect } from "react";
import md5 from "md5";

export default function Character() 
{
    const [marvel, setMarvel] = useState([]);

    useEffect(() => {
        if (!navigator.onLine) {
          if (localStorage.getItem("marvel") === null) {
            setMarvel("Loading...");
          } else {
            setMarvel(JSON.parse(localStorage.getItem("marvel")));
          }
        } else {

          const ts = "1";
          const publicKey = "72581c57ffd49193f3753d0ba09be28c"; 
          const privateKey = "295b6e5db54ffa73ed81eea5f32059b073baa527";
          const hash = md5(ts+privateKey+publicKey);
          const url = "https://gateway.marvel.com/v1/public/characters?ts="+ts+"&apikey="+publicKey+"&hash="+hash;

          fetch(url)
            .then((res) => res.json())
            .then((res) => {
              setMarvel(res.data.results);
              localStorage.setItem("marvel", JSON.stringify(res.data.results));
            });
        }
      }, []);
      return (
        <main>
          <h1 className="text-align">Personajes de Marvel</h1>
         <div >
          {marvel.map((personajes) => (
           <div >
           <div >
             <img src={personajes.thumbnail.path+"."+personajes.thumbnail.extension} alt="foto" />
           </div>
           <h3 >{personajes.name}</h3>
           <div >
             <p >
             {personajes.description}
             </p>
           </div>
         </div>
          ))}
        </div>
        </main>
      );
}