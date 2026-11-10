import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const page = () => readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('the homepage names X663 GSI fixes in its primary heading', () => {
  const headings = [...page().matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  assert.equal(headings.length, 1, 'Visitors need one actual H1, not a logo iframe.');
  assert.match(headings[0][1].replace(/<[^>]*>/g, ''), /GSI fixes for Infinix X663/);
});

test('the primary action uses one clear label in the navigation, hero, and close', () => {
  const actions = [...page().matchAll(/<a\b[^>]*class="[^"]*btn--primary[^"]*"[^>]*>([\s\S]*?)<\/a>/gi)];
  assert.equal(actions.length, 3, 'Only navigation, hero, and close carry the primary action.');
  for (const action of actions) {
    assert.equal(action[1].replace(/<[^>]*>/g, '').trim(), 'Get patch files');
  }
});
