# Choice

Three controls for yes-or-no and pick-one decisions.

- **Checkbox:** a 22px rounded square, 1.5px ink border, filled ink with a white tick when on. The whole row is the hit target (44px).
- **Switch:** a 40×22 pill for a setting that takes effect immediately, track `rule` when off and `ink` when on.
- **Radio group:** a `<fieldset>` with a `<legend>`, each option a label with a one-line plain consequence under it. The selected option gets an `accent-tint` wash.

Every consent control states its consequence in its own label. Consent defaults off unless the person arrived through the context it names, and then the screen says why it is on.
