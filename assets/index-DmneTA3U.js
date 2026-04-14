import{c as I,r as n,j as P}from"./index-BQV_gKOM.js";import{M as H,i as z,u as A,P as K,c as W,b as q,L as B}from"./use-presence-Dg3UtMYO.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=I("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=I("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=I("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=I("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);function D(e,r){if(typeof e=="function")return e(r);e!=null&&(e.current=r)}function G(...e){return r=>{let t=!1;const o=e.map(f=>{const c=D(f,r);return!t&&typeof c=="function"&&(t=!0),c});if(t)return()=>{for(let f=0;f<o.length;f++){const c=o[f];typeof c=="function"?c():D(e[f],null)}}}}function T(...e){return n.useCallback(G(...e),e)}class V extends n.Component{getSnapshotBeforeUpdate(r){const t=this.props.childRef.current;if(z(t)&&r.isPresent&&!this.props.isPresent&&this.props.pop!==!1){const o=t.offsetParent,f=z(o)&&o.offsetWidth||0,c=z(o)&&o.offsetHeight||0,a=getComputedStyle(t),s=this.props.sizeRef.current;s.height=parseFloat(a.height),s.width=parseFloat(a.width),s.top=t.offsetTop,s.left=t.offsetLeft,s.right=f-s.width-s.left,s.bottom=c-s.height-s.top}return null}componentDidUpdate(){}render(){return this.props.children}}function X({children:e,isPresent:r,anchorX:t,anchorY:o,root:f,pop:c}){var u;const a=n.useId(),s=n.useRef(null),w=n.useRef({width:0,height:0,top:0,left:0,right:0,bottom:0}),{nonce:k}=n.useContext(H),l=((u=e.props)==null?void 0:u.ref)??(e==null?void 0:e.ref),y=T(s,l);return n.useInsertionEffect(()=>{const{width:p,height:h,top:g,left:x,right:b,bottom:$}=w.current;if(r||c===!1||!s.current||!p||!h)return;const j=t==="left"?`left: ${x}`:`right: ${b}`,m=o==="bottom"?`bottom: ${$}`:`top: ${g}`;s.current.dataset.motionPopId=a;const C=document.createElement("style");k&&(C.nonce=k);const R=f??document.head;return R.appendChild(C),C.sheet&&C.sheet.insertRule(`
          [data-motion-pop-id="${a}"] {
            position: absolute !important;
            width: ${p}px !important;
            height: ${h}px !important;
            ${j}px !important;
            ${m}px !important;
          }
        `),()=>{var E;(E=s.current)==null||E.removeAttribute("data-motion-pop-id"),R.contains(C)&&R.removeChild(C)}},[r]),P.jsx(V,{isPresent:r,childRef:s,sizeRef:w,pop:c,children:c===!1?e:n.cloneElement(e,{ref:y})})}const Y=({children:e,initial:r,isPresent:t,onExitComplete:o,custom:f,presenceAffectsLayout:c,mode:a,anchorX:s,anchorY:w,root:k})=>{const l=A(_),y=n.useId();let u=!0,p=n.useMemo(()=>(u=!1,{id:y,initial:r,isPresent:t,custom:f,onExitComplete:h=>{l.set(h,!0);for(const g of l.values())if(!g)return;o&&o()},register:h=>(l.set(h,!1),()=>l.delete(h))}),[t,l,o]);return c&&u&&(p={...p}),n.useMemo(()=>{l.forEach((h,g)=>l.set(g,!1))},[t]),n.useEffect(()=>{!t&&!l.size&&o&&o()},[t]),e=P.jsx(X,{pop:a==="popLayout",isPresent:t,anchorX:s,anchorY:w,root:k,children:e}),P.jsx(K.Provider,{value:p,children:e})};function _(){return new Map}const v=e=>e.key||"";function U(e){const r=[];return n.Children.forEach(e,t=>{n.isValidElement(t)&&r.push(t)}),r}const te=({children:e,custom:r,initial:t=!0,onExitComplete:o,presenceAffectsLayout:f=!0,mode:c="sync",propagate:a=!1,anchorX:s="left",anchorY:w="top",root:k})=>{const[l,y]=W(a),u=n.useMemo(()=>U(e),[e]),p=a&&!l?[]:u.map(v),h=n.useRef(!0),g=n.useRef(u),x=A(()=>new Map),b=n.useRef(new Set),[$,j]=n.useState(u),[m,C]=n.useState(u);q(()=>{h.current=!1,g.current=u;for(let d=0;d<m.length;d++){const i=v(m[d]);p.includes(i)?(x.delete(i),b.current.delete(i)):x.get(i)!==!0&&x.set(i,!1)}},[m,p.length,p.join("-")]);const R=[];if(u!==$){let d=[...u];for(let i=0;i<m.length;i++){const M=m[i],L=v(M);p.includes(L)||(d.splice(i,0,M),R.push(M))}return c==="wait"&&R.length&&(d=R),C(U(d)),j(u),null}const{forceRender:E}=n.useContext(B);return P.jsx(P.Fragment,{children:m.map(d=>{const i=v(d),M=a&&!l?!1:u===m||p.includes(i),L=()=>{if(b.current.has(i))return;if(x.has(i))b.current.add(i),x.set(i,!0);else return;let S=!0;x.forEach(F=>{F||(S=!1)}),S&&(E==null||E(),C(g.current),a&&(y==null||y()),o&&o())};return P.jsx(Y,{isPresent:M,initial:!h.current||t?void 0:!1,custom:r,presenceAffectsLayout:f,mode:c,root:k,onExitComplete:M?void 0:L,anchorX:s,anchorY:w,children:d},i)})})};export{te as A,O as C,ee as I,Z as a,Q as b};
