(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{78:function(t,e,n){"use strict";function r(t){return t.substring(0,1).toUpperCase()+t.substring(1)}n.d(e,"a",(function(){return r}))},80:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var r=function(t){var e=[];return t=(t+="").split("").reverse().join("").split("").map((function(n,r){e.push(n),(r+1)%3==0&&r<t.split("").length-1&&e.push(",")})),e.reverse().join("")}},85:function(t,e,n){"use strict";n.r(e);var r=n(1),a=n.n(r),s=n(3),i=n.n(s),c=n(21),u=n.n(c),l=n(22),o=n.n(l),p=n(17),f=n.n(p),m=n(23),h=n.n(m),v=n(24),d=n.n(v),y=n(15),w=n.n(y),E=n(25),g=n.n(E),b=n(0),k=n.n(b),x=n(12),N=n(78),j=n(80),R=n(13);function C(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=w()(t);if(e){var a=w()(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return d()(this,n)}}var D=function(t){h()(r,t);var e,n=C(r);function r(){var t;u()(this,r);for(var e=arguments.length,a=new Array(e),s=0;s<e;s++)a[s]=arguments[s];return t=n.call.apply(n,[this].concat(a)),g()(f()(t),"state",{artist:null}),t}return o()(r,[{key:"componentDidMount",value:(e=i()(a.a.mark((function t(){var e;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(R.e)(this.props.match.params.id);case 2:e=t.sent,this.setState({artist:e});case 4:case"end":return t.stop()}}),t,this)}))),function(){return e.apply(this,arguments)})},{key:"render",value:function(){var t=this;return this.state.artist?k.a.createElement("div",{className:"artist_individual"},k.a.createElement("div",{className:"artistCard"},k.a.createElement("img",{src:this.state.artist.images[1].url}),k.a.createElement("div",null,k.a.createElement("h2",null,this.state.artist.name),k.a.createElement("div",{className:"primaryText"},this.state.artist.genres.map((function(e,n){return k.a.createElement("span",{key:n},Object(N.a)(e),n>=0&&n===t.state.artist.genres.length-1?"":",","  ")}))),k.a.createElement("div",{className:"secondaryText"},this.state.artist.popularity,"% Popular"),k.a.createElement("div",{className:"secondaryText"},Object(j.a)(this.state.artist.followers.total)," Followers"),k.a.createElement("a",{className:"linkClass",href:this.state.artist.external_urls.spotify},k.a.createElement("button",{className:"btn-primary"},"View on Spotify"))))):k.a.createElement(x.a,null)}}]),r}(b.Component);e.default=D}}]);