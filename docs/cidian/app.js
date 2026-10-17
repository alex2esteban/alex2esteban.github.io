// app.js
const searchInput = document.getElementById('search');
const statusEl = document.getElementById('status');
const resultsEl = document.getElementById('results');

let dictionary = []; 
let ready = false;

const worker = new Worker('worker.js');
worker.postMessage({ url: 'cedict.txt' });

worker.onmessage = (e) => {
  if (e.data.error) {
    statusEl.textContent = 'Error: ' + e.data.error;
    console.error(e.data.error);
    return;
  }
  
  dictionary = e.data.entries;
  
  if (dictionary.length === 0) {
    statusEl.textContent = 'Error: The file loaded, but 0 words were parsed. Check the file content.';
    return;
  }

  ready = true;
  statusEl.textContent = `${dictionary.length.toLocaleString()} entries loaded. Ready!`;
};

function search(query) {
  if (!ready) return [];
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const isChinese = /[\u4e00-\u9fff]/.test(q);
  const results = [];

  for (const entry of dictionary) {
    if (isChinese) {
      if (entry.simplified.includes(q) || entry.traditional.includes(q)) {
        results.push(entry);
      }
    } else {
      const pinyinClean = entry.pinyin.replace(/[0-9]/g, '').toLowerCase().replace(/\s+/g, '');
      const qClean = q.replace(/[0-9]/g, '').replace(/\s+/g, '');

      if (
        pinyinClean.includes(qClean) ||
        entry.definitions.some(def => def.toLowerCase().includes(q))
      ) {
        results.push(entry);
      }
    }
    if (results.length >= 100) break; 
  }
  return results;
}

// --- NEW: Pinyin Tone Mark Converter ---
function convertPinyin(pinyin) {
  return pinyin.split(' ').map(syllable => {
    const toneMatch = syllable.match(/([1-5])$/);
    
    // If no tone number, just fix the 'u:' and return
    if (!toneMatch) {
      return syllable.replace(/u:/g, 'ü').replace(/v/g, 'ü');
    }
    
    const tone = parseInt(toneMatch[1]);
    // Remove the number and fix 'u:'
    let word = syllable.slice(0, -1).replace(/u:/g, 'ü').replace(/v/g, 'ü');
    
    // Neutral tone (5) has no accent mark
    if (tone === 5) return word;
    
    const toneMap = {
      'a': ['ā', 'á', 'ǎ', 'à'],
      'e': ['ē', 'é', 'ě', 'è'],
      'i': ['ī', 'í', 'ǐ', 'ì'],
      'o': ['ō', 'ó', 'ǒ', 'ò'],
      'u': ['ū', 'ú', 'ǔ', 'ù'],
      'ü': ['ǖ', 'ǘ', 'ǚ', 'ǜ']
    };
    
    const lowerWord = word.toLowerCase();
    let target = '';
    
    // Pinyin rules for which vowel gets the tone mark:
    // 1. 'a' or 'e' always takes the mark
    if (lowerWord.includes('a')) target = 'a';
    else if (lowerWord.includes('e')) target = 'e';
    // 2. 'ou' -> 'o' takes the mark
    else if (lowerWord.includes('ou')) target = 'o';
    // 3. Otherwise, the last vowel takes the mark (e.g., 'iu' -> 'u', 'ui' -> 'i')
    else {
      for (let i = lowerWord.length - 1; i >= 0; i--) {
        if (['a', 'e', 'i', 'o', 'u', 'ü'].includes(lowerWord[i])) {
          target = lowerWord[i];
          break;
        }
      }
    }
    
    if (target) {
      // Use regex with 'i' flag to preserve the original case of the letter
      return word.replace(new RegExp(target, 'i'), toneMap[target][tone - 1]);
    }
    return word;
  }).join(' ');
}
// ---------------------------------------

function render(entries) {
  if (!entries.length) {
    resultsEl.innerHTML = '<p>No results found.</p>';
    return;
  }

  resultsEl.innerHTML = entries
    .map((e) => {
      const tradText = (e.traditional !== e.simplified) ? ` (${e.traditional})` : '';
      // Use the converter here!
      const displayPinyin = convertPinyin(e.pinyin); 
      
      return `
      <div class="entry">
        <div>
          <span class="word">${e.simplified}${tradText}</span>
          <span class="pinyin">[${displayPinyin}]</span>
        </div>
        <div class="defs">
          ${e.definitions.map((d) => `<span>${d}</span>`).join(' ')}
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