// worker.js
self.onmessage = async (e) => {
  const url = e.data.url;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Could not find ${url}. Check the file name!`);
    
    const text = await response.text();
    const entries = [];

    // Split on both Windows (\r\n) and Mac/Linux (\n) line endings
    const lines = text.split(/\r?\n/);

    for (let i = 0; i < lines.length; i++) {
      const cleanLine = lines[i].trim();
      if (!cleanLine) continue;

      // Skip header row if it exists
      if (i === 0 && (cleanLine.toLowerCase().includes('word') || cleanLine.toLowerCase().includes('ipa'))) {
        continue;
      }

      // Find the first delimiter (either a tab or a comma)
      const tabIndex = cleanLine.indexOf('\t');
      const commaIndex = cleanLine.indexOf(',');
      
      let splitIndex = -1;
      if (tabIndex !== -1 && (commaIndex === -1 || tabIndex < commaIndex)) {
        splitIndex = tabIndex;
      } else if (commaIndex !== -1) {
        splitIndex = commaIndex;
      }

      if (splitIndex === -1) continue; // Skip lines with no delimiter

      const word = cleanLine.substring(0, splitIndex).trim();
      const ipa = cleanLine.substring(splitIndex + 1).trim(); // Grabs EVERYTHING after the word

      if (word && ipa) {
        entries.push({ word, ipa });
      }
    }

    self.postMessage({ entries });
  } catch (err) {
    self.postMessage({ error: err.message });
  }
};