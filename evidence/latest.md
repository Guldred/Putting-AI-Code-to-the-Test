# Latest rehearsal

Status: **passed**. 2026-10-30T10:54:51.092Z. Duration: 95.1 seconds.

[Summary and exact commands](rehearsals/2026-10-30T10-53-15-996Z-rKlUfz/summary.json). Raw logs and source fingerprints are in the same directory.

- Opening another scene preserved edited source and a user note in an earlier run.
- Shipping and cap failures contain the intended value mismatches; fixes pass.
- The minimum-order mutant survives before AC-03b and is killed after it; the gate enforces that case.
- Business tests pass with the seeded UI defect; a real built-UI assertion detects €105 instead of €95 and passes after the fix.
- Seeded UI defect blocked release at the browser check; no archive exists.
- Fixed release produced a static archive containing index.html and assets.
