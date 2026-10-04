// Objectif : vérifier les types publiés depuis un projet consommateur.
import { interestActionCase, assessInterestAction, DECISIONS } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const dossier = interestActionCase({
  "id": "exemple-1",
  "text": "Déclaration synthétique : transmission d’une note argumentaire à une direction ministérielle sur les modalités de réemploi des emballages.",
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
void assessInterestAction(dossier, createFakeProvider(() => ({ model: "jev-1.13.0", answers: { decision: { type: "choice", choice: "scope_supported", probabilities: { "scope_supported": 0.82, "review_required": 0.06, "scope_weak": 0.06, "no_action": 0.06 }, confidence: 0.82 } } })));

// Ces erreurs attendues protègent le contrat des consommateurs TypeScript.
// @ts-expect-error — un fournisseur doit retourner une réponse Jev complète.
createFakeProvider(() => ({}));
const result = await assessInterestAction(dossier, createFakeProvider(() => ({ model: "jev-1.13.0", answers: {} })));
const review: boolean = result.review;
void review;
// @ts-expect-error — la revue humaine est un booléen.
const incorrect: string = result.review;
void incorrect;
