#!/usr/bin/env python3
"""One-off: Merge mDNA course (with weeks) into alan-hirsch.json contentLibrary.courses."""
import json
from pathlib import Path

data_dir = Path(__file__).resolve().parent
alan_path = data_dir / "alan-hirsch.json"
mdna_path = data_dir / "courses" / "mdna.json"

alan = json.loads(alan_path.read_text(encoding="utf-8"))
mdna = json.loads(mdna_path.read_text(encoding="utf-8"))

# Preserve lesson titles from existing mdna in alan-hirsch (e.g. Alan-voice titles)
existing_mdna = next((c for c in alan["contentLibrary"]["courses"] if c.get("slug") == "mdna"), None)
if existing_mdna and existing_mdna.get("weeks"):
    for wi, week in enumerate(mdna.get("weeks", [])):
        exist_week = next((w for w in existing_mdna["weeks"] if w.get("index") == week.get("index")), None)
        if not exist_week:
            continue
        for li, lesson in enumerate(week.get("lessons", [])):
            exist_lessons = exist_week.get("lessons") or []
            if li < len(exist_lessons) and exist_lessons[li].get("title"):
                lesson["title"] = exist_lessons[li]["title"]

existing = [c for c in alan["contentLibrary"]["courses"] if c.get("slug") != "mdna"]
alan["contentLibrary"]["courses"] = [mdna] + existing

alan_path.write_text(json.dumps(alan, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print("Merged mDNA course into alan-hirsch.json (courses[0])")
print("Course has", len(mdna.get("weeks", [])), "weeks")
