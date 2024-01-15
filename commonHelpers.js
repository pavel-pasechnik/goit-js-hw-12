import{a as p,S as m,i as f}from"./assets/vendor-89feecc5.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&t(c)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const g=p.create({baseURL:"https://pixabay.com/api/",params:{key:"41487030-c0d4f2e8fae3a5e9414bad560",image_type:"photo",orientation:"horizontal",safesearch:"true"}}),h=document.querySelector(".search-form"),l=document.querySelector(".images-list"),i=document.querySelector(".load_more_btn"),y=document.querySelector(".search-input"),b=new m(".gallery a",{captionsData:"alt",captionDelay:"250"}),d=document.createElement("span");d.className="loader is-hidden";divGallery.append(d);document.querySelector(".loader");function v(s=[]){const o=s.reduce((a,t)=>a+`
      <li class="images-item">
        <a class="images-link" href="${t.largeImageURL}"><img class="images" data-source="${t.largeImageURL}" alt="${t.tags}" src="${t.webformatURL}" width="360" height="200"></a>
        <div class="description">
        <div>
          <p><b>Likes</b></p>
          <p>${t.likes}</p>
        </div>
        <div>
          <p><b>Views</b></p>
          <p>${t.views}</p>
        </div>
        <div>
          <p><b>Comments</b></p>
          <p>${t.comments}</p>
        </div>
        <div>
          <p><b>Downloads</b></p>
          <p>${t.downloads}</p>
        </div>
        </div>
      </li>
        `,"");l.insertAdjacentHTML("beforeend",o),b.refresh()}function u(){f.show({title:"",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FFFFFF",backgroundColor:"#EF4040",color:"#B51B1B",iconUrl:"./bi_x-octagon.svg",iconColor:"#FAFAFB",position:"topRight"})}const L=async s=>{try{return(await g.get("",{params:s})).data}catch{u()}},w=s=>{let o=1,a=!1;const t=3;return async()=>{try{if(a)return[];const{hits:e,totalHits:r}=await L({page:o,per_page:t,q:s});if(e.length===0)throw new Error;if(o>=Math.ceil(r/t)){a=!0;i.classList.add("is-hidden")}return o++,e}catch{u()}}};let n=null;h.addEventListener("submit",async s=>{s.preventDefault(),n!=null&&(i.removeEventListener("click",n),i.classList.add("is-hidden"));const a=new FormData(s.currentTarget).get("query");l.innerHTML="",y.value="";const t=w(a);n=async()=>{const e=await t();v(e)},await n(),i.classList.remove("is-hidden"),i.addEventListener("click",n)});
//# sourceMappingURL=commonHelpers.js.map
