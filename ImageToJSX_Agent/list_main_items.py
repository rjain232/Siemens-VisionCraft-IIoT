import xml.etree.ElementTree as ET

tree = ET.parse('C:/Users/SDS/Desktop/ALL_SCREENS_XML/Main.xml')
for it in tree.findall('.//Hmi.ScreenItem'):
    al = {c.tag: c.text for c in it.find('AttributeList')}
    print(f"{al.get('Name'):<30} {al.get('Type'):<20} left:{al.get('Left'):<4} top:{al.get('Top'):<4} w:{al.get('Width'):<4} h:{al.get('Height'):<4}")
