import glob
import xml.etree.ElementTree as ET
import os

all_xmls = glob.glob('C:/Users/SDS/Desktop/ALL_SCREENS_XML/*.xml')

unhandled_types = ['HmiAlarmControl', 'HmiBar', 'HmiPolygon', 'HmiScreenWindow', 'HmiSystemDiagnosisControl', 'HmiTrendControl', 'HmiWebControl']

found = {}
for u in unhandled_types:
    found[u] = []

for f in all_xmls:
    base = os.path.basename(f)
    try:
        tree = ET.parse(f)
        for it in tree.findall('.//Hmi.ScreenItem'):
            al = {c.tag: c.text for c in it.find('AttributeList')}
            t = al.get('Type', '')
            if t in unhandled_types:
                clean_name = al.get('Name', '').encode('ascii', 'replace').decode('ascii')
                found[t].append((base, clean_name, al.get('Left'), al.get('Top'), al.get('Width'), al.get('Height')))
    except Exception as e:
        pass

for t, items in found.items():
    print(f'=== Type: {t} ({len(items)} occurrences) ===')
    for it in items[:3]:
        print(' ', it)
