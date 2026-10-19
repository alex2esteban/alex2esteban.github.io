// app.js
const searchInput = document.getElementById('search');
const statusEl = document.getElementById('status');
const resultsEl = document.getElementById('results');
const clearBtn = document.getElementById('clear-btn');
const dictTitle = document.getElementById('dict-title');
const scriptLabel = document.getElementById('script-label');
const titleMainLabel = document.getElementById('title-main-label');

let dictionary = []; 
let ready = false;
let showTraditional = false;
let lastQuery = '';
const toggleBtn = document.getElementById('script-toggle');

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

  // Prepare the pinyin query
  const qClean = q.replace(/[0-9]/g, '').replace(/\s+/g, '');

  for (const entry of dictionary) {
    let score = 0;

    if (isChinese) {
      const simpLower = entry.simplified.toLowerCase();
      const tradLower = entry.traditional.toLowerCase();

      // 1. Exact Chinese Match
      if (simpLower === q || tradLower === q) {
        score += 1000;
      }
      // 2. Starts with Chinese Query
      else if (simpLower.startsWith(q) || tradLower.startsWith(q)) {
        score += 500;
      }
      // 3. Contains Chinese Query
      else if (simpLower.includes(q) || tradLower.includes(q)) {
        score += 100;
      }
    } else {
      const pinyinClean = entry.pinyin.replace(/[0-9]/g, '').toLowerCase().replace(/\s+/g, '');

      // 1. Exact Pinyin Match
      if (pinyinClean === qClean) {
        score += 900;
      }
      // 2. Starts with Pinyin
      else if (pinyinClean.startsWith(qClean)) {
        score += 400;
      }
      // 3. Contains Pinyin
      else if (pinyinClean.includes(qClean)) {
        score += 80;
      }
      // 4. English Definition Match
      else if (entry.definitions.some(def => def.toLowerCase().includes(q))) {
        score += 50;
      }
    }

    // If it matched anything, add it to the pool
    if (score > 0) {
      results.push({ entry, score });
    }
  }

  // Sort the results!
  results.sort((a, b) => {
    // 1. Highest score first
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    // 2. If scores are tied, shortest word first (e.g., 控制 before 控制台)
    const lenA = a.entry.simplified.length;
    const lenB = b.entry.simplified.length;
    if (lenA !== lenB) {
      return lenA - lenB;
    }
    // 3. Alphabetical fallback
    return a.entry.simplified.localeCompare(b.entry.simplified);
  });

  // Return only the top 100 matches
  return results.slice(0, 100).map(r => r.entry);
}

// Pinyin Tone Mark Converter ---
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

function render(entries) {
  if (!entries.length) {
    resultsEl.innerHTML = '<p>No results found.</p>';
    return;
  }

  resultsEl.innerHTML = entries
    .map((e) => {
      const displayWord = showTraditional ? e.traditional : e.simplified;
      const displayPinyin = convertPinyin(e.pinyin); 
      
      // Check if the displayed word exactly matches what is in the search bar
      const isExactMatch = displayWord === lastQuery.trim();

      let classifiers = [];
      let cleanDefs = [];

      e.definitions.forEach(def => {
        if (def.startsWith("CL:")) {
          let clRaw = def.substring(3);
          clRaw = clRaw.replace(/\[.*?\]/g, ''); 
          const clItems = clRaw.split(',');
          
          clItems.forEach(item => {
            const parts = item.trim().split('|');
            if (parts.length === 2) {
              classifiers.push({ trad: parts[0], simp: parts[1] });
            } else if (parts.length === 1) {
              classifiers.push({ trad: parts[0], simp: parts[0] });
            }
          });
        } else {
          cleanDefs.push(def);
        }
      });

      let clDisplay = '';
      if (classifiers.length > 0) {
        const clWords = classifiers.map(c => showTraditional ? c.trad : c.simp);
        clDisplay = ` <span class="classifier">· ${clWords.join(', ')}</span>`;
      }
      
      return `
      <div class="entry">
        <div>
          <!-- Added conditional class here -->
          <span class="word ${isExactMatch ? 'exact-match' : ''}">${displayWord}</span>
          <span class="pinyin">[${displayPinyin}]</span>${clDisplay}
        </div>
        <div class="defs">
          ${cleanDefs.map((d) => `<span>${d}</span>`).join(' ')}
        </div>
      </div>`;
    })
    .join('');
}

// Input Event Listener ---
let debounceTimer;
searchInput.addEventListener('input', () => {
  const query = searchInput.value;
  lastQuery = query; // <-- Add this line
  
  if (query.length > 0) {
    clearBtn.textContent = '✕';
    clearBtn.classList.add('has-text');
  } else {
    clearBtn.textContent = '→';
    clearBtn.classList.remove('has-text');
  }

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    if (query.length < 1) {
      resultsEl.innerHTML = '';
      return;
    }
    const results = search(query);
    render(results);
  }, 150); 
});

// Clear Button Click Event ---
clearBtn.addEventListener('click', () => {
  searchInput.value = '';           // Clear the text input
  resultsEl.innerHTML = '';         // Clear the results list
  clearBtn.textContent = '→';       // Reset button to the arrow
  clearBtn.classList.remove('has-text');
  searchInput.focus();              // Put the cursor back in the search bar
});

toggleBtn.addEventListener('click', () => {
  showTraditional = !showTraditional;
  
  // Update BOTH the main title and the sub label
  if (showTraditional) {
    titleMainLabel.textContent = '詞典'; // Swaps 词典 to 詞典
    scriptLabel.textContent = '繁體';
    toggleBtn.title = 'Switch to Simplified';
  } else {
    titleMainLabel.textContent = '词典'; // Swaps 詞典 back to 词典
    scriptLabel.textContent = '简体';
    toggleBtn.title = 'Switch to Traditional';
  }
  
  // Instantly re-render
  if (lastQuery) {
    render(search(lastQuery));
  }
});