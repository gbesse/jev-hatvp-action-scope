// Objectif : effectuer un appel Jev synthétique uniquement sur demande explicite.
import { createJevClient } from "../src/jev.mjs";
import { assessInterestAction } from "../src/index.mjs";
const client = createJevClient();
const résultat = await assessInterestAction({
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
}, client);
console.log(JSON.stringify({ décision: résultat.decision, confiance: résultat.confidence, usage: résultat.usage }, null, 2));
