import re
from pathlib import Path

root = Path(__file__).resolve().parent.parent
file_paths = [p for p in root.rglob('*') if p.suffix in {'.ts', '.tsx'} and 'node_modules' not in p.parts]

string_pattern = re.compile(r'(["\'])([^"\n]*)\1')
checks = [
    ('text-ink', lambda tokens: 'text-ink' in tokens and any(t.startswith('dark:text-ivory') for t in tokens)),
    ('text-ink/60', lambda tokens: 'text-ink/60' in tokens and 'dark:text-ivory/60' in tokens),
    ('bg-white', lambda tokens: 'bg-white' in tokens and ('dark:bg-night-card' in tokens or 'dark:bg-night-surface' in tokens)),
    ('border-coolgrey', lambda tokens: 'border-coolgrey' in tokens and 'dark:border-night-border' in tokens),
    ('bg-ivory', lambda tokens: 'bg-ivory' in tokens and 'dark:bg-night' in tokens),
]

issues = []
for path in file_paths:
    text = path.read_text(encoding='utf-8')
    for match in string_pattern.finditer(text):
        content = match.group(2)
        tokens = re.split(r'\s+', content.strip())
        for token, validator in checks:
            if token in tokens and not validator(tokens):
                issues.append((path.relative_to(root), content.strip()))
                break

print('Found', len(issues), 'suspicious class strings:')
for p, content in issues[:100]:
    print(f'{p} | {content}')
