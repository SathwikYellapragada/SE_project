fetch("in.svg").then(response => response.text()).then(svg => {document.getElementById("india-map").innerHTML = svg;})
