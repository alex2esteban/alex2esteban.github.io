---
title: The system I use to actually retain vocabulary (no flashcards)
date: 2026-04-26
---

<div class="layout">

  <p class="last-updated">Last updated: June 2026</p>

  <div class="contents-table">
    <p><strong>Contents</strong></p>
    <ul>
      <li><a href="#workflow">Workflow</a></li>
      <li><a href="#timeline-guide">Timeline (guide)</a></li>
      <li><a href="#method-applied">Method applied</a></li>
    </ul>
  </div>

  <div class="main-content">
    <p>Learning vocabulary through stories has the advantage of placing all new vocab <b>into context</b> (unlike flashcards, which are just floating words). What we're looking for is to read a story with a % of target words, having them appear naturally in a story we can understand, so we can gain intuitive understanding of the words to learn and see how they actually work in a real sentence. The goal is not immediate recall, but <b>repeated exposure</b> in meaningful contexts, which gradually <b>builds familiarity</b> and later supports <b>long-term retention</b>.</p>
    <p>The % of words the story should have depends on the capacity we have to read through the stories. A high % will feel overwhelming, while a low % means we need a long story to learn new words, making learning slower. The table shows the ideal % based on what we are looking for; in this case I would aim for 5-10%.</p>
    <table>
      <thead>
        <tr>
          <th>Unknown words</th>
          <th>Good for</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>0–5%</td>
          <td>fluency and enjoyment (Extensive reading)</td>
        </tr>
        <tr>
          <td>5–15%</td>
          <td>learning, but may slow you down</td>
        </tr>
        <tr>
          <td>15–30%</td>
          <td>intensive study, but harder and tiring</td>
        </tr>
        <tr>
          <td>+30%</td>
          <td>too difficult, better to switch or pre-learn vocab</td>
        </tr>
      </tbody>
    </table>
    <p>If we do the math, a story with 60 new words should have 600-1200 words if we aim for the 5-10%.</p>
    <h2 id="workflow">Workflow</h2>
      <p>The ideal thing would be to just buy a book with the targeted words. The problem is each person will have their own set of target words, and a book will never impact everyone the same. This is why I developed a custom method to learn vocabulary.</p>
      <p>The idea is to create a story using AI and feeding it with the words you target. I create a new story with new words every week so I can be consistent. To explain my complete workflow, I will keep following the example of learning 60 new words/week.</p>
      <h3>1. Select 60 new words</h3>
        <p>First we need to know which words we're targeting. The way you can control this long term is to have an Excel with all the words you want to master (I'm talking thousands).</p>
        <p>My target language being Chinese, I just look for HSK lists, each word classified by HSK level; in total, I collected over 5000 words I'd like to master in a mid-term basis. For other languages that are not this structured, I would simply look for frequency lists and follow that order (e.g., 10000 most frequent words in <i>[target language]</i>).</p>
        <p>Once we have the Excel with all the words, we should select in another column whether we know the word or not (e.g., with a checkbox), so we can filter and get the first 60 unknown words.</p>
        <img src="/images/word-list.jpg" alt="Word list" class="article-img">
      <h3>2. Create stories using these words</h3>
        <p class="article-note">Note: I used to have a middle step here where I classified the words to create multiple stories, although I ended up just creating a longer one. You can read on this step <a href="/articles/method-for-learning-vocabulary-old/">here</a>.</p>
        <p>Now we will use AI to create a story using these words. The instructions to give are, among others, the % of unknown words we feel comfortable with, and that the other words should all be your level or a level below your current level (I use HSK for Chinese; you can use CEFR levels for other languages or equivalent). I optimized a prompt that now gives me the result I expect:</p>
        <div class="ai-prompt">
          <p class="article-note">AI prompt</p>
          <div class="no-spacing">
            <p>Objective: Create a coherent, engaging Chinese story (HSK3 level) that maximizes repetition of provided vocabulary words to aid memorization, while keeping other words simple (HSK3 or below).</p>
            <p>Requirements:</p>
            <p>1. Length & Repetition:</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. 600-1200 characters (long enough for natural repetition).</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. Each target word appears 5+ times.</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. Highlight all target words in bold for visibility.</p>
            <p>2. Vocabulary Integration: Use words in multiple contexts (dialogue, narration, descriptions).</p>
            <p>3. Natural Flow:</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. 5-10% target word density (avoid forced repetition).</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. Weave words into plot events.</p>
            <p>4. Title: Include in Chinese</p>
            <p>5. Mandatory Words (must include all):</p>
            <p>Word 1</p>
            <p>Word 2</p>
            <p>Word 3</p>
          </div>
        </div>
        <p>The numerical parameters can be adjusted later according to your feeling when reading it, e.g., make the story longer if you felt too much density of new words, or aiming for more words if you felt it easy.</p>
        <p>So with the Excel and this simple prompt, we can easily replicate the "book" idea but personalized to our own situation.</p>
      <h3>3. Read the story</h3>
        <p>For ease, I paste the story into a pdf, I select a font I like (KaiTi), and send it to my ebook.</p>
        <p>Rather than reading the whole story in one sitting, I read a bit of it each day across the week: low effort, no rush to finish. I don't re-read the story; I'd be lazy to go back over it repeatedly, just what happens with flashcards. A single relaxed pass through the week is the exposure we want.</p>
      <h3>4. Track the progress</h3>
        <p>This step is really important, since it will update our known words list to feed our next prompts.</p>
        <p>I will show how the advantages of using flashcards are not lost:</p>
        <ul>
          <li>spaced repetition is achieved through light daily reading throughout the week, which naturally re-exposes vocabulary</li>
          <li>active recall is introduced by delaying the review of the word list after reading the story (memory is tested after a delay of 2-3 weeks)</li>
        </ul>
        <p>The tracking process is as follows:</p>
        <p class="article-link">
          <span class="article-arrow">→</span>
          <span>Week 0 Sunday — Create the story (Steps 1 and 2).</span>
        </p>
        <p class="article-link">
          <span class="article-arrow">→</span>
          <span>Week 1 Sunday — Read the story (Step 3).</span>
        </p>
        <p class="article-link">
          <span class="article-arrow">→</span>
          <span>Week 3 Sunday — Check the selected words (hiding their meaning) to check if they stuck into our long-term memory. If they did, check the box; if not, they will be used again in a future story.</span>
        </p>
        <p>The words used in the Week 0 story will stay on hold until the Week 3 review, meaning the next week story should focus on completely different words.</p>
        <p class="article-note">Note: week numbers are relative.</p>
        <p class="article-note">Note: I considered 2 weeks to determine whether a word is known. This number changes based on each person and on the amount of new words.</p>
    <h2 id="timeline-guide">Timeline (guide)</h2>
      <p>If we learn 60 new words per week, this is the time it will take to reach the desired level (in my case, HSK6).</p>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Cumulative New Words</th>
            <th>Estimated Level (old HSK?)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1 month</td>
            <td>~240 words</td>
            <td>Finish HSK3, start HSK4</td>
          </tr>
          <tr>
            <td>3 months</td>
            <td>~720 words</td>
            <td>Solid HSK4</td>
          </tr>
          <tr>
            <td>6 months</td>
            <td>~1,440 words</td>
            <td>Entering HSK5</td>
          </tr>
          <tr>
            <td>9 months</td>
            <td>~2,160 words</td>
            <td>Mid-HSK5</td>
          </tr>
          <tr>
            <td>12 months</td>
            <td>~2,880 words</td>
            <td>Approaching HSK6</td>
          </tr>
          <tr>
            <td>18 months</td>
            <td>~4,320 words</td>
            <td>Strong HSK6</td>
          </tr>
          <tr>
            <td>24 months</td>
            <td>~5,760 words</td>
            <td>Full HSK6 vocab</td>
          </tr>
        </tbody>
      </table>
      <p>In practice, expect this to take longer with inconsistent weeks and >50% of words not sticking on the first pass.</p>
    <h2 id="method-applied">Method applied</h2>
      <p>After a year of starting this method, I've gone from ~1000 to ~2000 checked words (easy to calculate with the Excel list!). That's slower than the 60 words/week pace in the timeline above suggests; other personal goals made it hard to do this every single week, so some weeks were skipped entirely. Also, it's worth mentioning that the Week 3 check is a real filter: normally, over half the words in a story aren't retained on the first pass and go back into rotation for a future story. That's by design, not a failure of the method (active recall part doing its job).</p>
      <p>I'm currently targeting 100 new words per week, so I adjusted some numbers. Once a few months of the 60-word version confirmed I could keep up and the words were actually sticking, I increased the learning pace, which means a longer story (2500+ characters) and a slightly wider density range (5–15%) to fit them all naturally.</p>
      <div class="ai-prompt no-spacing">
        <p>Objective: Create a coherent, engaging Chinese story (HSK3 level) that maximizes repetition of provided vocabulary words to aid memorization, while keeping other words simple (HSK3 or below).</p>
        <p>Requirements:</p>
        <p>1. Length & Repetition:</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. 2500+ characters (long enough for natural repetition).</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. Each target word appears 5-10+ times.</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. Highlight all target words in bold for visibility.</p>
        <p>2. Vocabulary Integration: Use words in multiple contexts (dialogue, narration, descriptions).</p>
        <p>3. Natural Flow:</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. 5-15% target word density (avoid forced repetition).</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. Weave words into plot events.</p>
        <p>4. Title: Include in Chinese</p>
        <p>5. Mandatory Words (must include all):</p>
        <p>白（副）	bái	without results; in vain; waste efforts</p>
        <p>不得不	bùdébù	cannot but</p>
        <p>曾经	céngjīng	once</p>
        <p>朝	cháo	towards</p>
        <p>将来	jiānglái	future</p>
        <p>较	jiào	relatively; quite</p>
        <p>恐怕	kǒngpà	I’m afraid</p>
        <p>缺	quē	be short of; lack</p>
        <p>通常	tōngcháng	usually</p>
        <p>由	yóu	from</p>
        <p class="article-note">... (words 11–100 omitted for space)</p>
      </div>
      <p>And <a href="/images/语境词汇学习—第25周.pdf" target="_blank">here</a> is a pdf of a story I used.</p>
  </div>
</div>