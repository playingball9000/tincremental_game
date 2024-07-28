(()=>{"use strict";var e={756:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GameEngine=void 0;var o=n(533),i=n(70),r=function(){function e(){this.player=new i.Player,this.mapManager=new o.MapManager,this.score=0,this.clickValue=2,this.autoIncrementValue=0}return e.prototype.click=function(){console.log("click1"),this.score+=this.clickValue,this.updateScoreDisplay()},e.prototype.click2=function(){console.log("click2"),this.score+=this.clickValue,this.autoIncrementValue+=1},e.prototype.autoIncrement=function(){console.log("autoIncrement"),this.score+=this.autoIncrementValue,this.updateScoreDisplay()},e.prototype.updateScoreDisplay=function(){var e=document.getElementById("score");e&&(e.innerText="Score: ".concat(this.score))},e.prototype.init=function(){var e=this;console.log("initialize");var t=localStorage.getItem("goldMinerSave");if(t){var n=JSON.parse(t);this.score=n.score,console.log("loaded: ",this.score),this.updateScoreDisplay()}var o=document.getElementById("clickButton"),i=document.getElementById("clickButton2");o&&o.addEventListener("click",(function(){return e.click()})),i&&(i.addEventListener("click",(function(){return e.click2()})),console.log("clickButton2")),document.getElementById("player-inventory").textContent="x/".concat(this.player.inventorySpace),this.mapManager.initializeMap(),this.mapManager.startTravel({x:4,y:4},this.player)},e}();t.GameEngine=r},533:function(e,t,n){var o=this&&this.__assign||function(){return o=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},o.apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.MapManager=void 0,t.selectTravelOption=function(e){console.log("selectOption");var t=document.querySelectorAll(".travel-button");t.forEach((function(e){e.classList.remove("selected");var t=e.nextElementSibling;t&&t.classList.contains("confirm-button")&&t.remove()}));var n=Array.from(t).find((function(t){return t.textContent===e}));n.classList.add("selected");var o=document.createElement("div");o.className="confirm-button",o.textContent="Confirm",o.onclick=function(){return function(e){document.getElementById("selected-option").textContent="Selected option: "+e}(e)},n.insertAdjacentElement("afterend",o),document.getElementById("selected-travel-button").textContent="Selected option: "+e};var i=n(573),r=n(706),a=n(490),s=function(){function e(){this.pathCounter=0,this.cellSize=25,this.grid=[];var e=document.getElementById("gameCanvas");this.ctx=e.getContext("2d")}return e.prototype.initializeMap=function(){this.grid=[[new i.MapNode(0,0,!0),new i.MapNode(1,0,!0),new i.MapNode(2,0,!0),new i.MapNode(3,0,!0),new i.MapNode(4,0,!0)],[new i.MapNode(0,1,!0),new i.MapNode(1,1,!1),new i.MapNode(2,1,!1),new i.MapNode(3,1,!1),new i.MapNode(4,1,!0)],[new i.MapNode(0,2,!0),new i.MapNode(1,2,!0),new i.MapNode(2,2,!0),new i.MapNode(3,2,!1),new i.MapNode(4,2,!0)],[new i.MapNode(0,3,!0),new i.MapNode(1,3,!1),new i.MapNode(2,3,!0),new i.MapNode(3,3,!0),new i.MapNode(4,3,!0)],[new i.MapNode(0,4,!0),new i.MapNode(1,4,!0),new i.MapNode(2,4,!0),new i.MapNode(3,4,!0),new i.MapNode(4,4,!0)]],this.drawMap(this.grid,this.ctx)},e.prototype.startTravel=function(e,t){var n,i=this;this.pathCounter=0;var a=null===(n=(0,r.aStar)(this.getMapNode(t.location.x,t.location.y),this.getMapNode(e.x,e.y),this.grid))||void 0===n?void 0:n.map((function(e){return o({},e)}));console.log(a),a&&(this.travelIntervalId=setInterval((function(){return i.calculateTravelDistance(a,t)}),1e3))},e.prototype.calculateTravelDistance=function(e,t){for(var n=t.speed;n>0&&this.pathCounter<e.length;)(n-=e[this.pathCounter].terrain.units)<0?e[this.pathCounter].terrain.units=Math.abs(n):n>=0&&this.pathCounter<e.length-1&&this.pathCounter++;t.location={x:e[this.pathCounter].coordinates.x,y:e[this.pathCounter].coordinates.y},console.log(t.location),this.drawMap(this.grid,this.ctx),this.drawPath(e,this.ctx),t.drawPlayer(this.ctx),(0,a.sendMessageToLog)("You travelled: ".concat(t.speed)),this.pathCounter+1===e.length&&void 0!==this.travelIntervalId&&(clearInterval(this.travelIntervalId),this.travelIntervalId=void 0,this.drawMap(this.grid,this.ctx),t.drawPlayer(this.ctx),(0,a.sendMessageToLog)("You have arrived!"))},e.prototype.drawMap=function(e,t){for(var n=0;n<e.length;n++)for(var o=0;o<e[n].length;o++)t.fillStyle=e[n][o].walkable?"white":"black",t.fillRect(o*this.cellSize,n*this.cellSize,this.cellSize,this.cellSize),t.strokeRect(o*this.cellSize,n*this.cellSize,this.cellSize,this.cellSize)},e.prototype.drawPath=function(e,t){if(e){t.fillStyle="green";for(var n=0,o=e;n<o.length;n++){var i=o[n];t.fillRect(i.coordinates.x*this.cellSize,i.coordinates.y*this.cellSize,this.cellSize,this.cellSize)}}},e.prototype.getMapNode=function(e,t){if(e<0||e>=this.grid[0].length||t<0||t>=this.grid.length)throw new Error("Coordinates out of bounds");return this.grid[t][e]},e}();t.MapManager=s},706:(e,t)=>{function n(e,t){for(var n=[],o=0,i=[[0,-1],[1,0],[0,1],[-1,0]];o<i.length;o++){var r=i[o],a=r[0],s=r[1],c=e.coordinates.x+a,l=e.coordinates.y+s;c>=0&&c<t[0].length&&l>=0&&l<t.length&&t[l][c].walkable&&n.push(t[l][c])}return n}Object.defineProperty(t,"__esModule",{value:!0}),t.aStar=function(e,t,o){var i=[],r=new Set;for(i.push(e);i.length>0;){for(var a=0,s=1;s<i.length;s++)i[s].f<i[a].f&&(a=s);var c=i[a];if(c.coordinates.x===t.coordinates.x&&c.coordinates.y===t.coordinates.y){for(var l=[],d=c;d;)l.push(d),d=d.parent;return l.reverse()}i.splice(a,1),r.add("".concat(c.coordinates.x,",").concat(c.coordinates.y));for(var u=function(e){if(r.has("".concat(e.coordinates.x,",").concat(e.coordinates.y)))return"continue";var n,o,a=c.g+1,s=!1;i.some((function(t){return t.coordinates.x===e.coordinates.x&&t.coordinates.y===e.coordinates.y}))?a<e.g&&(s=!0):(s=!0,e.h=(n=e,o=t,Math.abs(n.coordinates.x-o.coordinates.x)+Math.abs(n.coordinates.y-o.coordinates.y)),i.push(e)),s&&(e.parent=c,e.g=a,e.f=e.g+e.h)},h=0,p=n(c,o);h<p.length;h++)u(p[h])}return null}},133:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.addTravelButtonsListeners=function(){document.querySelectorAll(".travel-button").forEach((function(e){e.addEventListener("click",(function(){(0,o.selectTravelOption)(e.textContent)}))}))};var o=n(533)},490:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.sendMessageToLog=function(e){var t=document.createElement("div");t.textContent=e,n.insertBefore(t,n.firstChild)};var n=document.getElementById("log-container")},573:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MapNode=void 0;var o=n(518);t.MapNode=function(e,t,n,i,r,a,s){void 0===i&&(i=0),void 0===r&&(r=0),void 0===a&&(a=null),this.coordinates={x:e,y:t},this.walkable=n,this.g=i,this.h=r,this.f=i+r,this.parent=a,this.terrain=null!=s?s:new o.Terrain("Grass",90)}},70:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Player=void 0;var n=function(){function e(){this.width=25,this.height=25,this.inventorySpace=10,this.speed=50,this.location={x:0,y:0}}return e.prototype.drawPlayer=function(e){var t=25*this.location.x,n=25*this.location.y;console.log("drwa play",t,n,this.width/2,this.height),e.fillStyle="brown",e.fillRect(t,n,this.width/2,this.height),e.stroke()},e}();t.Player=n},518:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Terrain=void 0;t.Terrain=function(e,t){this.name=e,this.units=t}}},t={};function n(o){var i=t[o];if(void 0!==i)return i.exports;var r=t[o]={exports:{}};return e[o].call(r.exports,r,r.exports,n),r.exports}var o={};(()=>{var e=o;Object.defineProperty(e,"__esModule",{value:!0});var t=n(756),i=n(133),r=new t.GameEngine;document.addEventListener("DOMContentLoaded",(function(){(0,i.addTravelButtonsListeners)(),r.init()}))})();var i=exports;for(var r in o)i[r]=o[r];o.__esModule&&Object.defineProperty(i,"__esModule",{value:!0})})();