# Latest rehearsal

Status: **passed**. 2026-11-05T15:17:44.566Z. Duration: 137.8 seconds.

[Summary and exact commands](rehearsals/2026-11-05T15-15-26-792Z-6wxAei/summary.json). Raw logs and source fingerprints are in the same directory.

- Opening another scene preserved edited source and a user note in an earlier run.
- Shipping and cap failures contain the intended value mismatches; fixes pass.
- The minimum-order mutant survives before AC-03b and is killed after it; the gate enforces that case.
- Edited expected values kept every behavioral check green; only the acceptance lock blocked release. Restored tests expose the regression.
- Business tests pass with the seeded UI defect; a real built-UI assertion detects €105 instead of €95 and passes after the fix.
- Seeded UI defect blocked release at the browser check; no archive exists.
- Fixed release produced a static archive containing index.html and assets.
