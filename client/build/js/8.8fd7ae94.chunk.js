(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{529:function(t,e,n){"use strict";function a(t){return t.substring(0,1).toUpperCase()+t.substring(1)}n.d(e,"a",(function(){return a}))},530:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var a=function(t){var e=[];return t=(t+="").split("").reverse().join("").split("").map((function(n,a){e.push(n),(a+1)%3==0&&a<t.split("").length-1&&e.push(",")})),e.reverse().join("")}},536:function(t,e,n){"use strict";n.r(e);var a=n(6),r=n.n(a),s=n(20),i=n.n(s),c=n(62),l=n.n(c),u=n(63),o=n.n(u),p=n(71),f=n.n(p),m=n(64),h=n.n(m),d=n(65),v=n.n(d),y=n(45),E=n.n(y),g=n(90),w=n.n(g),b=n(0),N=n.n(b),k=n(114),x=n(529),j=n(530),C=n(72),R=n(55);function S(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,a=E()(t);if(e){var r=E()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return v()(this,n)}}var D=function(t){h()(a,t);var e,n=S(a);function a(){var t;l()(this,a);for(var e=arguments.length,r=new Array(e),s=0;s<e;s++)r[s]=arguments[s];return t=n.call.apply(n,[this].concat(r)),w()(f()(t),"state",{artist:null,invalidId:!1}),t}return o()(a,[{key:"componentDidMount",value:(e=i()(r.a.mark((function t(){var e;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(C.e)(this.props.match.params.id);case 2:if("invalid id"!=(e=t.sent)){t.next=5;break}return t.abrupt("return",this.setState({invalidId:!0}));case 5:this.setState({artist:e});case 6:case"end":return t.stop()}}),t,this)}))),function(){return e.apply(this,arguments)})},{key:"render",value:function(){var t=this;return this.state.artist?N.a.createElement("div",{className:"artist_individual"},N.a.createElement("div",{className:"artistCard"},this.state.artist.images.length?N.a.createElement("img",{src:this.state.artist.images[1].url}):N.a.createElement(R.c,null),N.a.createElement("div",null,N.a.createElement("h2",null,this.state.artist.name),N.a.createElement("div",{className:"primaryText"},this.state.artist.genres.map((function(e,n){return N.a.createElement("span",{key:n},Object(x.a)(e),n>=0&&n===t.state.artist.genres.length-1?"":",","  ")}))),N.a.createElement("div",{className:"secondaryText"},this.state.artist.popularity,"% Popular"),N.a.createElement("div",{className:"secondaryText"},Object(j.a)(this.state.artist.followers.total)," Followers"),N.a.createElement("a",{className:"linkClass",href:this.state.artist.external_urls.spotify},N.a.createElement("button",{className:"btn-primary"},"View on Spotify"))))):this.state.invalidId?N.a.createElement("div",{className:"emptyContent"},"No Artist found at the given url"):N.a.createElement(k.a,null)}}]),a}(b.Component);e.default=D}}]);