let paths = [];
let activeFestivalData=null;
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
function handleCelebratedClick(e){
 e.preventDefault();
 const compareStateId=e.currentTarget.id;
  openComparison(activeFestivalData,compareStateId);
}
function enableStateClicks(paths,handler=handleClick){
  //const paths=document.querySelectorAll('#features path[id^="IN"]');
  paths.forEach(function(path){
    path.style.cursor='pointer';
    path.addEventListener('click',handler);
  });
}

function disableStateClicks(paths,handler=handleClick){
  paths.forEach(function(path){
    path.style.cursor='default';
    path.removeEventListener('click', handler);
  });
}
function openComparison(festival,stateId){
  const params=new URLSearchParams({
    FestivalName:festival.name,
    compareId: stateId
  })
  window.open(`compare.html?${params.toString()}`,' _blank');
}

loadSVG();
