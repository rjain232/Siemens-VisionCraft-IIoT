import glob
import xml.etree.ElementTree as ET
import os

all_xmls = glob.glob('C:/Users/SDS/Desktop/ALL_SCREENS_XML/*.xml')

candidates = []
for f in all_xmls:
    base = os.path.basename(f)
    try:
        tree = ET.parse(f)
        for it in tree.findall('.//Hmi.ScreenItem'):
            al = {c.tag: c.text for c in it.find('AttributeList')}
            name = al.get('Name', '')
            for kw in ['mast', 'main', 'menu', 'overview', 'station', 'layout']:
                if kw in name.lower():
                    clean = name.encode('ascii', 'replace').decode('ascii')
                    candidates.append((base, clean, al.get('Type'), al.get('Left'), al.get('Top'), al.get('Width'), al.get('Height')))
                    break
    except:
        pass

print(f'Total candidates: {len(candidates)}')
for c in candidates[:20]:
    print(' ', c)
