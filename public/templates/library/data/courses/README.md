# Course curriculum data

Course JSON here follows the templates’ **fixed course learning architecture**: weeks in standard order (0–8), lessons with sections `video`, `scripture`, `reading`, `action`, `reflection`, `lookingAhead`.

- **mdna.json** — mDNA: Rediscovering the Movement DNA Within. Converted from `content-library/courses/mdna/` (Markdown) via `content-library/scripts/mdna_course_to_json.py`. This course is also merged into `alan-hirsch.json` as the first course so the learn view can load it.

To regenerate mdna.json from the content-library repo:

```bash
cd content-library
python scripts/mdna_course_to_json.py path/to/templates/directories/data/courses/mdna.json
```

Then re-run the merge so alan-hirsch gets the updated curriculum:

```bash
cd templates/directories/data
python merge_mdna_course.py
```
