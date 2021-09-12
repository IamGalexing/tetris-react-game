var e=Object.defineProperty,r=Object.defineProperties,t=Object.getOwnPropertyDescriptors,o=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,n=(r,t,o)=>t in r?e(r,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[t]=o;import{q as s,C as c,R as i,$ as p,a as d}from"./vendor.a12572f0.js";const u=s.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  outline: none;
`,m=s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 40px;
  margin: 0 auto;

  .display {
    display: flex;
    justify-content: space-between;
    width: 380px;
  }
`,x=[40,100,300,1200],g={0:{shape:[[0]],color:"0, 0, 0"},I:{shape:[[0,"I",0,0],[0,"I",0,0],[0,"I",0,0],[0,"I",0,0]],color:"80, 227, 230"},J:{shape:[[0,"J",0],[0,"J",0],["J","J",0]],color:"36, 95, 223"},L:{shape:[[0,"L",0],[0,"L",0],[0,"L","L"]],color:"223, 173, 36"},O:{shape:[["O","O"],["O","O"]],color:"223, 217, 36"},S:{shape:[[0,"S","S"],["S","S",0],[0,0,0]],color:"48, 211, 56"},T:{shape:[[0,0,0],["T","T","T"],[0,"T",0]],color:"132, 61, 198"},Z:{shape:[["Z","Z",0],[0,"Z","Z"],[0,0,0]],color:"227, 78, 78"}},f=()=>Array.from(Array(20),(()=>Array(12).fill([0,"clear"]))),y=()=>{const e=["I","J","L","O","S","T","Z"],r=e[Math.floor(Math.random()*e.length)];return g[r]},b=(e,r,{x:t,y:o})=>{for(let l=0;l<e.tetromino.length;l++)for(let a=0;a<e.tetromino[l].length;a++)if(!(0===e.tetromino[l][a]||r[l+e.pos.y+o]&&r[l+e.pos.y+o][a+e.pos.x+t]&&"clear"===r[l+e.pos.y+o][a+e.pos.x+t][1]))return!0;return!1},h=s.div`
  display: grid;
  grid-template-columns: repeat(${12}, 30px);
  grid-template-rows: repeat(${20}, 30px);
  grid-gap: 1px;
  border: 1px solid #777;
  background: #222;
`,v=s.div`
  width: auto;
  background: rgba(${e=>e.color}, 0.8);
  border: ${e=>0===e.type?"0px solid":"4px solid"};
  border-bottom-color: rgba(${e=>e.color}, 0.1);
  border-right-color: rgba(${e=>e.color}, 1);
  border-top-color: rgba(${e=>e.color}, 1);
  border-left-color: rgba(${e=>e.color}, 0.3);
`;var w=c.exports.memo((({type:e})=>i.createElement(v,{type:e,color:g[e].color})));const E=({stage:e})=>i.createElement(h,null,e.map((e=>e.map(((e,r)=>i.createElement(w,{key:r,type:e[0]})))))),S=s.div`
  box-sizing: border-box;
  display: flex;
  align-items: space-between;
  margin: 0 0 20px 0;
  padding: 20px;
  border: 2px solid #777;
  min-height: 20px;
  width: 120px;
  border-radius: 10px;
  color: ${e=>e.gameOver?"red":"#999"};
  background: #000;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
`,O=({gameOver:e,text:r})=>i.createElement(S,{gameOver:e},r),$=s.button`
  box-sizing: border-box;
  margin: 0 0 20px 0;
  padding: 20px;
  min-height: 20px;
  width: 170px;
  border-radius: 10px;
  border: none;
  color: white;
  background: #111;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
`,k=({callback:e})=>i.createElement($,{onClick:e},"Start game");const I=()=>{const[e,s]=c.exports.useState({}),i=c.exports.useCallback((()=>s({pos:{x:4,y:0},tetromino:y().shape,collided:!1})),[]);return{player:e,updatePlayerPos:({x:e,y:c,collided:i})=>{s((s=>{return p=((e,r)=>{for(var t in r||(r={}))l.call(r,t)&&n(e,t,r[t]);if(o)for(var t of o(r))a.call(r,t)&&n(e,t,r[t]);return e})({},s),d={pos:{x:s.pos.x+=e,y:s.pos.y+=c},collided:i},r(p,t(d));var p,d}))},resetPlayer:i,playerRotate:r=>{const t=JSON.parse(JSON.stringify(e));var o;t.tetromino=(o=t.tetromino).map(((e,r)=>o.map((e=>e[r])))).map((e=>e.reverse()));const l=t.pos.x;let a=1;for(;b(t,r,{x:0,y:0});)if(t.pos.x+=a,a=-(a+(a>0?1:-1)),a>t.tetromino[0].length)return void(t.pos.x=l);s(t)}}},A=(e,r)=>{var t,o;const[l,a]=c.exports.useState(f()),[n,s]=c.exports.useState(0);return c.exports.useEffect((()=>{if(!e.pos)return;s(0);const t=t=>{const o=t.map((e=>e.map((e=>"clear"===e[1]?[0,"clear"]:e))));return e.tetromino.forEach(((r,t)=>{r.forEach(((r,l)=>{0!==r&&(o[t+e.pos.y][l+e.pos.x]=[r,""+(e.collided?"merged":"clear")])}))})),e.collided?(r(),(e=>e.reduce(((r,t)=>-1===t.findIndex((e=>0===e[0]))?(s((e=>e+1)),r.unshift(new Array(e[0].length).fill([0,"clear"])),r):(r.push(t),r)),[]))(o)):o};a((e=>t(e)))}),[e.collided,null==(t=e.pos)?void 0:t.x,null==(o=e.pos)?void 0:o.y,e.tetromino]),{stage:l,setStage:a,rowsCleared:n}},P=()=>{const[e,r]=c.exports.useState(null),[t,o]=c.exports.useState(!0),l=c.exports.useRef(null),{player:a,updatePlayerPos:n,resetPlayer:s,playerRotate:p}=I(),{stage:d,setStage:g,rowsCleared:y}=A(a,s),{score:h,setScore:v,rows:w,setRows:S,level:$,setLevel:P}=(e=>{const[r,t]=c.exports.useState(0),[o,l]=c.exports.useState(0),[a,n]=c.exports.useState(1);return c.exports.useEffect((()=>{e>0&&(t((r=>r+x[e-1]*a)),l((r=>r+e)))}),[e]),{score:r,setScore:t,rows:o,setRows:l,level:a,setLevel:n}})(y),L=e=>{b(a,d,{x:e,y:0})||n({x:e,y:0,collided:!1})};return function(e,r){const t=c.exports.useRef(null);c.exports.useEffect((()=>{t.current=e}),[e]),c.exports.useEffect((()=>{if(null!==r){const e=setInterval((function(){t.current&&t.current()}),r);return()=>{clearInterval(e)}}}),[r])}((()=>{t||w>10*$&&(P((e=>e+1)),r(1e3/$+200)),b(a,d,{x:0,y:1})?(a.pos.y<1&&(console.log("Game over!"),o(!0),r(null)),n({x:0,y:0,collided:!0})):n({x:0,y:1,collided:!1})}),e),i.createElement(u,{role:"button",tabIndex:0,onKeyDown:e=>(({code:e,repeat:o})=>{if(!t)if("ArrowLeft"===e)L(-1);else if("ArrowRight"===e)L(1);else if("ArrowDown"===e){if(o)return;r(30)}else"ArrowUp"!==e&&"Space"!==e||p(d)})(e),onKeyUp:({code:e})=>{t||"ArrowDown"!==e||r(1e3/$+200)},ref:l},i.createElement(m,null,i.createElement("div",{className:"display"},t?i.createElement(i.Fragment,null,i.createElement(O,{gameOver:t,text:"Game over!"}),i.createElement(k,{callback:()=>{l.current&&l.current.focus(),g(f()),r(1e3),s(),v(0),P(1),S(0),o(!1)}})):i.createElement(i.Fragment,null,i.createElement(O,{text:`Score: ${h}`}),i.createElement(O,{text:`Rows: ${w}`}),i.createElement(O,{text:`Level: ${$}`}))),i.createElement(E,{stage:d})))};const L=p`
  body {
    margin: 0;
    padding: 0;
    background: url(${"/assets/bg.84894c80.jpg"}) #000;
    background-size: cover;
    background-position: center;
  }
`;d.render(i.createElement(i.Fragment,null,i.createElement(L,null),i.createElement(P,null)),document.getElementById("root"));
