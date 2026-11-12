import re

hmi_plf = r"D:\Downloads\MB2_Extracted\HMI\System\PEData.plf"

tags = set()
with open(hmi_plf, "rb") as f:
    chunk_size = 1024 * 1024 * 20  # 20MB
    while chunk := f.read(chunk_size):
        # Match SICAR & Station tag formats, e.g. BSL010..., TecUnit, gantry, sew, etc.
        matches = re.findall(rb"(BSL\d{3}[A-Za-z0-9_\.]+)", chunk)
        for m in matches:
            if len(m) > 7:
                tags.add(m.decode("ascii", errors="ignore"))

print(f"Station Tag references found: {len(tags)}")
sorted_tags = sorted(list(tags))
for t in sorted_tags[:30]:
    print(" -", t)
