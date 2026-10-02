// Objectif : vérifier les types publiés depuis un projet consommateur.
import { powerMixCase, assessPowerMixShift, DECISIONS } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const dossier = powerMixCase({
  "id": "exemple-1",
  "text": "Série synthétique : baisse simultanée de la consommation et des émissions estimées, avec hausse documentée d’une filière bas-carbone sur plusieurs pas comparables.",
  "source": {
    "url": "https://example.test/source-publique",
    "date": "2026-10-01"
  },
  "details": {
    "territoire": "France — cas synthétique",
    "origine": "donnée synthétique"
  }
});
void DECISIONS;
void assessPowerMixShift(dossier, createFakeProvider(() => ({})));
