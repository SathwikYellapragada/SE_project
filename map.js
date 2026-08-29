let paths = [];

async function loadSVG(){
  const response = await fetch('in.svg');
  const svgtext = await response.text();

  document.getElementById('india-map').innerHTML = svgtext;
  
  paths = document.querySelectorAll('#features path[id^="IN"]');
  enableStateClicks(paths);
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

function handleClick(e){  
  e.preventDefault();
  path = e.currentTarget;
  loadStateInfo(path.id);
}

function enableStateClicks(paths){
  //const paths=document.querySelectorAll('#features path[id^="IN"]');
  paths.forEach(function(path){
    path.style.cursor='pointer';
    path.addEventListener('click', handleClick);
  });
}

function disableStateClicks(paths){
  paths.forEach(function(path){
    path.style.cursor='default';
    path.removeEventListener('click', handleClick);
  });
}

loadSVG();
