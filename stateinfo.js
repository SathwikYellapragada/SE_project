const search=new URLSearchParams(window.location.search);
const stateId=search.get('state');
fetch('states.json')
 .then(response => response.json())
 .then(states =>{
    const state= states.find(s =>s.id===stateId);
    if(state){
          if(state.festivals.length > 0){
             document.getElementById("state.info").innerHTML=`
                <h1>${state.name} Festivals </h1> `;
            state.festivals.forEach(function(festival){
            document.getElementById("state.info").innerHTML+=`
            <p>${festival}</p> `;
          });
        }
        else{
            document.getElementById("state.info").innerHTML=`
             <p>No festivals found for this state </p>`;
        }
    }
});
