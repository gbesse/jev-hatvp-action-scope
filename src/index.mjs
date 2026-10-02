// Objectif : implémenter la frontière de décision métier propre au dépôt.
import { readFile } from "node:fs/promises";
export const DECISIONS = Object.freeze({
  "scope_supported": "perimetre_etaye",
  "review_required": "revue_requise",
  "scope_weak": "perimetre_peu_etaye",
  "no_action": "aucune_action_fournie"
});
const CRITERIA = Object.freeze({
  "scope_supported": "perimetre etaye",
  "review_required": "revue requise",
  "scope_weak": "perimetre peu etaye",
  "no_action": "aucune action fournie"
});
export function interestActionCase(input) {
  if (!input?.id || !input?.text || !input?.source?.url || !input?.source?.date) throw new TypeError("Le dossier exige id, text, source.url et source.date");
  const date = new Date(input.source.date);
  if (Number.isNaN(date.valueOf())) throw new TypeError("source.date doit être une date ISO valide");
  return { ...input, id: String(input.id), text: String(input.text).trim(), source: { url: String(input.source.url), date: date.toISOString() } };
}
export async function assessInterestAction(input, provider) {
  const record = interestActionCase(input);
  if (Array.isArray(record.actions) && record.actions.length === 0) return { decision: "no_action", label: DECISIONS["no_action"], probability: 1, review: false, deterministic: true };
  const response = await provider.decide({
    state: record,
    questions: { decision: { type: "choice", instructions: "Analysez ce dossier à partir des seuls éléments sourcés. Évaluez les politiques publiques, responsables visés et formes d’intervention effectivement décrits dans la déclaration. Choisissez la catégorie la plus prudente. N’inventez ni fait, ni règle applicable, ni garantie.", criteria: CRITERIA } },
  });
  const answer = response.answers.decision;
  return { decision: answer.choice, label: DECISIONS[answer.choice], probability: answer.probabilities[answer.choice], confidence: answer.confidence, review: answer.confidence < 0.8, deterministic: false, usage: response.usage };
}
export async function runCli(argv, io = console) {
  if (argv.length !== 1) throw new Error("Usage : jev-hatvp-action-scope <dossier.json>");
  const dossier = interestActionCase(JSON.parse(await readFile(argv[0], "utf8")));
  io.log(JSON.stringify({ dossier, prochaineÉtape: "Transmettez ce dossier à assessInterestAction avec un fournisseur Jev configuré." }, null, 2));
}
