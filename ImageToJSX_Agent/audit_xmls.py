import glob
import xml.etree.ElementTree as ET
import os

all_xmls = glob.glob('C:/Users/SDS/Desktop/ALL_SCREENS_XML/*.xml')
print(f'Total XMLs: {len(all_xmls)}')

all_types = set()
items_with_special_chars = []
empty_screens = []
non_ascii_names = []
text_blocks = []

for f in all_xmls:
    base = os.path.basename(f)
    try:
        tree = ET.parse(f)
        root = tree.getroot()
        items = root.findall('.//Hmi.ScreenItem')
        if not items:
            empty_screens.append(base)
        for it in items:
            al = {c.tag: c.text for c in it.find('AttributeList')}
            t = al.get('Type', '')
            name = al.get('Name', '')
            all_types.add(t)
            if '"' in name or '\\' in name or '<' in name or '>' in name:
                items_with_special_chars.append((base, name))
            try:
                name.encode('ascii')
            except UnicodeEncodeError:
                non_ascii_names.append((base, name))
    except Exception as e:
        print(f'Error reading {base}: {e}')

print('All ScreenItem types across 211 XMLs:')
for t in sorted(all_types):
    print(' ', t)

print(f'\nEmpty screens: {len(empty_screens)} -> {empty_screens}')
print(f'Items with quotes/backslashes/angle brackets: {len(items_with_special_chars)} -> {items_with_special_chars[:5]}')
print(f'Items with non-ASCII characters: {len(non_ascii_names)}')
