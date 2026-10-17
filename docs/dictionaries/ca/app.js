// app.js
const searchInput = document.getElementById('search');
const statusEl = document.getElementById('status');
const resultsEl = document.getElementById('results');

let dictionary = []; 
let ready = false;

const worker = new Worker('worker.js');
worker.postMessage({ url: 'en_US.csv' });

worker.onmessage = (e) => {
  if (e.data.error) {
    statusEl.textContent = 'Error: ' + e.data.error;
    console.error(e.data.error);
    return;
  }
  
  dictionary = e.data.entries;
  
  if (dictionary.length === 0) {
    statusEl.textContent = 'Error: The file loaded, but 0 words were parsed. Check the format.';
    return;
  }

  ready = true;
  statusEl.textContent = `${dictionary.length.toLocaleString()} entries loaded. Ready!`;
};

function search(query) {
  if (!ready) return [];
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results = [];
  const qClean = q.replace(/\//g, '');

  for (const entry of dictionary) {
    const wordLower = entry.word.toLowerCase();
    const ipaLower = entry.ipa.toLowerCase().replace(/\//g, '');

    let score = 0;

    // --- Scoring System ---
    if (wordLower === q) score += 1000; 
    else if (wordLower.startsWith(q)) score += 500; 
    else if (wordLower.includes(q)) score += 100; 

    if (ipaLower === qClean) score += 800;
    else if (ipaLower.includes(qClean)) score += 50;

    if (score > 0) {
      results.push({ entry, score });
    }
  }

  // Sort by score, then shortest word, then alphabetical
  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.entry.word.length !== b.entry.word.length) return a.entry.word.length - b.entry.word.length;
    return a.entry.word.localeCompare(b.entry.word);
  });

  return results.slice(0, 100).map(r => r.entry);
}

function render(entries) {
  if (!entries.length) {
    resultsEl.innerHTML = '<p>No results found.</p>';
    return;
  }

  resultsEl.innerHTML = entries
    .map((e) => {
      return `
      <div class="entry">
        <div>
          <span class="word">${e.word}</span>
          <span class="ipa">${e.ipa}</span>
        </div>
      </div>`;
    })
    .join('');
}

let debounceTimer;
searchInput.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const query = searchInput.value;
    if (query.length < 1) {
      resultsEl.innerHTML = '';
      return;
    }
    const results = search(query);
    render(results);
  }, 150); 
});