(this["webpackJsonpfcom-quiz-app"]=this["webpackJsonpfcom-quiz-app"]||[]).push([[0],{106:function(e,t){},108:function(e,t){},118:function(e,t,r){"use strict";r.r(t),r.d(t,"getLoginUrl",(function(){return n})),r.d(t,"getLogoutUrl",(function(){return c})),r.d(t,"getValidateUrl",(function(){return i}));const s=r(119),a=r(60),o=r(59),n=function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=l(e),n=o.isParamExistsInUrl(e.redirectUrl,"status")?{service:s(e.redirectUrl)}:{service:s(e.redirectUrl,{queryParams:{status:a.CAS_STATUS_IN_PROCESS}})};switch(t&&(n.gateway=!0),e.version){case a.CAS_VERSION_2_0:case a.CAS_VERSION_3_0:return s(r,{path:"login",queryParams:n});default:throw o.throwError("Unsupported CAS Version")}},c=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=l(e),n=s(window.location.origin,{path:t}),c={};switch(e.version){case a.CAS_VERSION_2_0:o.isEmpty(t)||(c={url:n});break;case a.CAS_VERSION_3_0:o.isEmpty(t)||(c={service:n});break;default:throw o.throwError("Unsupported CAS Version")}let i={path:"logout"};return 0!==Object.keys(c).length&&(i.queryParams=c),s(r,i)},i=(e,t)=>{let r=l(e,!0),n={service:e.redirectUrl,ticket:t},c="";switch(e.version){case a.CAS_VERSION_2_0:c="serviceValidate";break;case a.CAS_VERSION_3_0:c="p3/serviceValidate",n.format="json";break;default:throw o.throwError("Unsupported CAS Version")}return o.isEmpty(e.proxy_callback_url)||(n.pgtUrl=e.proxy_callback_url),s(r,{path:c,queryParams:n})},l=function(e){if(arguments.length>1&&void 0!==arguments[1]&&arguments[1]&&e.validation_proxy){const t=o.isEmpty(e.validation_proxy_protocol)?o.getFullProtocol(window.location.protocol):o.getFullProtocol(e.validation_proxy_protocol);window.location.origin.replace(/(^\w+:|^)\/\//,"");return t+(o.isEmpty(e.validation_proxy_endpoint)?window.location.origin.replace(/(^\w+:|^)\/\//,""):e.validation_proxy_endpoint)+e.validation_proxy_path}return o.getFullProtocol(e.protocol)+e.endpoint+e.path}},120:function(e,t,r){"use strict";r.r(t);var s=r(1),a=r.n(s),o=r(61),n=r.n(o),c=(r(67),r(0));var i=function(e){let{handleSubmit:t,setWithTimer:r,loading:s,loadingQuestions:a,quizInProgress:o,isShown:n,togglePassword:i,currentPlayer:l,handleLogout:d,handleProfile:u}=e;return Object(c.jsxs)("header",{children:[l&&Object(c.jsxs)("div",{children:[Object(c.jsxs)("h1",{children:["Hola, ",l.name]}),Object(c.jsxs)("div",{className:"buttons-section",children:[Object(c.jsx)("button",{className:"btn bg-green",type:"button",onClick:u,children:"Mis Puntajes"}),Object(c.jsx)("button",{className:"btn bg-red",type:"button",onClick:d,children:"Salir"})]})]}),!l&&Object(c.jsxs)("form",{onSubmit:t,children:[Object(c.jsxs)("div",{className:"form-group",children:[Object(c.jsx)("label",{htmlFor:"email",children:"Email"}),Object(c.jsx)("input",{type:"text",id:"email",defaultValue:"email",disabled:s||o})]}),Object(c.jsxs)("div",{className:"form-group",children:[Object(c.jsx)("label",{htmlFor:"password",children:"Contrase\xf1a"}),Object(c.jsx)("input",{id:"password",type:n?"text":"password",defaultValue:"contrase\xf1a",disabled:s||o}),Object(c.jsxs)("div",{className:"checkbox-container",children:[Object(c.jsx)("label",{htmlFor:"checkbox",children:"Mostrar "}),Object(c.jsx)("input",{id:"checkbox",type:"checkbox",checked:n,onChange:i})]})]}),Object(c.jsx)("div",{className:"form-group",children:Object(c.jsx)("button",{className:"btn",type:"submit",disabled:s||o,children:s?"Loading...":o?"En juego":"Ingresar"})})]})]})};var l=function(e){let{questionNum:t,totalQuestions:r,percentage:a}=e;const o=Object(s.useRef)();return Object(s.useEffect)((()=>{o.current.style.setProperty("--progress",a)}),[a]),Object(c.jsxs)("div",{className:"progress-conatiner",children:[Object(c.jsxs)("div",{className:"progress-text",children:["Pregunta ",t," de ",r]}),Object(c.jsx)("div",{ref:o,className:"progress-bar"})]})};var d=function(e){let{score:t,timer:r,withTimer:s}=e;return Object(c.jsxs)("div",{className:"score-timer-container",children:[s&&Object(c.jsxs)("div",{className:"score-timer-border",children:[Object(c.jsx)("div",{className:"score-timer-text",children:"Timer"}),Object(c.jsx)("div",{className:"score-timer-number",children:r})]}),Object(c.jsxs)("div",{children:[Object(c.jsx)("div",{className:"score-timer-text",children:"Correctas"}),Object(c.jsx)("div",{className:"score-timer-number",children:t})]})]})};var u=function(e){let{question:t,handleAnswers:r,setTimer:a,withTimer:o,lastQuestion:n,gameEnded:i,timer:l}=e;const[d,u]=Object(s.useState)(!1),[h,j]=Object(s.useState)(""),m=Object(s.useRef)();return m.current=()=>{j(t.answer),u(!0),r({questionId:t._id,option:null,time:t.time-l,score:t.score+l,correct:!1})},Object(s.useEffect)((()=>{j(""),u(!1)}),[t]),Object(s.useEffect)((()=>{if(!o)return;let e=t.time;const r=setInterval((()=>(a(e),e--,d?(a(0),clearInterval(r)):e<0&&!d?(a(0),m.current(),console.log("timeout"),clearInterval(r)):void 0)),1e3);return()=>clearInterval(r)}),[o,t,a,d]),Object(c.jsxs)("article",{className:"question",children:[Object(c.jsx)("h2",{children:t.question}),Object(c.jsx)("ul",{children:t.options.map(((e,s)=>d?Object(c.jsx)("li",{className:"answered\n\t\t\t\t\t\t\t\t".concat(e===h?e.correct?"isRight":"isWrong":h!==t.answer&&e.correct?"isRight":""," \n\t\t\t\t\t\t\t"),children:e.content},e._id):Object(c.jsx)("li",{onClick:()=>(e=>{j(e),u(!0),r({questionId:t._id,option:e._id,time:t.time-l,score:t.score+l,correct:e.correct})})(e),children:e.content},e._id)))}),d&&!n&&Object(c.jsxs)("p",{children:["Cargando siguiente pregunta... ",Object(c.jsx)("span",{className:"loader",children:"\u23f3"})]}),d&&n&&Object(c.jsx)("p",{children:"\xa1Terminaste! \ud83c\udfc1"}),d&&n&&!i&&Object(c.jsxs)("p",{children:["Calculando nota... ",Object(c.jsx)("span",{className:"loader",children:"\u23f3"})]})]})},h=r(6),j=r.n(h),m=r(2),p=r(62);const g="https://engine-fcom.onrender.com/api";var b=function(e){let{setError:t}=e;const[r,a]=Object(s.useState)(!1),[o,n]=Object(s.useState)(null),[i,l]=Object(s.useState)("");return Object(s.useEffect)((()=>{(async()=>{a(!0);try{const t=await(async()=>{const e=m.ReactSession.get("gameName"),t=m.ReactSession.get("email");try{const r=await j()({method:"GET",url:g+"/game/scores",params:{gameName:e,email:t},headers:{Authorization:"Bearer "+m.ReactSession.get("token")}});return r.length>0?{code:400,errors:"\ud83d\ude41 No logramos encontrar los puntajes a\xfan!"}:{code:200,message:r,user:t}}catch(r){return console.log(r),{code:500,errors:"\ud83d\ude41 Ocurri\xf3 un error y no logramos recuperar los puntajes."}}})(),o=t.message.data;if(!o.length>0)return a(!1);const c=(s=o,Object.values(s).sort(((e,t)=>t.finalScore-e.finalScore))),i=(e=c,r=t.user,e.find((e=>e.email===r)));l(i),n(c)}catch(o){console.log(o),t("\ud83d\ude41 Error loading leaderboard.")}var e,r,s;a(!1)})()}),[t]),Object(c.jsxs)("div",{className:"leaderboard",children:[i&&Object(c.jsxs)("div",{className:"leaderboard-group gold",children:[Object(c.jsx)("h3",{children:"Tu puntaje Obtenido"}),Object(c.jsxs)("span",{children:[i.email," - ",i.finalScore]}),Object(c.jsxs)("h5",{children:["Nota: ",(i.grade/10).toFixed(1)]})]}),Object(c.jsx)("h1",{children:"RANKING \ud83c\udfc6"}),o&&Object(c.jsxs)("div",{className:"leaderboard-group",children:[Object(c.jsx)("h3",{children:"Top 10"}),Object(c.jsx)("ul",{children:o.filter(((e,t)=>t<10)).map(((e,t)=>Object(c.jsxs)("li",{children:[0===t&&"\ud83e\udd47 ",1===t&&"\ud83e\udd48 ",2===t&&"\ud83e\udd49 ",e.email," - ",e.finalScore]},t)))})]},""),r&&Object(c.jsx)("h3",{children:"Cargando ranking..."}),!o&&!r&&Object(c.jsx)("h3",{children:"\xa1A\xfan sin puntajes!"})]})};var O=function(e){let{category:t,score:r,setError:a,resetGame:o}=e;const[n,i]=Object(s.useState)("");return Object(c.jsx)(s.Fragment,{children:Object(c.jsx)("h3",{children:"Revisa tu calificaci\xf3n \ud83d\ude4c"})})};var S=function(e){let{user:t,setError:r,resetGame:a}=e;const[o,n]=Object(s.useState)(!1),[i,l]=Object(s.useState)(null);return Object(s.useEffect)((()=>{(async()=>{n(!0);try{const e=await(async()=>{const e=m.ReactSession.get("email");try{const t=await j()({method:"GET",url:g+"/game/grades",params:{email:e},headers:{Authorization:"Bearer "+m.ReactSession.get("token")}});return t.length>0?{code:400,errors:"\ud83d\ude41 No logramos encontrar los puntajes a\xfan!"}:{code:200,message:t,user:e}}catch(t){return console.log(t),{code:500,errors:"\ud83d\ude41 Ocurri\xf3 un error y no logramos recuperar los puntajes."}}})();let t=[];t=e.message.data,l(t)}catch(e){console.log(e),r("\ud83d\ude41 Error.")}n(!1)})()}),[r]),Object(c.jsxs)("div",{className:"leaderboard",children:[Object(c.jsx)("h3",{children:"Revisa tus calificaciones \ud83d\udda5"}),i&&Object(c.jsx)("div",{className:"leaderboard-group",children:Object(c.jsxs)("table",{children:[Object(c.jsx)("thead",{children:Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{children:"Fecha"}),Object(c.jsx)("th",{children:"Test"}),Object(c.jsx)("th",{children:"Nota"}),Object(c.jsx)("th",{children:"Puntaje"})]})}),Object(c.jsx)("tbody",{children:i.map(((e,t)=>Object(c.jsxs)("tr",{children:[Object(c.jsx)("td",{children:new Date(e.updated_at).toLocaleDateString()}),Object(c.jsx)("td",{children:e.gameName}),Object(c.jsx)("td",{children:(e.grade/10).toFixed(1)}),Object(c.jsx)("td",{children:e.finalScore})]},t)))})]})}),o&&Object(c.jsx)("h3",{children:"Cargando calificaciones..."}),!i&&!o&&Object(c.jsx)("h3",{children:"\xa1A\xfan sin puntajes!"})]})};const _=r(88),x=r(89),f=r(59),v=r(118),R=r(60),E={protocol:"https",path:"/cas",version:R.CAS_VERSION_3_0,proxy_callback_url:"",validation_proxy:!1,validation_proxy_protocol:"",validation_proxy_endpoint:"",validation_proxy_path:""};var y=class{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};f.isEmpty(e)&&f.throwError("Missing endpoint");let r=t.version||E.version;R.CAS_VERSIONS.includes(r)||f.throwError("Unsupported CAS Version"),this.endpoint=e,this.path=t.path||E.path,this.protocol=t.protocol||E.protocol,this.version=t.version||E.version,this.proxy_callback_url=t.proxy_callback_url||E.proxy_callback_url,this.validation_proxy=t.validation_proxy||E.validation_proxy,this.validation_proxy_protocol=t.validation_proxy_protocol||E.validation_proxy_protocol,this.validation_proxy_endpoint=t.validation_proxy_endpoint||E.validation_proxy_endpoint,this.validation_proxy_path=t.validation_proxy_path||E.validation_proxy_path,this.redirectUrl=f.getCurrentUrl()}auth(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return new Promise(((t,r)=>{const s=f.getParamFromCurrentUrl("ticket");if(console.log("ticket",s),f.isEmpty(s)){f.getParamFromCurrentUrl("status")===R.CAS_STATUS_IN_PROCESS?this._handleFailsValdiate(r,{type:R.CAS_ERROR_AUTH_ERROR,message:"Missing ticket from return url"}):window.location.href=v.getLoginUrl(this,e)}else this._validateTicket(s,t,r)}))}logout(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";window.location.href=v.getLogoutUrl(this,e)}_getSuccessResponse(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r={currentUrl:window.location.origin+window.location.pathname,currentPath:window.location.pathname,user:e};return t&&(r.pgtIou=t),r}_validateTicket(e,t,r){let s,a=this.version;switch(a){case R.CAS_VERSION_2_0:s="text/xml";break;case R.CAS_VERSION_3_0:s="application/json";break;default:throw f.throwError("Unsupported CAS Version")}_(v.getValidateUrl(this,e),{headers:{"Content-Type":s}}).then(function(e){console.log("response",e),e.text().then(function(e){switch(a){case R.CAS_VERSION_2_0:x.parseStringPromise(e).then(function(e){let s=e["cas:serviceResponse"];if(s["cas:authenticationSuccess"]){let e=s["cas:authenticationSuccess"];if(e.length){let r=e[0]["cas:user"][0],s=null;f.isEmpty(this.proxy_callback_url)||(s=e[0]["cas:proxyGrantingTicket"][0]),this._handleSuccessValdiate(t,r,s),this._handleSuccessValdiate(t,r)}}else{let e=s["cas:authenticationFailure"];e.length&&this._handleFailsValdiate(r,{type:R.CAS_ERROR_AUTH_ERROR,code:e[0].$.code.trim(),message:e[0]._.trim()})}}.bind(this)).catch(function(e){this._handleFailsValdiate(r,{type:R.CAS_ERROR_PARSE_RESPONSE,message:"Failed to parse response",exception:e})}.bind(this));break;case R.CAS_VERSION_3_0:try{let s=JSON.parse(e);if(s.serviceResponse)if(s.serviceResponse.authenticationSuccess){let e=s.serviceResponse.authenticationSuccess.user,r=null;f.isEmpty(this.proxy_callback_url)||(r=s.serviceResponse.authenticationSuccess.proxyGrantingTicket),this._handleSuccessValdiate(t,e,r)}else this._handleFailsValdiate(r,{type:R.CAS_ERROR_AUTH_ERROR,code:s.serviceResponse.authenticationFailure.code,message:s.serviceResponse.authenticationFailure.description})}catch(s){this._handleFailsValdiate(r,{type:R.CAS_ERROR_PARSE_RESPONSE,message:"Failed to parse response",exception:s})}break;default:throw f.throwError("Unsupported CAS Version")}throw f.throwError("Stop...")}.bind(this)).catch(function(e){this._handleFailsValdiate(r,{type:R.CAS_ERROR_PARSE_RESPONSE,message:"Failed to parse response",exception:e})}.bind(this))}.bind(this)).catch(function(e){this._handleFailsValdiate(r,{type:R.CAS_ERROR_FETCH,message:"Failed to connect CAS server",exception:e})}.bind(this))}_handleSuccessValdiate(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;e(this._getSuccessResponse(t,r))}_handleFailsValdiate(e,t){t.currentUrl=window.location.origin+window.location.pathname,t.currentPath=window.location.pathname,e(t)}};m.ReactSession.setStoreType("localStorage");let w=new y("sso.uc.cl",{version:R.CAS_VERSION_2_0});var N=function(){let e=null;void 0!==m.ReactSession.get("name")&&(e={name:m.ReactSession.get("name"),email:m.ReactSession.get("email")});const[t,r]=Object(s.useState)(e),[a,o]=Object(s.useState)(!1),[n,h]=Object(s.useState)(!1),[_,x]=Object(s.useState)(!1),[f,v]=Object(s.useState)(!1),[R,E]=Object(s.useState)(!1),[y,N]=Object(s.useState)(!0),[C,A]=Object(s.useState)(0),[P,k]=Object(s.useState)([]),[T,I]=Object(s.useState)("General Knowledge"),[V,U]=Object(s.useState)(null),[F,q]=Object(s.useState)(0),[D,G]=Object(s.useState)(0),[L,z]=Object(s.useState)([]),[H,M]=Object(s.useState)(0),[B,Q]=Object(s.useState)(!1),[J,K]=Object(s.useState)(!1),[W,$]=Object(s.useState)(!1),X=()=>{A(0),k([]),I("General Knowledge"),U(null),q(0),G(0),z([]),M(0),Q(!1),K(!1)},Y=Object(s.useRef)();return Y.current=()=>{let e=H;for(const t of L)null!==t&&t.isCorrectAnswer&&(e+=1);M(e),F<D&&(U(P[F]),q(F+1)),F===D&&K(!0)},Object(s.useEffect)((()=>{U(P[0]),q(1)}),[P]),Object(s.useEffect)((()=>{if(!L.length)return;const e=setTimeout((()=>Y.current()),1500);return()=>clearTimeout(e)}),[L]),Object(s.useEffect)((()=>{const e=setTimeout((()=>o(!1)),5e3);return()=>clearTimeout(e)}),[a]),Object(c.jsxs)(s.Fragment,{children:[Object(c.jsx)("div",{className:"game-title",children:Object(c.jsx)("a",{onClick:async e=>{e.preventDefault(),$(!1)},href:"/",children:Object(c.jsx)("h1",{children:" \ud83d\ude80 TEST DE ACTUALIDAD"})})}),Object(c.jsx)(i,{handleSubmit:async e=>{e.preventDefault(),v(!0),X();const s=e.target.email.value,n=e.target.password.value;t||await async function(){try{await(e=!1,new Promise(((t,r)=>{console.log("ASDASDASDA"),w.auth(e,"https://fcom-actualidad.github.io/test/").then((e=>{m.ReactSession.set("contextUser",e.mail),console.log("success"),console.log(e),console.log(e.mail)})).catch((e=>{console.log(e),r(e)}))}))),console.log("after login")}catch(a){console.error(a)}var e}();const c={code:300,data:{name:"Juanito",email:s}};200===c.code?(r(c.data),await(async e=>{try{const t=await j()({method:"POST",url:g+"/auth",data:e});return console.log("aut",t),201!==t.status?{code:400,errors:"\ud83d\ude41 No logramos iniciar sesi\xf3n!",data:t.data}:(console.log(t),m.ReactSession.set("token",t.data.token),{code:200,data:t.data})}catch(a){return console.log(a),{code:500,errors:"\ud83d\ude41 Ocurri\xf3 un error y no logramos iniciar sesi\xf3n. "}}})({email:s,password:n}),console.log("logueado!")):o(c.errors),v(!1)},setWithTimer:N,loading:f,loadingQuestions:R,quizInProgress:B,isShown:n,togglePassword:()=>{h((e=>!e))},currentPlayer:t,handleLogout:async e=>{e.preventDefault(),X(),m.ReactSession.remove("userName"),m.ReactSession.remove("name"),m.ReactSession.remove("email"),m.ReactSession.remove("gameName"),m.ReactSession.remove("gameId"),m.ReactSession.remove("token"),$(!1),r(null)},handleProfile:async e=>{e.preventDefault(),$(!0)}}),Object(c.jsxs)("div",{className:"container",children:[a&&Object(c.jsx)("div",{className:"error-message",children:a}),f&&Object(c.jsxs)("p",{children:["Cargando... ",Object(c.jsx)("span",{className:"loader",children:"\u23f3"})]}),t&&W&&(!B||J)&&Object(c.jsx)(s.Fragment,{children:Object(c.jsx)(S,{user:t,setError:o})}),t&&!W&&!B&&!_&&Object(c.jsxs)("form",{onSubmit:async e=>{e.preventDefault(),v(!0),X();const t=e.target.gameCode.value,r=await(async e=>{try{const t=await j()({method:"GET",url:g+"/game/checkGame",params:{gameName:e},headers:{Authorization:"Bearer "+m.ReactSession.get("token")}});return console.log("g",t),200!==t.status?{code:400,errors:"\ud83d\ude41 No logramos encontrar el juego!"}:(m.ReactSession.set("gameName",t.data.gameName),m.ReactSession.set("gameId",t.data._id),{code:200,data:t.data})}catch(a){return console.log(a),{code:404,errors:"\ud83d\ude41 No logramos encontrar el juego!"}}})(t);if(200===r.code){x(!0);let e=await(async e=>{try{const t=await j()({method:"GET",url:g+"/game/questions",params:{gameId:e},headers:{Authorization:"Bearer "+m.ReactSession.get("token")}});if(200!==t.status)return;return 405===t.data.code?{code:405,data:t.data}:(t.data.forEach((e=>{e.options.forEach((e=>{const t=Object(p.a)(e.correct);e.correct=t}))})),{code:200,data:t.data})}catch(a){return console.log(a),{code:404,errors:"\ud83d\ude41 No logramos encontrar el juego!"}}})(r.data._id);200===e.code?(e.data=e.data.sort((()=>Math.random()-.5)),e.data.forEach((e=>{e.options=e.options.sort((()=>Math.random()-.5))})),G(e.data.length),k(e.data),Q(!0)):405===e.code?K(!0):o(e.errors)}else o(r.errors);v(!1)},children:[Object(c.jsx)("div",{children:Object(c.jsx)("p",{children:"Para responder el test debes indicar primero el c\xf3digo espec\xedfico de la sesi\xf3n que te corresponde"})}),Object(c.jsxs)("div",{className:"form-group",children:[Object(c.jsx)("label",{htmlFor:"gameCode",children:"C\xf3digo de juego"}),Object(c.jsx)("input",{type:"text",id:"gameCode",defaultValue:"secreto"})]}),Object(c.jsx)("div",{className:"form-group",children:Object(c.jsx)("button",{className:"btn",type:"submit",disabled:f||B,children:f?"Loading...":B?"En juego":"Responder"})})]}),V&&!J&&Object(c.jsxs)(s.Fragment,{children:[Object(c.jsxs)("div",{className:"flex-between",children:[Object(c.jsx)(l,{questionNum:F,totalQuestions:D,percentage:(Z=F,ee=D,0===Z||0===ee?0:Math.floor(100*Z/ee))}),Object(c.jsx)(d,{question:V,score:H,withTimer:y,timer:C})]}),Object(c.jsx)(u,{question:V,handleAnswers:e=>{e&&(console.log("Post answer:",e,e.questionId,e.option,e.time),(async(e,t,r)=>{const s=m.ReactSession.get("gameId");try{const a=await j()({method:"POST",url:g+"/game/answer",data:{answerId:t,gameId:s,time:r,questionId:e},headers:{Authorization:"Bearer "+m.ReactSession.get("token")}});if(200!==a.status)return;return{code:200,data:a.data}}catch(a){return console.log(a),{code:404,errors:"\ud83d\ude41 Error al guardar la respuesta!"}}})(e.questionId,e.option,e.time),z((t=>[...t,e])),M(H+(e.correct?1:0)))},lastQuestion:F===D,gameEnded:J,setTimer:A,withTimer:y,timer:C})]}),J&&!W&&Object(c.jsx)(O,{category:T,score:H,setError:o,resetGame:X}),J&&!W&&Object(c.jsx)(b,{setError:o})]})]});var Z,ee};n.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(N,{})}),document.getElementById("root"))},59:function(e,t,r){"use strict";r.r(t),r.d(t,"isEmpty",(function(){return s})),r.d(t,"throwError",(function(){return a})),r.d(t,"getCurrentUrl",(function(){return o})),r.d(t,"getParamFromCurrentUrl",(function(){return n})),r.d(t,"getFullProtocol",(function(){return c})),r.d(t,"isParamExistsInUrl",(function(){return i}));const s=e=>void 0===e||null===e||""===e.toString().replace(/\s/g,""),a=e=>{throw new Error("[CasClient]: "+e)},o=function(){let e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=window.location.href;return e?t.replace(/(^|[&?])ticket(=[^&]*)?/,""):t},n=e=>new URL(window.location.href).searchParams.get(e),c=e=>["http","http:"].includes(e)?"http://":"https://",i=(e,t)=>null!==new URL(e).searchParams.get(t)},60:function(e,t,r){"use strict";r.r(t),r.d(t,"CAS_VERSION_2_0",(function(){return s})),r.d(t,"CAS_VERSION_3_0",(function(){return a})),r.d(t,"CAS_VERSIONS",(function(){return o})),r.d(t,"CAS_STATUS_IN_PROCESS",(function(){return n})),r.d(t,"CAS_ERROR_FETCH",(function(){return c})),r.d(t,"CAS_ERROR_PARSE_RESPONSE",(function(){return i})),r.d(t,"CAS_ERROR_AUTH_ERROR",(function(){return l}));const s="2.0",a="3.0",o=[s,a],n="in_process",c="FETCH_ERROR",i="PARSE_RESPONSE_ERROR",l="AUTH_ERROR"},67:function(e,t,r){}},[[120,1,2]]]);
//# sourceMappingURL=main.952fc75b.chunk.js.map