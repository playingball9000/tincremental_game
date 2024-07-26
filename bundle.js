(()=>{"use strict";var e={756:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GameEngine=void 0;var n=o(533),i=o(70),a=function(){function e(){this.player=new i.Player,this.mapManager=new n.MapManager,this.score=0,this.clickValue=2,this.autoIncrementValue=0}return e.prototype.click=function(){console.log("click1"),this.score+=this.clickValue,this.updateScoreDisplay()},e.prototype.click2=function(){console.log("click2"),this.score+=this.clickValue,this.autoIncrementValue+=1},e.prototype.autoIncrement=function(){console.log("autoIncrement"),this.score+=this.autoIncrementValue,this.updateScoreDisplay()},e.prototype.updateScoreDisplay=function(){var e=document.getElementById("score");e&&(e.innerText="Score: ".concat(this.score))},e.prototype.init=function(){var e=this;console.log("initialize");var t=localStorage.getItem("goldMinerSave");if(t){var o=JSON.parse(t);this.score=o.score,console.log("loaded: ",this.score),this.updateScoreDisplay()}var n=document.getElementById("clickButton"),i=document.getElementById("clickButton2");n&&n.addEventListener("click",(function(){return e.click()})),i&&(i.addEventListener("click",(function(){return e.click2()})),console.log("clickButton2")),document.getElementById("player-inventory").textContent="x/".concat(this.player.inventorySpace),this.mapManager.initializeMap(),this.mapManager.startTravel(this.player.location,{x:4,y:4},this.player)},e}();t.GameEngine=a},533:function(e,t,o){var n=this&&this.__assign||function(){return n=Object.assign||function(e){for(var t,o=1,n=arguments.length;o<n;o++)for(var i in t=arguments[o])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},n.apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.MapManager=void 0;var i=o(573),a=o(706),r=function(){function e(){this.pathCounter=0,this.cellSize=25,this.grid=[];var e=document.getElementById("gameCanvas");this.ctx=e.getContext("2d")}return e.prototype.initializeMap=function(){this.grid=[[new i.MapNode(0,0,!0),new i.MapNode(1,0,!0),new i.MapNode(2,0,!0),new i.MapNode(3,0,!0),new i.MapNode(4,0,!0)],[new i.MapNode(0,1,!0),new i.MapNode(1,1,!1),new i.MapNode(2,1,!1),new i.MapNode(3,1,!1),new i.MapNode(4,1,!0)],[new i.MapNode(0,2,!0),new i.MapNode(1,2,!0),new i.MapNode(2,2,!0),new i.MapNode(3,2,!1),new i.MapNode(4,2,!0)],[new i.MapNode(0,3,!0),new i.MapNode(1,3,!1),new i.MapNode(2,3,!0),new i.MapNode(3,3,!0),new i.MapNode(4,3,!0)],[new i.MapNode(0,4,!0),new i.MapNode(1,4,!0),new i.MapNode(2,4,!0),new i.MapNode(3,4,!0),new i.MapNode(4,4,!0)]],this.drawMap(this.grid,this.ctx)},e.prototype.startTravel=function(e,t,o){var i,r=this;this.pathCounter=0;var s=null===(i=(0,a.aStar)(this.getMapNode(e.x,e.y),this.getMapNode(t.x,t.y),this.grid))||void 0===i?void 0:i.map((function(e){return n({},e)}));console.log(s),s&&(this.intervalId=setInterval((function(){return r.calculateTravelDistance(s,o)}),1e3))},e.prototype.calculateTravelDistance=function(e,t){console.log("calculateTravelDistance");for(var o=t.speed;o>0&&this.pathCounter<e.length;)(o-=e[this.pathCounter].terrain.units)<0?e[this.pathCounter].terrain.units=Math.abs(o):o>=0&&this.pathCounter<e.length-1&&this.pathCounter++;t.location={x:e[this.pathCounter].coordinates.x,y:e[this.pathCounter].coordinates.y},console.log(t.location),this.drawMap(this.grid,this.ctx),this.drawPath(e,this.ctx),t.drawPlayer(this.ctx),this.pathCounter+1===e.length&&void 0!==this.intervalId&&(clearInterval(this.intervalId),this.intervalId=void 0)},e.prototype.drawMap=function(e,t){for(var o=0;o<e.length;o++)for(var n=0;n<e[o].length;n++)t.fillStyle=e[o][n].walkable?"white":"black",t.fillRect(n*this.cellSize,o*this.cellSize,this.cellSize,this.cellSize),t.strokeRect(n*this.cellSize,o*this.cellSize,this.cellSize,this.cellSize)},e.prototype.drawPath=function(e,t){if(e){t.fillStyle="green";for(var o=0,n=e;o<n.length;o++){var i=n[o];t.fillRect(i.coordinates.x*this.cellSize,i.coordinates.y*this.cellSize,this.cellSize,this.cellSize)}}},e.prototype.getMapNode=function(e,t){if(e<0||e>=this.grid[0].length||t<0||t>=this.grid.length)throw new Error("Coordinates out of bounds");return this.grid[t][e]},e}();t.MapManager=r},706:(e,t)=>{function o(e,t){for(var o=[],n=0,i=[[0,-1],[1,0],[0,1],[-1,0]];n<i.length;n++){var a=i[n],r=a[0],s=a[1],c=e.coordinates.x+r,l=e.coordinates.y+s;c>=0&&c<t[0].length&&l>=0&&l<t.length&&t[l][c].walkable&&o.push(t[l][c])}return o}Object.defineProperty(t,"__esModule",{value:!0}),t.aStar=function(e,t,n){var i=[],a=new Set;for(i.push(e);i.length>0;){for(var r=0,s=1;s<i.length;s++)i[s].f<i[r].f&&(r=s);var c=i[r];if(c.coordinates.x===t.coordinates.x&&c.coordinates.y===t.coordinates.y){for(var l=[],h=c;h;)l.push(h),h=h.parent;return l.reverse()}i.splice(r,1),a.add("".concat(c.coordinates.x,",").concat(c.coordinates.y));for(var d=function(e){if(a.has("".concat(e.coordinates.x,",").concat(e.coordinates.y)))return"continue";var o,n,r=c.g+1,s=!1;i.some((function(t){return t.coordinates.x===e.coordinates.x&&t.coordinates.y===e.coordinates.y}))?r<e.g&&(s=!0):(s=!0,e.h=(o=e,n=t,Math.abs(o.coordinates.x-n.coordinates.x)+Math.abs(o.coordinates.y-n.coordinates.y)),i.push(e)),s&&(e.parent=c,e.g=r,e.f=e.g+e.h)},p=0,u=o(c,n);p<u.length;p++)d(u[p])}return null}},573:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MapNode=void 0;var n=o(518);t.MapNode=function(e,t,o,i,a,r,s){void 0===i&&(i=0),void 0===a&&(a=0),void 0===r&&(r=null),this.coordinates={x:e,y:t},this.walkable=o,this.g=i,this.h=a,this.f=i+a,this.parent=r,this.terrain=null!=s?s:new n.Terrain("Grass",90)}},70:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Player=void 0;var o=function(){function e(){this.width=25,this.height=25,this.inventorySpace=10,this.speed=50,this.location={x:0,y:0}}return e.prototype.drawPlayer=function(e){var t=25*this.location.x,o=25*this.location.y;console.log("drwa play",t,o,this.width/2,this.height),e.fillStyle="brown",e.fillRect(t,o,this.width/2,this.height),e.stroke()},e}();t.Player=o},518:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Terrain=void 0;t.Terrain=function(e,t){this.name=e,this.units=t}}},t={};function o(n){var i=t[n];if(void 0!==i)return i.exports;var a=t[n]={exports:{}};return e[n].call(a.exports,a,a.exports,o),a.exports}var n={};(()=>{var e=n;Object.defineProperty(e,"__esModule",{value:!0});var t=new(o(756).GameEngine);document.addEventListener("DOMContentLoaded",(function(){t.init()}))})();var i=exports;for(var a in n)i[a]=n[a];n.__esModule&&Object.defineProperty(i,"__esModule",{value:!0})})();