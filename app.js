document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('bpForm');
  const tbody = document.querySelector('#entries tbody');
  const STORAGE_KEY = 'bpEntries';
  const THEME_KEY = 'theme';

  function loadEntries(){
    try{const raw = localStorage.getItem(STORAGE_KEY); return raw?JSON.parse(raw):[];}catch(e){return []}
  }

  function saveEntries(list){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function render(){
    const list = loadEntries();
    tbody.innerHTML = '';
    list.slice().reverse().forEach(entry=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${entry.time}</td>
        <td>${entry.systolic}</td>
        <td>${entry.diastolic}</td>
        <td>${entry.pulse}</td>
        <td>${entry.medication}</td>
        <td>${entry.notes||''}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  /* Theme handling */
  function setTheme(theme, persist = true){
    if(theme === 'dark') document.documentElement.classList.add('theme-dark');
    else document.documentElement.classList.remove('theme-dark');
    if(persist) try{ localStorage.setItem(THEME_KEY, theme); }catch(e){}
    const toggle = document.getElementById('themeToggle');
    if(toggle) toggle.checked = (theme === 'dark');
    const label = document.querySelector('.theme-label');
    if(label) label.textContent = (theme === 'dark') ? '暗色' : '亮色';
  }

  (function initTheme(){
    try{
      const saved = localStorage.getItem(THEME_KEY);
      if(saved === 'light' || saved === 'dark'){
        setTheme(saved, false);
      }else if(window.matchMedia){
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light', false);
      }else{
        setTheme('light', false);
      }
    }catch(e){ setTheme('light', false); }

    const toggle = document.getElementById('themeToggle');
    if(toggle){
      toggle.addEventListener('change', ()=>{
        setTheme(toggle.checked ? 'dark' : 'light', true);
      });
    }

    if(window.matchMedia){
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = (e)=>{ try{ if(!localStorage.getItem(THEME_KEY)) setTheme(e.matches ? 'dark' : 'light', false); }catch(_){}}
      if(mq.addEventListener) mq.addEventListener('change', listener);
      else if(mq.addListener) mq.addListener(listener);
    }
  })();

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const systolic = document.getElementById('systolic').value.trim();
    const diastolic = document.getElementById('diastolic').value.trim();
    const pulse = document.getElementById('pulse').value.trim();
    const medication = document.getElementById('medication').value;
    const notes = document.getElementById('notes').value.trim();

    if(!systolic || !diastolic || !pulse){
      alert('請填寫收縮壓、舒張壓與脈搏');
      return;
    }

    const entry = {
      time: new Date().toLocaleString('zh-TW'),
      systolic: Number(systolic),
      diastolic: Number(diastolic),
      pulse: Number(pulse),
      medication,
      notes
    };

    const list = loadEntries();
    list.push(entry);
    saveEntries(list);
    form.reset();
    render();
  });

  render();
});
