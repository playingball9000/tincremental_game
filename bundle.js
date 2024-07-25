(()=>{"use strict";var e={756:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GameEngine=void 0;var i=n(533),a=n(573),o=n(70),r=function(){function e(){this.player=new o.Player,this.mapManager=new i.MapManager,this.score=0,this.clickValue=2,this.autoIncrementValue=0}return e.prototype.click=function(){console.log("click1"),this.score+=this.clickValue,this.updateScoreDisplay()},e.prototype.click2=function(){console.log("click2"),this.score+=this.clickValue,this.autoIncrementValue+=1},e.prototype.autoIncrement=function(){console.log("autoIncrement"),this.score+=this.autoIncrementValue,this.updateScoreDisplay();for(var e=this.player.speed;e>0;);},e.prototype.updateScoreDisplay=function(){var e=document.getElementById("score");e&&(e.innerText="Score: ".concat(this.score))},e.prototype.init=function(){var e=this;console.log("initialize");var t=localStorage.getItem("goldMinerSave");if(t){var n=JSON.parse(t);this.score=n.score,console.log("loaded: ",this.score),this.updateScoreDisplay()}var i=document.getElementById("clickButton"),o=document.getElementById("clickButton2");i&&i.addEventListener("click",(function(){return e.click()})),o&&(o.addEventListener("click",(function(){return e.click2()})),console.log("clickButton2")),document.getElementById("player-inventory").textContent="x/".concat(this.player.inventorySpace),this.mapManager.initializeMap(),this.mapManager.startTravel(new a.MapNode(0,0,!0),new a.MapNode(4,4,!0),this.player)},e}();t.GameEngine=r},533:function(e,t,n){var i=this&&this.__assign||function(){return i=Object.assign||function(e){for(var t,n=1,i=arguments.length;n<i;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},i.apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.MapManager=void 0;var a=n(573),o=n(706),r=function(){function e(){this.pathCounter=0,this.cellSize=25,this.grid=[];var e=document.getElementById("gameCanvas");this.ctx=e.getContext("2d")}return e.prototype.initializeMap=function(){this.grid=[[new a.MapNode(0,0,!0),new a.MapNode(1,0,!0),new a.MapNode(2,0,!0),new a.MapNode(3,0,!0),new a.MapNode(4,0,!0)],[new a.MapNode(0,1,!0),new a.MapNode(1,1,!1),new a.MapNode(2,1,!1),new a.MapNode(3,1,!1),new a.MapNode(4,1,!0)],[new a.MapNode(0,2,!0),new a.MapNode(1,2,!0),new a.MapNode(2,2,!0),new a.MapNode(3,2,!1),new a.MapNode(4,2,!0)],[new a.MapNode(0,3,!0),new a.MapNode(1,3,!1),new a.MapNode(2,3,!0),new a.MapNode(3,3,!0),new a.MapNode(4,3,!0)],[new a.MapNode(0,4,!0),new a.MapNode(1,4,!0),new a.MapNode(2,4,!0),new a.MapNode(3,4,!0),new a.MapNode(4,4,!0)]],this.drawMap(this.grid,this.ctx)},e.prototype.startTravel=function(e,t,n){var a,r=this;this.pathCounter=0;var l=null===(a=(0,o.aStar)(e,t,this.grid))||void 0===a?void 0:a.map((function(e){return i({},e)}));console.log(l),l&&(this.intervalId=setInterval((function(){return r.calculateTravelDistance(l,t,n)}),1e3))},e.prototype.calculateTravelDistance=function(e,t,n){console.log("calculateTravelDistance");for(var i=n.speed;i>0&&this.pathCounter<e.length;)(i-=e[this.pathCounter].terrain.units)<0?e[this.pathCounter].terrain.units=Math.abs(i):i>=0&&this.pathCounter<e.length-1&&this.pathCounter++;n.location=[e[this.pathCounter].x,e[this.pathCounter].y],console.log(n.location),this.drawMap(this.grid,this.ctx),this.drawPath(e,this.ctx),n.drawPlayer(this.ctx),this.pathCounter+1===e.length&&void 0!==this.intervalId&&(clearInterval(this.intervalId),this.intervalId=void 0)},e.prototype.drawMap=function(e,t){for(var n=0;n<e.length;n++)for(var i=0;i<e[n].length;i++)t.fillStyle=e[n][i].walkable?"white":"black",t.fillRect(i*this.cellSize,n*this.cellSize,this.cellSize,this.cellSize),t.strokeRect(i*this.cellSize,n*this.cellSize,this.cellSize,this.cellSize)},e.prototype.drawPath=function(e,t){if(e){t.fillStyle="green";for(var n=0,i=e;n<i.length;n++){var a=i[n];t.fillRect(a.x*this.cellSize,a.y*this.cellSize,this.cellSize,this.cellSize)}}},e}();t.MapManager=r},706:(e,t)=>{function n(e,t){for(var n=[],i=0,a=[[0,-1],[1,0],[0,1],[-1,0]];i<a.length;i++){var o=a[i],r=o[0],l=o[1],s=e.x+r,c=e.y+l;s>=0&&s<t[0].length&&c>=0&&c<t.length&&t[c][s].walkable&&n.push(t[c][s])}return n}Object.defineProperty(t,"__esModule",{value:!0}),t.aStar=function(e,t,i){var a=[],o=new Set;for(a.push(e);a.length>0;){for(var r=0,l=1;l<a.length;l++)a[l].f<a[r].f&&(r=l);var s=a[r];if(s.x===t.x&&s.y===t.y){for(var c=[],h=s;h;)c.push(h),h=h.parent;return c.reverse()}a.splice(r,1),o.add("".concat(s.x,",").concat(s.y));for(var p=function(e){if(o.has("".concat(e.x,",").concat(e.y)))return"continue";var n,i,r=s.g+1,l=!1;a.some((function(t){return t.x===e.x&&t.y===e.y}))?r<e.g&&(l=!0):(l=!0,e.h=(n=e,i=t,Math.abs(n.x-i.x)+Math.abs(n.y-i.y)),a.push(e)),l&&(e.parent=s,e.g=r,e.f=e.g+e.h)},u=0,d=n(s,i);u<d.length;u++)p(d[u])}return null}},573:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MapNode=void 0;var i=n(518);t.MapNode=function(e,t,n,a,o,r,l){void 0===a&&(a=0),void 0===o&&(o=0),void 0===r&&(r=null),this.x=e,this.y=t,this.walkable=n,this.g=a,this.h=o,this.f=a+o,this.parent=r,this.terrain=null!=l?l:new i.Terrain("Grass",90)}},70:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Player=void 0;var n=function(){function e(){this.width=25,this.height=25,this.inventorySpace=10,this.speed=50,this.location=[0,0]}return e.prototype.drawPlayer=function(e){var t=25*this.location[0],n=25*this.location[1];console.log("drwa play",t,n,this.width/2,this.height),e.fillStyle="brown",e.fillRect(t,n,this.width/2,this.height),e.stroke()},e}();t.Player=n},518:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Terrain=void 0;t.Terrain=function(e,t){this.name=e,this.units=t}}},t={};function n(i){var a=t[i];if(void 0!==a)return a.exports;var o=t[i]={exports:{}};return e[i].call(o.exports,o,o.exports,n),o.exports}var i={};(()=>{var e=i;Object.defineProperty(e,"__esModule",{value:!0});var t=new(n(756).GameEngine);document.addEventListener("DOMContentLoaded",(function(){t.init()}))})();var a=exports;for(var o in i)a[o]=i[o];i.__esModule&&Object.defineProperty(a,"__esModule",{value:!0})})();