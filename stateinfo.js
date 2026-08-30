let states = [];
async function loadStates(){
  const response = await fetch('states.json');
  states = await response.json();
  console.log("Loaded states");
}

let activeHighlightedState = null;
function loadStateInfo(stateId) {
  const state = states.find(s => s.id === stateId);

  if(activeHighlightedState){
    activeHighlightedState.style.fill = '';
  }
  
  if(activeOrigin){
    activeOrigin.style.fill = '';
  }
  if(activeCelebrated.length > 0){
    activeCelebrated.forEach(function(state){
      state.style.fill = '';
    });
    activeCelebrated = [];
  }

  activeHighlightedState = document.getElementById(state.id);
  activeHighlightedState.style.fill = '#e9f542';
let carnivalButtons=document.getElementById("state-info");
  if(state.festivals.length > 0){      
    document.getElementById("state-info").innerHTML=`          
    <h1>${state.name} Festivals </h1> `;
    state.festivals.forEach(function(festival){
      const festivalName = typeof festival === 'string' ? festival : festival.name;
      let clicker = document.createElement("button");
      clicker.textContent = festivalName;
      clicker.classList.add("Festival-Button");
      clicker.onclick = function(){    
        document.getElementById("value").value = festivalName;           
        searchFestival();         
        document.getElementById("value").value = "";           
      };
      carnivalButtons.appendChild(clicker);
    });
  }else{
    document.getElementById("state-info").innerHTML=`
    <p>No festivals found for this state </p>`;
  }  
}

loadStates();
