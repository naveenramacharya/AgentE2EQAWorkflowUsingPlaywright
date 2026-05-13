const fs = require('fs');
const path = require('path');
const plan = fs.readFileSync('specs/saucedemo-checkout-test-plan.md','utf8').split(/\r?\n/);
const titleToFile = new Map();
for (let i = 0; i < plan.length; i++) {
  const line = plan[i];
  const titleMatch = line.match(/^#### \d+\.\d+\.\s+(TC\d+\.\d+) - (.+)$/);
  if (titleMatch) {
    const title = `${titleMatch[1]} - ${titleMatch[2]}`;
    const fileLine = plan[i+1] || '';
    const fileMatch = fileLine.match(/^\*\*File:\*\* `(.*)`$/);
    if (fileMatch) {
      titleToFile.set(title, path.basename(fileMatch[1]));
    }
  }
}
const specsDir = path.join('tests','saucedemo-checkout');
const files = fs.readdirSync(specsDir).filter(f => f.endsWith('.spec.ts'));
const titleToSource = new Map();
for (const file of files) {
  const content = fs.readFileSync(path.join(specsDir, file),'utf8');
  let idx = 0;
  while (true) {
    const start = content.indexOf('test(', idx);
    if (start === -1) break;
    const headerEnd = content.indexOf('{', start);
    if (headerEnd === -1) break;
    let braceCount = 0;
    let pos = headerEnd;
    do {
      const ch = content[pos];
      if (ch === '{') braceCount++;
      else if (ch === '}') braceCount--;
      pos++;
    } while (braceCount > 0 && pos < content.length);
    const end = content.indexOf('});', pos-1);
    if (end === -1) break;
    const blockEnd = end + 3;
    const block = content.slice(start, blockEnd);
    const titleMatch = block.match(/test\s*\(\s*['\"]([^'\"]+)['\"]/);
    if (titleMatch) {
      const title = titleMatch[1];
      if (!titleToSource.has(title)) titleToSource.set(title, block);
    }
    idx = blockEnd;
  }
}
const missingPlans = [];
for (const [title] of titleToFile) {
  if (!titleToSource.has(title)) {
    missingPlans.push(title);
  }
}
console.log('Plan titles:', titleToFile.size);
console.log('Extracted test titles:', titleToSource.size);
if (missingPlans.length) {
  console.log('Missing plan titles from existing tests:');
  console.log(missingPlans.join('\n'));
}
let created = 0;
for (const [title, fileName] of titleToFile) {
  const filePath = path.join(specsDir, fileName);
  if (fs.existsSync(filePath)) continue;
  const block = titleToSource.get(title);
  if (!block) continue;
  const content = `// spec: specs/saucedemo-checkout-test-plan.md\n// seed: tests/seed.spec.ts\n\nimport { test, expect } from '@playwright/test';\n\n${block}\n`;
  fs.writeFileSync(filePath, content);
  created++;
}
console.log('Created files:', created);
