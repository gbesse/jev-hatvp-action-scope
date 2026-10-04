# Comment la décision est prise

Classe les actions déclarées par les représentants d’intérêts sans inférer d’influence non documentée.

Le code normalise la source et applique d’abord le cas déterministe documenté dans `src/index.mjs`. Pour les autres dossiers, Jev choisit la catégorie la plus prudente selon les politiques publiques, responsables visés et formes d’intervention effectivement décrits dans la déclaration. Une confiance inférieure à `0.8`, la catégorie `review_required` ou une absence de données choisie par le modèle marque le résultat pour revue humaine. Une collection vide explicitement fournie reste un résultat déterministe sans appel Jev.

Le dépôt décrit uniquement les informations déclarées et n’infère ni influence cachée ni conflit d’intérêts.

Les démonstrations ne contiennent que des probabilités synthétiques. Constituez un corpus français annoté, mesurez les erreurs par catégorie et fixez vos propres seuils avant un usage opérationnel.
