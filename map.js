async function loadSVG(){
  const response = await fetch('in.svg');
  const svgtext = await response.text();

  document.getElementById('india-map').innerHTML = svgtext;
}

let activeOrigin = null;
function highlight(stateId, isOrigin){
  
  if(activeOrigin){
    activeOrigin.style.fill = '';
  }

  activeOrigin = document.getElementById(stateId);
  activeOrigin.style.fill = '#FF0000';
}

loadSVG();
