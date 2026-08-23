async function loadSVG(){
  const response = await fetch('in.svg');
  const svgtext = await response.text();

  document.getElementById('india-map').innerHTML = svgtext;
  enableStateClicks();
}

let activeOrigin = null;
let activeCelebrated = [];

function highlight(festival){
  
  if(activeOrigin){
    activeOrigin.style.fill = '';
  }
  
  if(activeCelebrated.length > 0){
    activeCelebrated.forEach(function(state){
      state.style.fill = '';
    });
    activeCelebrated = [];
  }

  activeOrigin = document.getElementById(festival.origin.id);
  activeOrigin.style.fill = '#FF0000';
  
  if(festival.celebratedIn.length > 0){
    festival.celebratedIn.forEach(function(celebrated){
      let state = document.getElementById(celebrated.id);
      state.style.fill = '#452bd9';
      activeCelebrated.push(state);
    });
  }
}

function enableStateClicks(){
  const paths=document.querySelectorAll('#features path[id^="IN"]');
  paths.forEach(function(path){
    path.style.cursor='pointer';
    path.addEventListener('click',function(){
      window.location.href=`index.html?state=${path.id}`;
    });
  });
}

loadSVG();
