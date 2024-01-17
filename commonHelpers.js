import{a as f,S as g,i as u}from"./assets/vendor-89feecc5.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&t(c)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();const y=f.create({baseURL:"https://pixabay.com/api/",params:{key:"41487030-c0d4f2e8fae3a5e9414bad560",image_type:"photo",orientation:"horizontal",safesearch:"true"}}),L=document.querySelector(".search-form"),m=document.querySelector(".images-list"),i=document.querySelector(".load_more_btn"),b=document.querySelector(".search-input"),v=document.querySelector(".gallery"),w=new g(".gallery a",{captionsData:"alt",captionDelay:"250"}),p=document.createElement("span");p.className="loader is-hidden";v.append(p);const d=document.querySelector(".loader");function F(r=[]){const s=r.reduce((a,t)=>a+`
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
        `,"");m.insertAdjacentHTML("beforeend",s),w.refresh()}function h(){u.show({title:"",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FFFFFF",backgroundColor:"#EF4040",color:"#B51B1B",iconUrl:"./bi_x-octagon.svg",iconColor:"#FAFAFB",position:"topRight"})}function q(){u.info({title:"",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}const S=async r=>{try{return(await y.get("",{params:r})).data}catch{h()}},E=r=>{let s=1,a=!1;const t=40;return async()=>{try{if(a)return[];const{hits:e,totalHits:o}=await S({page:s,per_page:t,q:r});if(e.length===0)throw new Error;return i.classList.remove("is-hidden"),s>=Math.ceil(o/t)&&(a=!0,i.classList.add("is-hidden"),q()),s++,e}catch{h()}}};let n=null;L.addEventListener("submit",async r=>{r.preventDefault(),n!=null&&(i.removeEventListener("click",n),i.classList.add("is-hidden"));const a=new FormData(r.currentTarget).get("query");m.innerHTML="",b.value="";const t=E(a);n=async()=>{i.classList.add("is-hidden"),d.classList.remove("is-hidden");const e=await t();d.classList.add("is-hidden"),F(e);const l=(document.querySelector(".images-item").getBoundingClientRect().height+24)*2;console.log(l),window.scrollBy({top:l,left:0,behavior:"smooth"})},await n(),i.addEventListener("click",n)});
//# sourceMappingURL=commonHelpers.js.map
