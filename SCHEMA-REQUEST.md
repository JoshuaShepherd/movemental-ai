# Schema requests

No DDL originates from the migration. Append a row here instead, and ship the
UI in its degraded state until the schema lands.

## Format

### <short name>

- **Wanted by:** <screen / route>
- **Shape:** <table, columns, types, or the column being added>
- **Why the migration cannot do it:** <usually: DDL is out of scope>
- **What the UI does meanwhile:** <the honest degraded state>
- **Raised:** <ISO date>

## Requests

_None yet._

## Explicitly not a schema request

- `movement_leaders.primary_role` — the column **exists** and is empty for 24 of
  25 rows. This is a content gap. It goes in the receipt, not here. Do not add a
  second column to work around it.
