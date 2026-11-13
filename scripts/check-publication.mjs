import { execFileSync } from 'node:child_process';

// Check tracked content, including the staged publication candidate. This complements
// manual review and dependency auditing; it is not a guarantee of no secrets.
const files = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' })
  .split('\0')
  .filter(Boolean);
if (!files.length) throw new Error('No tracked publication candidate. Stage files first.');
const forbidden =
  /(^|\/)(?:\.env(?:\..*)?|\.local|\.vercel|node_modules|\.next|test-results|playwright-report|coverage|\.DS_Store)(?:\/|$)|\.(?:log|pem|key|sqlite|sqlite3|db)$/i;
const patterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  new RegExp('gh' + '[pousr]_[A-Za-z0-9]{30,}'),
  new RegExp('github_' + 'pat_[A-Za-z0-9_]{30,}'),
  new RegExp('(?:sk|rk)_' + '(?:live|test)_[A-Za-z0-9]{16,}'),
  /postgres(?:ql)?:\/\/[^\s:@]+:[^\s@]+@/,
];
const failures = [];
for (const file of files) {
  if (forbidden.test(file) && file !== '.env.example')
    failures.push(`${file}: private/generated filename`);
  const candidate = execFileSync('git', ['show', `:${file}`], { maxBuffer: 20 * 1024 * 1024 });
  if (candidate.length > 15 * 1024 * 1024) failures.push(`${file}: unexpectedly large file`);
  if (/\.(?:png|jpg|jpeg|webp|avif|woff2?|ico|pdf)$/i.test(file)) continue;
  const content = candidate.toString('utf8');
  if (patterns.some((pattern) => pattern.test(content)))
    failures.push(`${file}: possible credential`);
}
if (failures.length) throw new Error(failures.join('\n'));
console.log(
  `Publication scan passed: ${files.length} tracked files; no flagged private files or credential patterns.`,
);
