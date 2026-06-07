// ═══ SHARED COMPONENTS ═══

// Cookie Banner (PIPEDA compliant)
function initCookieBanner(){
  if(localStorage.getItem('scions_cookie_consent'))return;
  const banner=document.createElement('div');
  banner.id='cookie-banner';
  banner.innerHTML=`
    <div style="position:fixed;bottom:0;left:0;right:0;z-index:9999;background:#fff;border-top:1px solid #e3e6f0;padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;box-shadow:0 -4px 20px rgba(0,0,0,0.08);font-family:'Google Sans',sans-serif">
      <div style="flex:1;min-width:260px">
        <div style="font-size:0.85rem;font-weight:500;color:#1c1b1f;margin-bottom:0.25rem">🍪 We use cookies</div>
        <div style="font-size:0.78rem;color:#44464f;line-height:1.5">We collect anonymised analytics (location, device, pages visited) to improve your experience. No personal data is sold. <a href="#" style="color:#1a73e8">Privacy policy</a></div>
      </div>
      <div style="display:flex;gap:0.5rem;flex-shrink:0">
        <button onclick="rejectCookies()" style="background:transparent;border:1.5px solid #e3e6f0;border-radius:100px;padding:0.45rem 1rem;font-size:0.8rem;font-family:'Google Sans',sans-serif;cursor:pointer;color:#44464f">Decline</button>
        <button onclick="acceptCookies()" style="background:#1a73e8;color:#fff;border:none;border-radius:100px;padding:0.45rem 1rem;font-size:0.8rem;font-family:'Google Sans',sans-serif;cursor:pointer;font-weight:500">Accept all</button>
      </div>
    </div>`;
  document.body.appendChild(banner);
}

function acceptCookies(){
  localStorage.setItem('scions_cookie_consent','accepted');
  localStorage.setItem('scions_cookie_time',Date.now());
  document.getElementById('cookie-banner')?.remove();
  loadAnalytics();
}

function rejectCookies(){
  localStorage.setItem('scions_cookie_consent','declined');
  document.getElementById('cookie-banner')?.remove();
}

function loadAnalytics(){
  if(localStorage.getItem('scions_cookie_consent')!=='accepted')return;
  // Google Analytics 4 — replace G-XXXXXXXXXX with your GA4 ID
  const s=document.createElement('script');
  s.src='https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
  s.async=true;document.head.appendChild(s);
  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments)}
  gtag('js',new Date());
  gtag('config','G-XXXXXXXXXX',{anonymize_ip:true});
  window.gtag=gtag;
}

// Contact Modal
function initContactModal(){
  const modal=document.createElement('div');
  modal.id='contact-modal';
  modal.innerHTML=`
    <div id="modal-backdrop" onclick="closeModal()" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:1000;backdrop-filter:blur(4px)"></div>
    <div id="modal-panel" style="display:none;position:fixed;right:0;top:0;bottom:0;width:min(480px,100vw);background:#fff;z-index:1001;overflow-y:auto;box-shadow:-8px 0 40px rgba(0,0,0,0.15);font-family:'Google Sans',sans-serif">
      <div style="padding:1.5rem 2rem;border-bottom:1px solid #e3e6f0;display:flex;align-items:center;justify-content:space-between">
        <div>
          <div style="font-size:0.75rem;font-weight:500;color:#1a73e8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.2rem">Get started</div>
          <div style="font-size:1.1rem;font-weight:500;color:#1c1b1f">Book a free consultation</div>
        </div>
        <button onclick="closeModal()" style="background:none;border:none;cursor:pointer;font-size:1.5rem;color:#76777f;line-height:1">×</button>
      </div>
      <form id="modal-form" style="padding:1.5rem 2rem;display:flex;flex-direction:column;gap:1rem" onsubmit="submitModal(event)">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem">
          <div><label style="font-size:0.78rem;font-weight:500;color:#44464f;display:block;margin-bottom:0.35rem">First name</label><input name="first_name" required placeholder="Jane" style="width:100%;background:#f1f3f9;border:1.5px solid #e3e6f0;border-radius:12px;padding:0.65rem 0.9rem;font-family:'Google Sans',sans-serif;font-size:0.875rem;outline:none;color:#1c1b1f"/></div>
          <div><label style="font-size:0.78rem;font-weight:500;color:#44464f;display:block;margin-bottom:0.35rem">Last name</label><input name="last_name" required placeholder="Smith" style="width:100%;background:#f1f3f9;border:1.5px solid #e3e6f0;border-radius:12px;padding:0.65rem 0.9rem;font-family:'Google Sans',sans-serif;font-size:0.875rem;outline:none;color:#1c1b1f"/></div>
        </div>
        <div><label style="font-size:0.78rem;font-weight:500;color:#44464f;display:block;margin-bottom:0.35rem">Business email</label><input name="email" type="email" required placeholder="jane@company.com" style="width:100%;background:#f1f3f9;border:1.5px solid #e3e6f0;border-radius:12px;padding:0.65rem 0.9rem;font-family:'Google Sans',sans-serif;font-size:0.875rem;outline:none;color:#1c1b1f"/></div>
        <div><label style="font-size:0.78rem;font-weight:500;color:#44464f;display:block;margin-bottom:0.35rem">Company</label><input name="company" placeholder="Acme Inc." style="width:100%;background:#f1f3f9;border:1.5px solid #e3e6f0;border-radius:12px;padding:0.65rem 0.9rem;font-family:'Google Sans',sans-serif;font-size:0.875rem;outline:none;color:#1c1b1f"/></div>
        <div><label style="font-size:0.78rem;font-weight:500;color:#44464f;display:block;margin-bottom:0.35rem">Service interested in</label>
          <select name="service" style="width:100%;background:#f1f3f9;border:1.5px solid #e3e6f0;border-radius:12px;padding:0.65rem 0.9rem;font-family:'Google Sans',sans-serif;font-size:0.875rem;outline:none;color:#1c1b1f;-webkit-appearance:none">
            <option value="">Select a service...</option>
            <option>SecOps – Cybersecurity</option>
            <option>CloudOps – Infrastructure</option>
            <option>Automations</option>
            <option>DevOps</option>
            <option>Development</option>
            <option>ITOps – Onboarding & Offboarding</option>
            <option>Not sure yet</option>
          </select>
        </div>
        <div><label style="font-size:0.78rem;font-weight:500;color:#44464f;display:block;margin-bottom:0.35rem">Tell us more (optional)</label><textarea name="message" placeholder="Brief description of your situation..." rows="4" style="width:100%;background:#f1f3f9;border:1.5px solid #e3e6f0;border-radius:12px;padding:0.65rem 0.9rem;font-family:'Google Sans',sans-serif;font-size:0.875rem;outline:none;color:#1c1b1f;resize:vertical"></textarea></div>
        <input type="hidden" name="_subject" value="New enquiry from scions.ca"/>
        <input type="hidden" name="_captcha" value="false"/>
        <button type="submit" id="modal-submit" style="background:#1a73e8;color:#fff;border:none;border-radius:100px;padding:0.85rem 2rem;font-family:'Google Sans',sans-serif;font-size:0.9rem;font-weight:500;cursor:pointer;align-self:flex-start;transition:opacity 0.2s">Send message →</button>
        <div id="modal-success" style="display:none;background:#e6f4ea;border:1px solid #ceead6;border-radius:12px;padding:1rem;font-size:0.875rem;color:#1e8e3e;text-align:center">✅ Message sent! We'll be in touch within 24 hours.</div>
        <div id="modal-error" style="display:none;background:#fce8e6;border:1px solid #f5c6c2;border-radius:12px;padding:1rem;font-size:0.875rem;color:#c5221f;text-align:center">Something went wrong. Please email hello@scions.ca directly.</div>
      </form>
    </div>`;
  document.body.appendChild(modal);
}

function openModal(service=''){
  document.getElementById('modal-backdrop').style.display='block';
  document.getElementById('modal-panel').style.display='block';
  document.body.style.overflow='hidden';
  if(service){
    const sel=document.querySelector('#modal-form select[name="service"]');
    if(sel)sel.value=service;
  }
}

function closeModal(){
  document.getElementById('modal-backdrop').style.display='none';
  document.getElementById('modal-panel').style.display='none';
  document.body.style.overflow='';
}

async function submitModal(e){
  e.preventDefault();
  const btn=document.getElementById('modal-submit');
  btn.textContent='Sending...';btn.disabled=true;
  const form=e.target;
  const data=new FormData(form);
  try{
    // Replace YOUR_FORMSPREE_ID with your actual Formspree form ID
    const res=await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID',{method:'POST',body:data,headers:{Accept:'application/json'}});
    if(res.ok){
      document.getElementById('modal-success').style.display='block';
      document.getElementById('modal-error').style.display='none';
      form.reset();btn.style.display='none';
      if(window.gtag)gtag('event','form_submit',{event_category:'contact',event_label:'modal'});
    } else throw new Error();
  } catch{
    document.getElementById('modal-error').style.display='block';
    btn.textContent='Send message →';btn.disabled=false;
  }
}

// Init everything on load
document.addEventListener('DOMContentLoaded',()=>{
  initCookieBanner();
  initContactModal();
  if(localStorage.getItem('scions_cookie_consent')==='accepted')loadAnalytics();
  // Wire all "Get in touch" / "Book" buttons to open modal
  document.querySelectorAll('[data-modal],[href="#contact"],[href*="contact"]').forEach(el=>{
    if(el.tagName==='A'&&el.getAttribute('href')==='#contact'){
      el.addEventListener('click',e=>{e.preventDefault();openModal()});
    }
  });
});
