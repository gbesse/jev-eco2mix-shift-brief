# Comment la décision est prise

Décrit les changements du mix électrique français à partir des séries éCO2mix calculées et sourcées.

Le code normalise la source et applique d’abord le cas déterministe documenté dans `src/index.mjs`. Pour les autres dossiers, Jev choisit la catégorie la plus prudente selon les évolutions calculées de consommation, production, échanges et émissions, ainsi que le contexte temporel explicitement fourni. Une confiance inférieure à `0.8`, la catégorie `review_required` ou une absence de données choisie par le modèle marque le résultat pour revue humaine. Une collection vide explicitement fournie reste un résultat déterministe sans appel Jev.

Les deltas, parts de filières, périodes comparables et émissions restent calculés par le code.

Les démonstrations ne contiennent que des probabilités synthétiques. Constituez un corpus français annoté, mesurez les erreurs par catégorie et fixez vos propres seuils avant un usage opérationnel.
