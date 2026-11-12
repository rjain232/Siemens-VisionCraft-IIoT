import re, os

hmi_plf = r"D:\Downloads\MB2_Extracted\HMI\System\PEData.plf"

tags = set()
screens = set()
connections = set()

with open(hmi_plf, "rb") as f:
    chunk_size = 1024 * 1024 * 10  # 10MB
    while chunk := f.read(chunk_size):
        # find connection names
        matches = re.findall(b"HMI_Connection[a-zA-Z0-9_]*", chunk)
        for m in matches:
            connections.add(m.decode("ascii", errors="ignore"))
        
        # find HMI tags or DB references
        matches_db = re.findall(b"\"[A-Za-z0-9_]+\"\.[A-Za-z0-9_\.]+", chunk)
        for m in matches_db[:50]:
            tags.add(m.decode("ascii", errors="ignore"))

        matches_tag = re.findall(b"Hmi[A-Za-z0-9_]+", chunk)
        for m in matches_tag[:50]:
            tags.add(m.decode("ascii", errors="ignore"))

print("Connections found:", connections)
print(f"Total tag patterns found: {len(tags)}")
print("Sample tags:", list(tags)[:25])
