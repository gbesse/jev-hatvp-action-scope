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
void assessInterestAction(dossier, createFakeProvider(() => ({})));
