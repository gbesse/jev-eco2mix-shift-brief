// Objectif : implémenter la frontière de décision métier propre au dépôt.
import { readFile } from "node:fs/promises";
export const DECISIONS = Object.freeze({
  "notable_shift": "evolution_notable",
  "review_required": "revue_requise",
  "ordinary_variation": "variation_ordinaire",
  "no_observation": "aucune_observation_fournie"
});
const CRITERIA = Object.freeze({
  "notable_shift": "evolution notable",
  "review_required": "revue requise",
  "ordinary_variation": "variation ordinaire",
  "no_observation": "aucune observation fournie"
});
export function powerMixCase(input) {
  if (!input?.id || !input?.text || !input?.source?.url || !input?.source?.date) throw new TypeError("Le dossier exige id, text, source.url et source.date");
  const date = new Date(input.source.date);
  if (Number.isNaN(date.valueOf())) throw new TypeError("source.date doit être une date ISO valide");
  return { ...input, id: String(input.id), text: String(input.text).trim(), source: { url: String(input.source.url), date: date.toISOString() } };
}
export async function assessPowerMixShift(input, provider) {
  const record = powerMixCase(input);
  if (Array.isArray(record.observations) && record.observations.length === 0) return { decision: "no_observation", label: DECISIONS["no_observation"], probability: 1, review: false, deterministic: true };
  const response = await provider.decide({
    state: record,
    questions: { decision: { type: "choice", instructions: "Analysez ce dossier à partir des seuls éléments sourcés. Évaluez les évolutions calculées de consommation, production, échanges et émissions, ainsi que le contexte temporel explicitement fourni. Choisissez la catégorie la plus prudente. N’inventez ni fait, ni règle applicable, ni garantie.", criteria: CRITERIA } },
  });
  const answer = response.answers.decision;
  return { decision: answer.choice, label: DECISIONS[answer.choice], probability: answer.probabilities[answer.choice], confidence: answer.confidence, review: answer.confidence < 0.8, deterministic: false, usage: response.usage };
}
export async function runCli(argv, io = console) {
  if (argv.length !== 1) throw new Error("Usage : jev-eco2mix-shift-brief <dossier.json>");
  const dossier = powerMixCase(JSON.parse(await readFile(argv[0], "utf8")));
  io.log(JSON.stringify({ dossier, prochaineÉtape: "Transmettez ce dossier à assessPowerMixShift avec un fournisseur Jev configuré." }, null, 2));
}
