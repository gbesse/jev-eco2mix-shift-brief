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
void assessPowerMixShift(dossier, createFakeProvider(() => ({ model: "jev-1.13.0", answers: { decision: { type: "choice", choice: "notable_shift", probabilities: { "notable_shift": 0.82, "review_required": 0.06, "ordinary_variation": 0.06, "no_observation": 0.06 }, confidence: 0.82 } } })));

// Ces erreurs attendues protègent le contrat des consommateurs TypeScript.
// @ts-expect-error — un fournisseur doit retourner une réponse Jev complète.
createFakeProvider(() => ({}));
const result = await assessPowerMixShift(dossier, createFakeProvider(() => ({ model: "jev-1.13.0", answers: {} })));
const review: boolean = result.review;
void review;
// @ts-expect-error — la revue humaine est un booléen.
const incorrect: string = result.review;
void incorrect;
