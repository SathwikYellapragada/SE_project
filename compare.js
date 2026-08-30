const params=new URLSearchParams(window.location.search);
const festivalName=params.get('FestivalName');
const celebratedStateId=params.get('compareId');

Promise.all([
    fetch('festivals.json').then(r => r.json()),
    fetch('states.json').then(r => r.json())
]).then(([festivals,states]) => {
    const festival =festivals.find(f =>f.name === festivalName);
    const  state =states.find(s => s.id === celebratedStateId);
    const origin = states.find(s => s.id === festival.origin.id);
    PerformComparison(festival,state,origin);
});
 function PerformComparison(festival,state,origin){
    document.getElementById("comparison-info").innerHTML=`
    <table>
    <thead>
        <tr>
      <th>  </th>
       <th><strong>${origin.name}</strong></th>
       <th><strong>${state.name}<strong></th>
         </tr>
    </thead>
    <tbody>
        <tr>
        <td><b>Food: </b></td>
        <td>${festival.food} </td>
        <tr>       `
 }