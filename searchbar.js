let popular= [
    {name: "Pongal"},
    {name: "Diwali"},      
];
               
let festivals = [];

fetch("festivals.json")
    .then(response => response.json())
    .then(data => {
        festivals = data;
});


function searchFestival(){
    
    let username=document.getElementById("value").value
    let foundfestival =festivals.find(function(festival){           
        return festival.name.toLowerCase()===username.toLowerCase()              
    });
                 
    if(foundfestival){
        highlight(foundfestival);
        document.getElementById("result").innerHTML=`
        <h2>${foundfestival.name}</h2>             
        <p>Origin:${foundfestival.origin.name}</p>
        <p>Food:${foundfestival.food}</p>
        `;
        if(foundfestival.celebratedIn.length > 0){
          document.getElementById("result").innerHTML += `<h3> Celebrated in: </h3>`;
		      foundfestival.celebratedIn.forEach(function(celebrated){
                 document.getElementById("result").innerHTML +=`
                 <p>${celebrated.name}</p>
                 `;
		      });

          foundfestival.celebratedIn.forEach(function(state){
          });
	      }
    }else{
      document.getElementById("result").innerHTML=`
      <h2>No Festival Found</h2>
      `;
      highlight(null);
    }
}

               
document.getElementById("value").addEventListener("keydown", function(event){            
    if(event.key === "Enter") {         
        searchFestival();           
    }                
});

       
let festivalButtons = document.getElementById("popular")

popular.forEach(function(festival){
                
    let buttons = document.createElement("button");  
    buttons.textContent = festival.name;
           
    buttons.onclick = function(){
        document.getElementById("value").value = festival.name;           
        searchFestival();         
        document.getElementById("value").value = "";           
    };

    festivalButtons.appendChild(buttons);              
});
