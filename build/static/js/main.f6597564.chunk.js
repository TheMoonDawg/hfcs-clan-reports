(this["webpackJsonphfcs-clan-reports"]=this["webpackJsonphfcs-clan-reports"]||[]).push([[0],{115:function(e,t,n){},145:function(e,t,n){"use strict";n.r(t);n(115);var a=n(0),r=n.n(a),s=n(10),o=n.n(s),i=n(27),c=n(18),l=n(19),u=n(21),d=n(20),j=n(15),h=n(52),b=n(216),p=n(97),O=n(200),g=n(221),x=n(195),m=n(198),f=n(196),v=n(148),C=n(197),S=n(199),w=n(43),N=n(192),y=n(98),k=n(23),R=n(147);function I(){var e=Object(k.a)();return Object(y.a)(e.breakpoints.keys).reverse().reduce((function(t,n){var a=Object(R.a)(e.breakpoints.up(n));return!t&&a?n:t}),null)||"xs"}var F=n.p+"static/media/background.f0b360b0.jpg",L=n(191);function B(e){return Object(L.a)("md",e)}var P=n(2),E=Object(N.a)((function(e){var t=e.mixins,n=e.spacing,a=e.palette;return{drawerPaper:{position:"relative",width:240},toolbar:t.toolbar,link:{textDecoration:"none",color:"inherit"},container:{display:"flex",flexDirection:"column",height:"100%"},resourcesLabel:{marginLeft:n.unit,marginBottom:3*n.unit},resourcesContainer:{marginLeft:n.unit,"& > a":{display:"block",color:a.common.white,textDecoration:"none",marginBottom:n.unit}},flex:{flex:1}}}));function D(e){var t=e.user,n=e.drawerOpen,r=e.toggleDrawer,s=E(),o=I(),i=Object(a.useState)(!1),c=Object(p.a)(i,2),l=c[0],u=c[1],d=t?{__html:t.resources}:null,j=B(o),b=j?"permanent":"temporary";return Object(P.jsxs)(g.a,{open:n,onClose:r,variant:b,classes:{paper:s.drawerPaper},children:[j&&Object(P.jsx)("div",{className:s.toolbar}),Object(P.jsxs)(f.a,{children:[Object(P.jsx)(h.b,{className:s.link,to:"/search",children:Object(P.jsxs)(v.a,{button:!0,children:[Object(P.jsx)(C.a,{children:Object(P.jsx)(m.a,{children:"search"})}),Object(P.jsx)(S.a,{primary:"Search"})]})}),Object(P.jsx)(h.b,{className:s.link,to:"/new",children:Object(P.jsxs)(v.a,{button:!0,children:[Object(P.jsx)(C.a,{children:Object(P.jsx)(m.a,{children:"create"})}),Object(P.jsx)(S.a,{primary:"New Report"})]})})]}),Object(P.jsx)(O.a,{}),Object(P.jsx)(f.a,{}),Object(P.jsxs)("div",{className:s.container,children:[t&&Object(P.jsx)(w.a,{variant:"headline",className:s.resourcesLabel,children:"Resources"}),Object(P.jsx)("div",{className:s.resourcesContainer,dangerouslySetInnerHTML:d}),Object(P.jsx)("span",{className:s.flex}),Object(P.jsx)(x.a,{in:l,timeout:{enter:2e3},children:Object(P.jsx)("img",{src:F,onLoad:function(){u(!0)},alt:"ninja"})})]})]})}var M=n(201),_=n(203),W=n(202),A=n(92),T=n.n(A),J=n(5),U=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var e=this.props,t=e.classes,n=e.user,a=e.onLogOut;return n&&Object(P.jsxs)(r.a.Fragment,{children:[Object(P.jsxs)("div",{className:t.container,children:[Object(P.jsxs)(w.a,{variant:"subheading",color:"inherit",children:["Welcome ",n.name,"!"]}),Object(P.jsx)(w.a,{className:t.logOut,variant:"subheading",color:"inherit",onClick:a,children:"Log Out"})]}),Object(P.jsx)("img",{className:t.avatar,src:n.avatarURL,alt:"avatar"})]})}}]),n}(a.Component),q=Object(J.a)((function(e){return{container:{display:"block",textAlign:"right"},logOut:{cursor:"pointer",textDecoration:"underline"},avatar:{width:45,height:45,marginLeft:2*e.spacing.unit}}}))(U);function z(e){this.status=e.status,this.statusText=e.statusText,this.name="Error"}var G=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=this.props.onError;this.state.clientId||fetch("../api/client_id").then((function(e){if(200===e.status)return e.json();throw new z(e)})).then((function(t){return e.setState({clientId:t})})).catch(t)}},{key:"render",value:function(){var e=this.props.classes,t=this.state.clientId,n=t?"https://www.bungie.net/en/OAuth/Authorize?client_id=".concat(t,"&response_type=code"):"";return n&&Object(P.jsx)("a",{className:e.link,href:n,children:"Log In"})}}]),n}(a.Component),Q=Object(J.a)((function(e){return{link:{color:e.palette.common.white}}}))(G),H=Object(N.a)((function(e){var t=e.zIndex,n=e.spacing;return{appBar:{zIndex:t.drawer+1},toolbar:{display:"flex"},flex:{flex:1},iconButton:{marginRight:n.unit},logOut:{cursor:"pointer",textDecoration:"underline"},avatar:{width:45,height:45,marginLeft:2*n.unit}}}));function V(e){var t=e.user,n=e.toggleDrawer,a=e.onLogOut,r=e.onError,s=H(),o=I();return Object(P.jsx)(M.a,{position:"absolute",className:s.appBar,children:Object(P.jsxs)(W.a,{className:s.toolbar,children:[B(o)?Object(P.jsx)(w.a,{variant:"title",color:"inherit",children:"HFCS Clan Reports"}):Object(P.jsx)(_.a,{className:s.iconButton,onClick:n,children:Object(P.jsx)(T.a,{})}),Object(P.jsx)("span",{className:s.flex}),t?Object(P.jsx)(q,{user:t,onLogOut:a}):Object(P.jsx)(Q,{onError:r})]})})}var Y=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={drawerOpen:!1},e.toggleDrawer=function(){return e.setState((function(e){return{drawerOpen:!e.drawerOpen}}))},e}return Object(l.a)(n,[{key:"render",value:function(){var e=this.state.drawerOpen,t=this.props,n=t.classes,a=t.user,r=t.onLogOut,s=t.onError,o=t.children;return Object(P.jsxs)("div",{className:n.root,children:[Object(P.jsx)(V,{user:a,toggleDrawer:this.toggleDrawer,onLogOut:r,onError:s}),Object(P.jsx)(D,{user:a,drawerOpen:e,toggleDrawer:this.toggleDrawer}),Object(P.jsxs)("main",{className:n.content,children:[Object(P.jsx)("div",{className:n.toolbar}),o]})]})}}]),n}(a.Component),K=Object(J.a)((function(e){return{root:{display:"flex",zIndex:1,height:"100%"},content:{flexGrow:1,backgroundColor:e.palette.background.default,padding:3*e.spacing.unit,minWidth:0,overflow:"auto"},toolbar:e.mixins.toolbar}}))(Y),X=n(46),Z=n(215),$=n(204),ee=n(214),te=n(206),ne=n(205),ae=n(213),re=n(223),se=n(217),oe=n(93),ie=n(207),ce=n(211),le=n(210),ue=n(208),de=n(209),je=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var e=this.props,t=e.classes,n=e.title,a=e.results;return Object(P.jsxs)($.a,{children:[Object(P.jsx)(ne.a,{title:"".concat(n," - ").concat(a.length," Reports")}),Object(P.jsx)(te.a,{className:t.content,children:Object(P.jsxs)(ie.a,{children:[Object(P.jsx)(ue.a,{children:Object(P.jsxs)(de.a,{children:[Object(P.jsx)(le.a,{padding:"dense",children:"Report Date"}),Object(P.jsx)(le.a,{padding:"dense",children:"Clan Name"}),Object(P.jsx)(le.a,{padding:"dense",children:"Motto"}),Object(P.jsx)(le.a,{padding:"dense",children:"Mission Statement"}),Object(P.jsx)(le.a,{padding:"dense",children:"Ninja"}),Object(P.jsx)(le.a,{padding:"dense",children:"Judgment"}),Object(P.jsx)(le.a,{padding:"dense",children:"Notes"}),Object(P.jsx)(le.a,{padding:"dense",children:"Link"})]})}),Object(P.jsx)(ce.a,{children:a.map((function(e){return Object(P.jsxs)(de.a,{children:[Object(P.jsx)(le.a,{padding:"dense",children:Object(oe.flow)(re.a,Object(se.a)("Pp"))(e.reportDate)}),Object(P.jsx)(le.a,{padding:"dense",children:e.clanName}),Object(P.jsx)(le.a,{padding:"dense",children:e.clanMotto}),Object(P.jsx)(le.a,{padding:"dense",children:e.clanMissionStatement}),Object(P.jsx)(le.a,{padding:"dense",children:e.ninja}),Object(P.jsx)(le.a,{padding:"dense",children:e.judgment}),Object(P.jsx)(le.a,{padding:"dense",children:e.notes}),Object(P.jsx)(le.a,{padding:"dense",children:Object(P.jsx)("a",{className:t.link,href:(n=e.clanId,"https://www.bungie.net/en/ClanV2/?groupid=".concat(n)),target:"_blank",rel:"noreferrer",children:Object(P.jsx)(_.a,{className:t.iconButton,children:Object(P.jsx)(m.a,{children:"open_in_new"})})})})]},e.id);var n}))})]})})]})}}]),n}(a.Component),he=Object(J.a)((function(e){var t=e.spacing;return{content:{overflow:"auto"},link:{textDecoration:"none"},iconButton:{width:4*t.unit,height:4*t.unit}}}))(je),be=n(218),pe=n(222),Oe=n(42),ge=n.n(Oe);function xe(e){return{Authorization:"Basic ".concat(e)}}function me(e,t){var n=e.cookieToken,a={method:"POST",body:JSON.stringify(t),headers:Object(i.a)({"Content-Type":"application/json"},xe(n))};return fetch("../api/new",a).then((function(e){if(200!==e.status)throw new z(e)}))}var fe=n(53),ve=n.n(fe);function Ce(e,t){var n={headers:xe(e.cookieToken)},a={clan_id:t};return fetch("../api/clan?".concat(ve.a.stringify(a)),n).then((function(e){if(200===e.status)return e.json();throw new z(e)}))}function Se(e,t){var n={headers:xe(e.cookieToken)};return fetch("../api/search?".concat(ve.a.stringify(t)),n).then((function(e){if(200===e.status)return e.json();throw new z(e)}))}var we="Ex:\nClan Reported:\nCLAN NAME (id: 123456)\n\nClan Motto:\nCLAN MOTTO\n\nClan Mission Statement:\nCLAN MISSION STATEMENT",Ne=function(e,t){var n=t.exec(e);return n?n[1]:""},ye={judgment:"Warning",id:"",name:"",motto:"",missionStatement:"",notes:"",parserClanId:"",parserQueue:we,required:!1,results:null},ke=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state=Object(i.a)({},ye),e.getInitState=function(){return Object(i.a)(Object(i.a)({},ye),{},{region:e.props.user.region})},e.onChange=function(t){return function(n){return e.setState(Object(X.a)({},t,n.target.value))}},e.onJudgmentChange=e.onChange("judgment"),e.onIdChange=e.onChange("id"),e.onNameChange=e.onChange("name"),e.onMottoChange=e.onChange("motto"),e.onMissionStatementChange=e.onChange("missionStatement"),e.onNotesChange=e.onChange("notes"),e.onRegionChange=e.onChange("region"),e.onParserClanIdChange=e.onChange("parserClanId"),e.onFocus=function(){return e.setState({parserQueue:""})},e.onBlur=function(){return e.setState({parserQueue:we})},e.onParse=function(t){var n=t.target.value.split(" \n").join("\n"),a=Ne(n,/[\s\S]*\(id: (.*)\)/);e.setState(Object(i.a)(Object(i.a)({},e.getInitState()),{},{id:a,name:Ne(n,/[\s\S]*Clan Reported:[\s\S](.*)\(id:/),motto:Ne(n,/[\s\S]*Clan Motto:[\s\S](.*)/),missionStatement:Ne(n,/[\s\S]*Clan Mission Statement:[\s\S]([\s\S]*.*)/)})),e.inputRef.blur(),a&&e.onFetchReports(a)},e.onIdBlur=function(){return e.onFetchReports(e.state.id)},e.onFetchClanData=function(){var t=e.state.parserClanId,n=e.props,a=n.user,r=n.onError;Ce(a,t).then((function(t){e.setState(Object(i.a)(Object(i.a)({},e.getInitState()),t)),e.onFetchReports(t.id)})).catch(r)},e.onFetchReports=function(t){var n=e.props,a=n.user,r=n.onError;e.setState({results:null}),Se(a,{clan_id:t}).then((function(t){e.setState({results:t})})).catch(r)},e.onCreateReport=function(){var t=e.state,n=t.id,a=t.name,r=t.motto,s=t.missionStatement,o=t.notes,i=t.judgment,c=t.region,l=e.props,u=l.user,d=l.onOpenSnackbar,j=l.onError;n.trim()&&a.trim()?(e.setState({required:!1}),me(u,{id:n,name:a,motto:r,missionStatement:s,notes:o,judgment:i,region:c}).then((function(){d("Report successfully added!"),e.setState(e.getInitState())})).catch(j)):e.setState({required:!0})},e}return Object(l.a)(n,[{key:"render",value:function(){var e=this,t=this.state,n=t.judgment,a=t.id,s=t.name,o=t.motto,i=t.missionStatement,c=t.notes,l=t.region,u=t.parserClanId,d=t.parserQueue,j=t.required,h=t.results,b=this.props,p=b.classes,O=b.user,g=O?O.name:null;return Object(P.jsxs)(r.a.Fragment,{children:[Object(P.jsxs)($.a,{className:p.card,children:[Object(P.jsx)(ne.a,{title:g}),Object(P.jsx)(te.a,{children:Object(P.jsxs)("div",{className:p.container,children:[Object(P.jsxs)("div",{className:p.reportContainer,children:[Object(P.jsxs)(be.a,{className:ge()(p.margin,p.textField200),fullWidth:!0,InputLabelProps:{shrink:!0},select:!0,label:"Judgment:",disabled:!O,value:n,onChange:this.onJudgmentChange,children:[Object(P.jsx)(ae.a,{value:"Warning",children:"Warning"}),Object(P.jsx)(ae.a,{value:"7 Day Ban",children:"7 Day Ban"}),Object(P.jsx)(ae.a,{value:"30 Day Ban",children:"30 Day Ban"}),Object(P.jsx)(ae.a,{value:"Permanent Ban",children:"Permanent Ban"})]}),Object(P.jsx)("br",{}),Object(P.jsx)(be.a,{type:"number",className:ge()(p.margin,p.textField200),fullWidth:!0,label:"Clan Id:",required:j,error:j,disabled:!O,value:a,onChange:this.onIdChange,onBlur:this.onIdBlur}),Object(P.jsx)("br",{}),Object(P.jsx)(be.a,{className:ge()(p.margin,p.textField400),fullWidth:!0,label:"Clan Name:",required:j,error:j,disabled:!O,value:s,onChange:this.onNameChange}),Object(P.jsx)("br",{}),Object(P.jsx)(be.a,{className:ge()(p.margin,p.textField400),fullWidth:!0,label:"Clan Motto:",disabled:!O,value:o,onChange:this.onMottoChange}),Object(P.jsx)("br",{}),Object(P.jsx)("div",{className:ge()(p.margin,p.textBoxContainer),children:Object(P.jsx)(be.a,{fullWidth:!0,multiline:!0,rowsMax:6,label:"Clan Mission Statement:",disabled:!O,value:i,onChange:this.onMissionStatementChange})}),Object(P.jsx)("div",{className:p.textBoxContainer,children:Object(P.jsx)(be.a,{fullWidth:!0,multiline:!0,rowsMax:6,label:"Notes:",disabled:!O,value:c,onChange:this.onNotesChange})}),Object(P.jsx)("br",{}),Object(P.jsxs)(be.a,{className:ge()(p.margin,p.textField200),fullWidth:!0,InputLabelProps:{shrink:!0},select:!0,label:"Region:",disabled:!O,value:l,onChange:this.onRegionChange,children:[Object(P.jsx)(ae.a,{value:"English",children:"English"}),Object(P.jsx)(ae.a,{value:"French",children:"French"}),Object(P.jsx)(ae.a,{value:"German",children:"German"}),Object(P.jsx)(ae.a,{value:"Italian",children:"Italian"}),Object(P.jsx)(ae.a,{value:"Polish",children:"Polish"}),Object(P.jsx)(ae.a,{value:"Portuguese",children:"Portuguese"}),Object(P.jsx)(ae.a,{value:"Spanish",children:"Spanish"})]})]}),Object(P.jsx)("span",{className:p.flex}),Object(P.jsxs)("div",{className:p.parserContainer,children:[Object(P.jsxs)("div",{className:p.parserClanIdContainer,children:[Object(P.jsx)(be.a,{type:"number",className:ge()(p.margin,p.textFieldParser),label:"Parser (Clan Id):",disabled:!O,value:u,onChange:this.onParserClanIdChange}),Object(P.jsx)(pe.a,{title:"Get Clan Data",disableFocusListener:!O,disableTouchListener:!O,disableHoverListener:!O,children:Object(P.jsx)("div",{children:Object(P.jsx)(_.a,{className:p.iconButton,disabled:!O,onClick:this.onFetchClanData,children:Object(P.jsx)(m.a,{children:"search"})})})})]}),Object(P.jsx)("br",{}),Object(P.jsx)("div",{className:p.textBoxContainer,children:Object(P.jsx)(be.a,{className:p.textFieldParser,inputRef:function(t){return e.inputRef=t},label:"Parser (Report Queue):",multiline:!0,rows:9,value:d,InputLabelProps:{shrink:!0},disabled:!O,onFocus:this.onFocus,onBlur:this.onBlur,onChange:this.onParse})})]})]})}),Object(P.jsx)(ee.a,{children:Object(P.jsx)(Z.a,{variant:"raised",color:"primary",disabled:!O,onClick:this.onCreateReport,children:"Create Report"})})]}),h&&Object(P.jsx)(he,{title:"Previous Offenses",results:h})]})}}],[{key:"getDerivedStateFromProps",value:function(e,t){return e.user&&!t.region?{region:e.user.region}:null}}]),n}(a.Component),Re=Object(J.a)((function(e){var t=e.spacing,n=e.palette,a=e.breakpoints;return{card:{marginBottom:3*t.unit},container:Object(X.a)({display:"flex"},a.down("md"),{display:"block"}),reportContainer:{flex:2,maxWidth:600},flex:{flex:1},margin:{marginBottom:t.unit},textField200:{maxWidth:200},textField400:{maxWidth:400},textBoxContainer:{background:n.secondary.main,borderRadius:4,padding:t.unit},parserContainer:{width:250},textFieldParser:{width:"100%"},parserClanIdContainer:{display:"flex",alignItems:"center"},iconButton:{width:4*t.unit,height:4*t.unit}}}))(ke);var Ie=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={redirect:!1},e.redirect=function(){return e.setState({redirect:!0})},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this.props,t=e.onSetUser,n=e.onError,a=ve.a.parse(this.props.location.search).code;a&&!localStorage.hasOwnProperty("user")&&function(e){return fetch("../api/login?code=".concat(e)).then((function(e){if(200===e.status)return e.json();throw new z(e)}))}(a).then(t).catch(n).then(this.redirect)}},{key:"render",value:function(){return this.state.redirect?Object(P.jsx)(j.a,{to:"/search"}):Object(P.jsx)(w.a,{variant:"title",children:"Logging In..."})}}]),n}(a.Component),Fe=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={id:"",name:""},e.onChange=function(t){return function(n){return e.setState(Object(X.a)({},t,n.target.value))}},e.onIdChange=e.onChange("id"),e.onNameChange=e.onChange("name"),e.onRegionChange=e.onChange("region"),e.onFetchReports=function(t){var n=e.props,a=n.user,r=n.onError;Se(a,t).then((function(t){e.setState({results:t})})).catch(r)},e.onSearch=function(){var t=e.state,n=t.id,a=t.name,r={clan_id:n.trim(),clan_name:a.trim()};e.onFetchReports(r)},e.onLast100Reports=function(){e.onFetchReports({last_100_reports:!0})},e.onLast100RegionalReports=function(){var t={region:e.state.region,last_100_regional_reports:!0};e.onFetchReports(t)},e.onUserLast100Reports=function(){e.onFetchReports({user_100_reports:!0})},e}return Object(l.a)(n,[{key:"render",value:function(){var e=this.state,t=e.id,n=e.name,a=e.region,s=e.results,o=this.props,i=o.classes,c=o.user;return Object(P.jsxs)(r.a.Fragment,{children:[Object(P.jsxs)($.a,{className:i.card,children:[Object(P.jsx)(ne.a,{title:"Search"}),Object(P.jsxs)(te.a,{children:[Object(P.jsx)(be.a,{type:"number",className:i.textField,label:"Clan Id:",disabled:!c,value:t,onChange:this.onIdChange}),Object(P.jsx)("br",{}),Object(P.jsx)(be.a,{className:i.textField,label:"Clan Name:",disabled:!c,value:n,onChange:this.onNameChange}),Object(P.jsx)("br",{}),Object(P.jsxs)(be.a,{className:i.textField,InputLabelProps:{shrink:!0},select:!0,label:"Region:",disabled:!c,value:a,onChange:this.onRegionChange,children:[Object(P.jsx)(ae.a,{value:"English",children:"English"}),Object(P.jsx)(ae.a,{value:"French",children:"French"}),Object(P.jsx)(ae.a,{value:"German",children:"German"}),Object(P.jsx)(ae.a,{value:"Italian",children:"Italian"}),Object(P.jsx)(ae.a,{value:"Polish",children:"Polish"}),Object(P.jsx)(ae.a,{value:"Portuguese",children:"Portuguese"}),Object(P.jsx)(ae.a,{value:"Spanish",children:"Spanish"})]})]}),Object(P.jsx)(ee.a,{children:Object(P.jsxs)("div",{className:i.buttonContainer,children:[Object(P.jsx)(Z.a,{className:i.button,variant:"raised",color:"primary",onClick:this.onSearch,disabled:!c||!t.trim()&&!n.trim(),children:"Search"}),Object(P.jsx)(Z.a,{className:i.button,variant:"outlined",onClick:this.onLast100Reports,disabled:!c,children:"Last 100 Reports"}),Object(P.jsx)(Z.a,{className:i.button,variant:"outlined",onClick:this.onLast100RegionalReports,disabled:!c,children:"Last 100 Regional Reports"}),Object(P.jsx)(Z.a,{className:i.button,variant:"outlined",onClick:this.onUserLast100Reports,disabled:!c,children:"Your Last 100 Reports"})]})})]}),s&&Object(P.jsx)(he,{title:"Search Results",results:s})]})}}],[{key:"getDerivedStateFromProps",value:function(e,t){return e.user&&!t.region?{region:e.user.region}:null}}]),n}(a.Component),Le=Object(J.a)((function(e){var t=e.spacing;return{card:{marginBottom:3*t.unit},textField:{width:200,marginBottom:t.unit},buttonContainer:{display:"flex",flexWrap:"wrap"},button:{margin:t.unit/2}}}))(Fe),Be=n(220),Pe=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).onClose=function(t,n){"timeout"===n&&e.props.onClose()},e}return Object(l.a)(n,[{key:"render",value:function(){var e=this.props,t=e.open,n=e.message;return Object(P.jsx)(Be.a,{anchorOrigin:{vertical:"bottom",horizontal:"right"},open:t,message:n,autoHideDuration:5e3,disableWindowBlurListener:!0,onClose:this.onClose})}}]),n}(a.PureComponent),Ee=n(95),De=n.n(Ee),Me=n(96),_e=Object(Me.a)({palette:{primary:{light:"#209CE0",main:"#103346",dark:"#103346",contrastText:"#FFF"},secondary:De.a,type:"dark"}}),We=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={user:null},e.onSetUser=function(t){localStorage.user=JSON.stringify(t),e.setState({user:t})},e.onLogOut=function(){localStorage.clear(),e.setState({user:null})},e.onError=function(t){var n=t.status,a=t.statusText;e.onOpenSnackbar(a),console.error(n,a),401===n&&e.onLogOut()},e.onOpenSnackbar=function(t){return e.setState({open:!0,message:t})},e.onCloseSnackbar=function(){return e.setState({open:!1})},e.indexComponent=function(){return Object(P.jsx)(j.a,{to:"/search"})},e.searchComponent=function(t){return Object(P.jsx)(Le,Object(i.a)({user:e.state.user,onError:e.onError},t))},e.newReportComponent=function(t){return Object(P.jsx)(Re,Object(i.a)({user:e.state.user,onError:e.onError,onOpenSnackbar:e.onOpenSnackbar},t))},e.redirectComponent=function(t){return Object(P.jsx)(Ie,Object(i.a)({onSetUser:e.onSetUser,onError:e.onError},t))},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){localStorage.hasOwnProperty("user")&&this.setState({user:JSON.parse(localStorage.user)})}},{key:"render",value:function(){var e=this.state,t=e.user,n=e.open,a=e.message;return Object(P.jsx)(b.a,{theme:_e,children:Object(P.jsx)(h.a,{children:Object(P.jsxs)(K,{user:t,onLogOut:this.onLogOut,onError:this.onError,children:[Object(P.jsx)(j.b,{exact:!0,path:"/",component:this.indexComponent}),Object(P.jsx)(j.b,{exact:!0,path:"/search",component:this.searchComponent}),Object(P.jsx)(j.b,{exact:!0,path:"/new",component:this.newReportComponent}),Object(P.jsx)(j.b,{exact:!0,path:"/redirect",component:this.redirectComponent}),Object(P.jsx)(Pe,{open:n,message:a,onClose:this.onCloseSnackbar})]})})})}}]),n}(a.Component);o.a.render(Object(P.jsx)(We,{}),document.getElementById("root"))}},[[145,1,2]]]);
//# sourceMappingURL=main.f6597564.chunk.js.map