# Ambiguity ledger — extraction & structure

Issues that must **not** be treated as authoritative until validated.

| id | topic | notes | resolver |
| --- | --- | --- | --- |
| AMB-001 | Dense tables | `pdf-parse` flattifies tabular layouts; reconcile Part four cross-walk, Part ten pricing grid, and any multi-column summaries against PDF visually. | — |
| AMB-002 | Figures / diagrams | If the PDF ships charts not represented as extracted text, export to `assets/` and link from the nearest part section. None captured in this automated pass. | — |
| AMB-003 | Boilerplate fidelity | Safety stage templated wording (Part three) carries legal/process weight—run legal + ops review before `status: canonical`. | — |
| AMB-004 | Part three internal labels | Many `Item NN:`, `A1.`, and `A2.` markers stayed inline after PDF flattening; verify against PDF and insert `###` headings where the layout shows breaks. | — |
