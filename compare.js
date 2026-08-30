const params=new URLSearchParams(window.location.search);
const festivalName=params.get('FestivalName');
const celebratedStateId=params.get('compareId');

Promise.all([
    fetch('festivals.json').then(r => r.json()),
    fetch('states.json').then(r => r.json())
]).then(([festivals,states]) => {
    const festival =festivals.find(f =>f.name === festivalName);
    const  state =states.find(s => s.id === celebratedStateId);
    const details=state.festivals.find(f => typeof f === 'object' && f.name === festivalName);
    PerformComparison(festival,state,details);
});
 function PerformComparison(festival,state,details){
    document.getElementById("comparison-info").innerHTML=`
    <h1>${festival.name}</h1>
    <table class="compare-table">
    <caption><strong>FESTIVAL VARIATIONS </strong></caption>
    <thead>
        <tr>
      <th>  </th>
       <th><strong>${festival.origin.name}</strong></th>
       <th><strong>${state.name}<strong></th>
         </tr>
    </thead>
    <tbody>
        <tr>
        <td><b>Food: </b></td>
        <td>${festival.origin.food} </td>
        <td>${details.food} </td>
         <tr> 

         <tr>
         <td><b>Duration: </b></td>
         <td>${festival.origin.duration}</td>
         <td>${details.duration} </td>
         <tr>

         <tr>
          <td><b>Celebration:</b></td>
          <td>${festival.origin.celebration} </td>
           <td> ${details.celebration}</td>
        <tr>
        <td><b>Rituals: </b>
        <td>${festival.origin.rituals.join(', ')}</td>
        <td>${details.rituals.join(' , ')}</td>
         <tr>
         
         <tr>
         <td><b>Scale: </b></td>
         <td>${festival.origin.scale}</td>
         <td>${details.scale}</td>
         <tr>
         
         <tr>
          <td><b>Public Holiday</b></td>
          <td>${festival.origin.publicHoliday ? 'Yes': 'No'}</td>
          <td>${details.publicHoliday ? 'Yes' : 'No'}</td>
          <tr>
          
          <tr>
          <td><b>PeakTime:</b></td>
           <td>${festival.origin.peakTime}</td>
           <td>${details.peakTime}</td>
           <tr>
           </tbody>`
 }