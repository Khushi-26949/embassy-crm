import re
from pathlib import Path

root = Path(__file__).resolve().parent.parent
file_paths = [p for p in root.rglob('*') if p.suffix in {'.ts', '.tsx'} and 'node_modules' not in p.parts]

patterns = [
    (re.compile(r'(?<![\w\-])text-ink(?![\w\-/])'), 'text-ink dark:text-ivory'),
    (re.compile(r'(?<![\w\-])text-ink/60(?![\w\-/])'), 'text-ink/60 dark:text-ivory/60'),
    (re.compile(r'(?<![\w\-])bg-white(?![\w\-/])'), 'bg-white dark:bg-night-card'),
    (re.compile(r'(?<![\w\-])border-coolgrey(?![\w\-/])'), 'border-coolgrey dark:border-night-border'),
    (re.compile(r'(?<![\w\-])bg-ivory(?![\w\-/])'), 'bg-ivory dark:bg-night'),
]

file_changes = []
string_pattern = re.compile(r'(["\'])([^"\n]*)\1')

for path in file_paths:
    text = path.read_text(encoding='utf-8')
    original = text

    def is_class_like(content: str) -> bool:
        return bool(re.search(r'\b(?:bg-|text-|border-|dark:|hover:|focus:|rounded|shadow-|px-|py-|w-|h-|grid|flex|gap-|items-|justify-|transition|duration-|ring-)\b', content))

    def dedupe_class_tokens(content: str) -> str:
        tokens = content.split()
        seen = set()
        deduped = []
        for token in tokens:
            if token not in seen:
                seen.add(token)
                deduped.append(token)
        return ' '.join(deduped)

    def replace_in_string_literal(match):
        quote = match.group(1)
        content = match.group(2)
        orig = content

        for pattern, replacement in patterns:
            if replacement in content:
                continue
            content = pattern.sub(replacement, content)

        if is_class_like(content):
            content = dedupe_class_tokens(content)

        return quote + content + quote if content != orig else match.group(0)

    text = string_pattern.sub(replace_in_string_literal, text)
    if text != original:
        path.write_text(text, encoding='utf-8')
        file_changes.append(path)

print(f'Updated {len(file_changes)} files:')
for p in file_changes:
    print(p.relative_to(root))
