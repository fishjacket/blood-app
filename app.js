document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('bpForm');
  const tbody = document.querySelector('#entries tbody');
  const STORAGE_KEY = 'bpEntries';

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
