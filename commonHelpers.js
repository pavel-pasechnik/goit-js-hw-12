import{a as f,S as g,i as d}from"./assets/vendor-89feecc5.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&t(c)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const y=f.create({baseURL:"https://pixabay.com/api/",params:{key:"41487030-c0d4f2e8fae3a5e9414bad560",image_type:"photo",orientation:"horizontal",safesearch:"true"}}),L=document.querySelector(".search-form"),u=document.querySelector(".images-list"),i=document.querySelector(".load_more_btn"),b=document.querySelector(".search-input"),v=document.querySelector(".gallery"),w=new g(".gallery a",{captionsData:"alt",captionDelay:"250"}),m=document.createElement("span");m.className="loader is-hidden";v.append(m);const l=document.querySelector(".loader");function F(r=[]){const o=r.reduce((a,t)=>a+`
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
        `,"");u.insertAdjacentHTML("beforeend",o),w.refresh()}function p(){d.show({title:"",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FFFFFF",backgroundColor:"#EF4040",color:"#B51B1B",iconUrl:"./bi_x-octagon.svg",iconColor:"#FAFAFB",position:"topRight"})}function q(){d.info({title:"",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}const S=async r=>{try{return(await y.get("",{params:r})).data}catch{p()}},E=r=>{let o=1,a=!1;const t=40;return async()=>{try{if(a)return[];const{hits:e,totalHits:s}=await S({page:o,per_page:t,q:r});if(e.length===0)throw new Error;return i.classList.remove("is-hidden"),o>=Math.ceil(s/t)&&(a=!0,i.classList.add("is-hidden"),q()),o++,e}catch{p()}}};let n=null;L.addEventListener("submit",async r=>{r.preventDefault(),n!=null&&(i.removeEventListener("click",n),i.classList.add("is-hidden"));const a=new FormData(r.currentTarget).get("query");u.innerHTML="",b.value="";const t=E(a);n=async()=>{i.classList.add("is-hidden"),l.classList.remove("is-hidden");const e=await t();l.classList.add("is-hidden"),F(e);const h=(document.querySelector(".images-item").getBoundingClientRect().height+24)*2;window.scrollBy({top:h,left:0,behavior:"smooth"})},await n(),i.addEventListener("click",n)});
//# sourceMappingURL=commonHelpers.js.map
