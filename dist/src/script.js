/*! talent 2019-09-23 */

function loadXMLDoc(t,e){var r=new XMLHttpRequest;r.onreadystatechange=function(){if(4==this.readyState){if(200==this.status)return e(null,this.responseText);var t={status:this.status,statusText:this.statusText};return console.log(" error:",t,this.status,this.readyState,this.statusText),e(t,null)}},r.open("GET",t,!0),r.send()}function btnClick(t,e,r){var s=document.getElementById("barSelect").value,n=document.getElementById(t).getAttribute("value"),a=document.getElementById(s).children[1].getAttribute("value"),i=parseInt(n)+parseInt(a),l=document.getElementById(s).children[1];100<i?(l.setAttribute("style","width:100%"),l.classList.contains("redClass")||l.setAttribute("class"," progressArea redClass"),r<=i?(document.getElementById(s).children[0].innerHTML=r+"%",l.setAttribute("value",r)):(document.getElementById(s).children[0].innerHTML=i+"%",l.setAttribute("value",i))):i<0?(l.setAttribute("style","width:0%"),document.getElementById(s).children[0].innerHTML="0%",l.setAttribute("value",0)):(l.classList.contains("redClass")&&l.setAttribute("class"," progressArea "),l.setAttribute("style","width:"+i+"%"),document.getElementById(s).children[0].innerHTML=i+"%",l.setAttribute("value",i))}loadXMLDoc("https://pb-api.herokuapp.com/bars",function(t,e){if(t)console.log("error from API:",t),document.getElementById("errorArea").setAttribute("style","display:initial"),document.getElementById("errorArea").innerHTML="Something went wrong :( <br /> status:["+t.status+"] <br/>description: ["+t.statusText+"]";else{console.log("data from API:",e);for(var r=JSON.parse(e),s=0;s<r.buttons.length;s++){var n=document.createElement("BUTTON");i="bar"+(i=s+1),n.setAttribute("type","button"),n.setAttribute("id",i),n.setAttribute("value",r.buttons[s]),n.setAttribute("role","button"),n.setAttribute("tabindex",s),n.setAttribute("onclick","btnClick('"+i+"', '"+r.buttons[s]+"', "+r.limit+")"),n.innerHTML=r.buttons[s],document.getElementById("progressButtonsArea").appendChild(n)}for(s=0;s<r.bars.length;s++){var a=document.createElement("div");a.setAttribute("class","progressArea"),a.setAttribute("style","width:"+r.bars[s]+"%"),a.setAttribute("value",r.bars[s]);var i,l=document.createElement("div");i="progress"+(i=s+1),l.setAttribute("id",i),l.setAttribute("class","progressBar");var u=document.createElement("span");u.innerHTML=r.bars[s]+"%",document.getElementById("progressBarsArea").appendChild(l),document.getElementById(i).appendChild(u),document.getElementById(i).appendChild(a),document.getElementById("barSelect").setAttribute("style","display:initial");var d=document.createElement("option");d.setAttribute("value",i),d.innerHTML=i,document.getElementById("barSelect").appendChild(d)}}});