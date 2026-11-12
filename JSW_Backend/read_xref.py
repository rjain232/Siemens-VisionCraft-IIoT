import sqlite3

db_path = r"D:\Downloads\MB2_Extracted\XRef\XRef.db"
conn = sqlite3.connect(db_path)
c = conn.cursor()

for t in ['info', 'parts', 'objs', 'rels', 'addrs']:
    cols = [col[1] for col in c.execute(f"PRAGMA table_info({t})").fetchall()]
    count = c.execute(f"SELECT count(*) FROM {t}").fetchone()[0]
    print(f"\nTable {t} ({count} rows): {cols}")
    sample = c.execute(f"SELECT * FROM {t} LIMIT 3").fetchall()
    print(" Sample:", sample)
