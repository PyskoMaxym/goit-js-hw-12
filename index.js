import{a as h,S as g,i}from"./assets/vendor-D73Uttp0.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();const b="46932892-ab4a09809774f514baea4f6c0";async function L(r,s=1,a=15){try{const{data:t}=await h.get("https://pixabay.com/api/",{params:{key:b,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:a}});return t}catch(t){throw new Error(t.message)}}function v(r,s){const a=r.map(t=>`
        <a href="${t.largeImageURL}" class="gallery-item">
          <div class="image-card">
            <img src="${t.webformatURL}" alt="${t.tags}" />
            <div class="info">
              <p><b>Likes:</b> ${t.likes}</p>
              <p><b>Views:</b> ${t.views}</p>
              <p><b>Comments:</b> ${t.comments}</p>
              <p><b>Downloads:</b> ${t.downloads}</p>
            </div>
          </div>
        </a>
      `).join("");s.insertAdjacentHTML("beforeend",a)}function w(r){r.innerHTML=""}const q=document.querySelector(".search-form"),S=document.querySelector(".input-search"),p=document.querySelector(".results-container"),c=document.querySelector(".loader"),d=document.querySelector(".js-load-more");let u="",n=1;const m=15;let f=0,P=new g(".results-container .gallery-item",{captionsData:"alt",captionDelay:250});q.addEventListener("submit",r=>{if(r.preventDefault(),u=S.value.trim(),u===""){i.error({title:"Error",message:"Please enter a search term!"});return}n=1,f=0,w(p),y()});d.addEventListener("click",()=>{n+=1,y()});function y(){c.style.display="block",L(u,n,m).then(r=>{if(c.style.display="none",f=r.totalHits,r.hits.length===0&&n===1){i.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!"});return}v(r.hits,p),P.refresh(),n*m>=f?(d.classList.replace("load-more","load-more-hidden"),i.info({title:"End of results",message:"We're sorry, but you've reached the end of search results."})):d.classList.replace("load-more-hidden","load-more")}).catch(r=>{c.style.display="none",i.error({title:"Error",message:"Failed to fetch images. Please try again later."})})}
//# sourceMappingURL=index.js.map
