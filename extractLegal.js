const fs = require('fs');
const { JSDOM } = require('jsdom');

function extractPolicy(inputFile, outputFile, variableName) {
  const html = fs.readFileSync(inputFile, 'utf8');
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const h1s = Array.from(doc.querySelectorAll('h1'));
  let mainH1 = null;
  for (const h of h1s) {
    if (h.textContent.toLowerCase().includes('policy') || h.textContent.toLowerCase().includes('policies')) {
      mainH1 = h;
      break;
    }
  }

  let htmlContent = '';
  let maxTextLen = 0;
  let bestContainer = null;
  doc.querySelectorAll('div, section').forEach(el => {
    if (el.tagName.toLowerCase() === 'header' || el.tagName.toLowerCase() === 'footer' || el.tagName.toLowerCase() === 'nav') return;
    if (el.className.includes('header') || el.className.includes('footer')) return;
    
    const ps = Array.from(el.querySelectorAll('p, li, h2, h3, h4, h5, h6'));
    const textLen = ps.reduce((acc, curr) => acc + curr.textContent.length, 0);
    
    if (textLen > maxTextLen) {
      maxTextLen = textLen;
      bestContainer = el;
    }
  });

  let current = bestContainer;
  while (current) {
    let foundBetter = false;
    for (const child of Array.from(current.children)) {
      if (child.tagName === 'DIV' || child.tagName === 'SECTION') {
        const ps = Array.from(child.querySelectorAll('p, li, h2, h3, h4, h5, h6'));
        const textLen = ps.reduce((acc, curr) => acc + curr.textContent.length, 0);
        if (textLen > maxTextLen * 0.9) {
          current = child;
          foundBetter = true;
          break;
        }
      }
    }
    if (!foundBetter) break;
  }

  htmlContent = current.innerHTML;

  htmlContent = htmlContent.replace(/ class="[^"]*"/g, '');
  htmlContent = htmlContent.replace(/ id="[^"]*"/g, '');
  htmlContent = htmlContent.replace(/â€”/g, '-');
  htmlContent = htmlContent.replace(/â€™/g, "'");
  htmlContent = htmlContent.replace(/—/g, '-');

  const tsContent = `export const ${variableName} = \`${htmlContent.replace(/`/g, '\\`')}\`;\n`;
  fs.writeFileSync(outputFile, tsContent);
  console.log('Wrote', outputFile);
}

extractPolicy('../download/_privacy-policy_.html', 'src/content/privacy-policy.ts', 'privacyPolicyHtml');
extractPolicy('../download/_office-policies_.html', 'src/content/office-policies.ts', 'officePoliciesHtml');
