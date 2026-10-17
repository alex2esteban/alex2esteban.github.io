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

    for (const line of lines) {
      const cleanLine = line.trim();
      // Skip empty lines, comments, and metadata
      if (!cleanLine || cleanLine.startsWith('#') || cleanLine.startsWith('//')) continue;

      const bracketStart = cleanLine.indexOf('[');
      const bracketEnd = cleanLine.indexOf(']');
      const slashStart = cleanLine.indexOf('/');
      const slashEnd = cleanLine.lastIndexOf('/');

      // Ensure the line has the right structure: Word Word [Pinyin] /Def/
      if (bracketStart > 0 && bracketEnd > bracketStart && slashStart > bracketEnd && slashEnd > slashStart) {
        
        // Extract Chinese characters
        const headwords = cleanLine.substring(0, bracketStart).trim().split(/\s+/);
        const traditional = headwords[0];
        const simplified = headwords.length > 1 ? headwords[1] : headwords[0];
        
        // Extract Pinyin
        const pinyin = cleanLine.substring(bracketStart + 1, bracketEnd).trim();
        
        // Extract Definitions
        const defsString = cleanLine.substring(slashStart + 1, slashEnd);
        const definitions = defsString.split('/').filter(d => d.length > 0);

        if (traditional && simplified && pinyin && definitions.length > 0) {
          entries.push({ traditional, simplified, pinyin, definitions });
        }
      }
    }

    self.postMessage({ entries });
  } catch (err) {
    self.postMessage({ error: err.message });
  }
};