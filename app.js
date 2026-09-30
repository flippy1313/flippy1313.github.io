'use strict';
const pubs = window.PUBLICATIONS;
const grid = document.querySelector('#publication-grid');
const search = document.querySelector('#search');
let activeFilter = 'all';
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const dialog = document.querySelector('#paper-dialog');
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render() {
 const query = search.value.trim().toLowerCase();
 const visible = pubs.filter(p => (activeFilter === 'all' || (activeFilter === 'older' ? p.year <= 2024 : String(p.year) === activeFilter || p.status === activeFilter)) && [p.title,p.authors,p.venue,p.tag].join(' ').toLowerCase().includes(query));
 grid.innerHTML = visible.map(p => `<article class="paper card${p.year >= 2026 ? ' recent-work' : ''}">${p.year >= 2026 ? '<span class="recent-label">Recent</span>' : ''}<div class="paper-meta card-meta"><span class="venue">${escapeHTML(p.venue)} · ${p.year}</span><span>${escapeHTML(p.status)}</span></div><h3 class="card-title">${escapeHTML(p.title)}</h3><p class="authors body-sm">${escapeHTML(p.authors).replace('Ning Liang','<strong>Ning Liang</strong>')}</p><div class="paper-actions">${p.doi ? `<a href="https://doi.org/${encodeURI(p.doi)}" target="_blank" rel="noopener" aria-label="Read ${escapeHTML(p.title)}">Paper ↗</a>` : ''}<button data-paper="${p.id}" aria-label="Details and citation for ${escapeHTML(p.title)}">Details & citation ↗</button><span class="topic tag">${escapeHTML(p.tag)}</span></div></article>`).join('');
 document.querySelector('#result-count').textContent = `${visible.length} of ${pubs.length} publications`;
 document.querySelector('#empty').hidden = visible.length !== 0;
 document.querySelector('#reset').hidden = !query && activeFilter === 'all';
}
search.addEventListener('input',render);
function setFilter(value) {activeFilter=value;filterButtons.forEach(button=>{const selected=button.dataset.filter===value;button.classList.toggle('active',selected);button.setAttribute('aria-pressed',String(selected));});render();}
filterButtons.forEach(button=>button.addEventListener('click',()=>setFilter(button.dataset.filter)));
document.querySelector('#reset').addEventListener('click',()=>{search.value='';setFilter('all');search.focus();});
function bibtex(p) {
 const entry = p.status === 'Under submission' ? 'unpublished' : p.venue === 'Bioinformatics' ? 'article' : 'inproceedings';
 const authors = p.authors.replace(/, and /g,', ').replace(/ and /g,', ').split(', ').join(' and ');
 let fields = [`  title = {{${p.title}}}`,`  author = {${authors}}`,`  year = {${p.year}}`];
 if (p.status === 'Under submission') fields.push(`  note = {Under submission to ${p.venue}}`);
 else {fields.push(`  ${entry === 'article' ? 'journal' : 'booktitle'} = {${p.venue}}`);if(p.status==='To appear')fields.push('  note = {To appear}');}
 if(p.doi) fields.push(`  doi = {${p.doi}}`);
 // Bibliographic fields only from the CV; no inferred abstracts or unpublished DOIs.
 return `@${entry}{${p.id}${p.year},\n${fields.join(',\n')}\n}`;
}
grid.addEventListener('click',event=>{
 const button = event.target.closest('[data-paper]'); if(!button)return;
 const p = pubs.find(p=>p.id===button.dataset.paper);
 document.querySelector('#dialog-meta').textContent=`${p.venue} · ${p.year} · ${p.status}`;
 document.querySelector('#dialog-title').textContent=p.title;
 document.querySelector('#dialog-authors').textContent=p.authors;
 document.querySelector('#dialog-description').textContent=p.description ? 'My contribution: '+p.description : '';
 document.querySelector('#dialog-description').hidden=!p.description;
 document.querySelector('#dialog-links').innerHTML=p.doi ? `<a href="https://doi.org/${encodeURI(p.doi)}" target="_blank" rel="noopener">Read the paper ↗</a>` : '';
 document.querySelector('#bibtex').textContent=bibtex(p);
 document.querySelector('#copy-status').textContent='';dialog.showModal();
});
document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
document.querySelector('#copy-citation').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(document.querySelector('#bibtex').textContent);document.querySelector('#copy-status').textContent='Copied.';}catch{document.querySelector('#copy-status').textContent='Select the citation above to copy it.';}});
document.querySelector('#copyright-year').textContent=new Date().getFullYear();
render();
// Only contact the analytics provider when this site has its own widget ID.
const mapId = window.SITE_CONFIG?.visitorMapId?.trim();
if (mapId && /^[A-Za-z0-9_-]+$/.test(mapId)) {
 const host = document.querySelector('#visitor-map');
 const note = document.querySelector('.map-note');
 const params = new URLSearchParams({cl:'28586b',w:'a',t:'n',d:mapId,co:'ffffff',ct:'66747c',cmo:'90aeba',cmn:'28586b'});
 const script = document.createElement('script');
 script.id='mapmyvisitors';script.src='https://mapmyvisitors.com/map.js?'+params;script.async=true;
 host.replaceChildren(script);
 note.textContent='Approximate IP-based locations · MapMyVisitors';
 script.addEventListener('error',()=>{host.replaceChildren();const message=document.createElement('p');message.className='map-caption';message.textContent='Visitor map is currently unavailable.';host.append(message);});
}
