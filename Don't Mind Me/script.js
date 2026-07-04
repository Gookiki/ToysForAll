document.addEventListener('DOMContentLoaded', ()=>{
  const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');
  const links = document.querySelectorAll('.nav-link');

  menuBtn.addEventListener('click', ()=>{
    sidebar.classList.toggle('open');
  });

  // Smooth scroll for single-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const target = document.querySelector(a.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
        // close sidebar on mobile
        if(window.innerWidth <= 900) sidebar.classList.remove('open');
      }
    })
  })

  // Highlight active nav link: support separate pages and single-page sections
  // First try pathname match (separate pages)
  const path = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(l=>{
    const href = l.getAttribute('href');
    if(href === path || (href === 'index.html' && path === '')){
      l.classList.add('active');
    }
  });

  // If we're on the index page, also enable intersection-based highlights for sections
  if(path === 'index.html' || path === '' || path === '/'){
    const sections = document.querySelectorAll('main section[id]');
    if(sections.length){
      const obs = new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
          const id = entry.target.id;
          const link = document.querySelector('.nav-link[href="index.html"]') || document.querySelector('.nav-link[href="#'+id+'"]');
          if(entry.isIntersecting){
            links.forEach(l=>l.classList.remove('active'));
            // prefer a nav link that targets this section
            const sectionLink = document.querySelector('.nav-link[href="#'+id+'"]');
            if(sectionLink) sectionLink.classList.add('active');
            else if(link) link.classList.add('active');
          }
        })
      },{root:null,threshold:0.45});
      sections.forEach(s=>obs.observe(s));
    }
  }

  // Team page: expandable member cards
  const memberCards = document.querySelectorAll('.member');
  if(memberCards.length){
    memberCards.forEach(card=>{
      const btn = card.querySelector('.expand-btn');
      btn?.addEventListener('click', (e)=>{
        e.stopPropagation();
        const isOpen = card.classList.contains('open');
        // close others
        memberCards.forEach(c=>{ c.classList.remove('open'); const b=c.querySelector('.expand-btn'); if(b) b.setAttribute('aria-expanded','false'); });
        if(!isOpen){
          card.classList.add('open');
          btn.setAttribute('aria-expanded','true');
        }
      });

      // also open when clicking the head area
      const head = card.querySelector('.member-head');
      head?.addEventListener('click', ()=>{
        const btn = card.querySelector('.expand-btn');
        btn?.click();
      })
    })
    // click outside to close
    document.addEventListener('click', (e)=>{
      if(!e.target.closest('.member')){
        memberCards.forEach(c=>{ c.classList.remove('open'); const b=c.querySelector('.expand-btn'); if(b) b.setAttribute('aria-expanded','false'); });
      }
    })
  }
});
