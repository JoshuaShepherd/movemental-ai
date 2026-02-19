#!/usr/bin/env python3
"""One-off: Merge mDNA course (with weeks) into alan-hirsch.json contentLibrary.courses."""
import json
from pathlib import Path

data_dir = Path(__file__).resolve().parent
alan_path = data_dir / "alan-hirsch.json"
mdna_path = data_dir / "courses" / "mdna.json"

alan = json.loads(alan_path.read_text(encoding="utf-8"))
mdna = json.loads(mdna_path.read_text(encoding="utf-8"))

existing = [c for c in alan["contentLibrary"]["courses"] if c.get("slug") != "mdna"]
alan["contentLibrary"]["courses"] = [mdna] + existing

alan_path.write_text(json.dumps(alan, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print("Merged mDNA course into alan-hirsch.json (courses[0])")
print("Course has", len(mdna.get("weeks", [])), "weeks")
