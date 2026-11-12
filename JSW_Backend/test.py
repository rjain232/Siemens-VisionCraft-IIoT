
import xml.etree.ElementTree as ET
tree = ET.parse(r'D:\Downloads\MB2_Extracted\HMI\HMI.al20')
root = tree.getroot()
print('Root tag:', root.tag)
print('Root attrib:', root.attrib)
for elem in root.iter():
    for k, v in elem.attrib.items():
        if any(term in str(v).lower() for term in ['screen', 'tag', 'hmi', 'faceplate', 'button', 'gauge', 'motor']):
            print(f'{elem.tag} -> {k}: {v}')
