---
title: "Shelton–Alcaraz pre-match analysis (2026 US Open)"
permalink: /portfolio/shelton-alcaraz/
layout: single
author_profile: true
excerpt: "A reproducible analysis of serve patterns, point-by-point data, and strategic adaptation in tennis."
---

<p class="project-label">SPORTS ANALYTICS · TENNIS · GAME THEORY</p>

## Tennis tactics through data and game theory

This project examines Ben Shelton’s serving options ahead of his 2026 US Open quarterfinal against Carlos Alcaraz. I conducted the analysis before the match and published the initial results on [LinkedIn](https://www.linkedin.com/feed/update/urn:li:activity:7503228324257656832/); the fully reproducible version was released afterward on [Github](https://github.com/SlimaneD/Shelton-Alcaraz-USOpen26).


The central question is whether Shelton could gain an advantage from a classic combination rather than relying on serve speed alone: serving wide, then directing his serve+1 to the opposite side. I call this the "Wide+opposite" strategy. The project combines point-by-point tennis data with an exploratory two-player game to investigate the tactic.

[View source code](https://github.com/SlimaneD/Shelton-Alcaraz-USOpen26){: .btn .btn--primary}
[Launch in Binder](https://mybinder.org/v2/gh/SlimaneD/Shelton-Alcaraz-USOpen26/main?labpath=SheltonAlcaraz.ipynb){: .btn .btn--success}
[Open in Google Colab](https://colab.research.google.com/github/SlimaneD/Shelton-Alcaraz-USOpen26/blob/main/SheltonAlcaraz.ipynb){: .btn .btn--info}
[Original LinkedIn post](https://www.linkedin.com/feed/update/urn:li:activity:7503228324257656832/){: .btn .btn--inverse}

## Descriptive evidence

Among Shelton's charted service points for which the return landed in play, the historical point-win rates were:

<div class="result-grid">
  <div><strong>57.4%</strong><span>Wide + opposite</span><small>526 points</small></div>
  <div><strong>47.3%</strong><span>Wide + elsewhere</span><small>537 points</small></div>
  <div><strong>50.2%</strong><span>Non-wide</span><small>1,448 points</small></div>
</div>

The comparison suggests that the wide-and-opposite pattern deserves attention. It does not, by itself, establish that choosing the pattern causes the higher win rate.

## Building the exploratory game

I combined two historical samples: Shelton's point-win rates while serving against his charted opponents, and Alcaraz's point-win rates while returning against his charted opponents. These estimates form the payoff matrices of an exploratory strategic model.

<figure class="project-figure">
  <img src="/assets/images/shelton_alcaraz/payoff_matrices.png" alt="Estimated Shelton serving and Alcaraz returning payoff matrices">
  <figcaption>Estimated performance scores for the serving and returning strategy combinations.</figcaption>
</figure>

The replicator dynamics then illustrate how the frequencies of the modelled tactics would change under a payoff-comparison updating rule. This connects an applied tennis question to my background in evolutionary game theory.

<figure class="project-figure">
  <img src="/assets/images/shelton_alcaraz/shelton_alcaraz_phase_portrait.png" alt="Replicator-dynamics phase portrait for the Shelton–Alcaraz exploratory game">
  <figcaption>Phase portrait showing the direction and speed of tactical adaptation in the exploratory game.</figcaption>
</figure>

<figure class="project-figure">
  <img src="/assets/images/shelton_alcaraz/shelton_alcaraz_payoff_difference.png" alt="Payoff-difference map for the Shelton–Alcaraz exploratory game">
  <figcaption>Payoff differences across the tactical state space.</figcaption>
</figure>

## What I built

- A parser for crowdsourced shot-by-shot tennis records
- Feature engineering for serve direction, return outcome, and serve+1 placement
- Descriptive comparisons with explicit sample definitions and point counts
- An exploratory two-player game based on separate serving and returning samples
- Replicator-dynamics visualisations using the tagged `v0.2.0` release of [pyNamo-EGT](/portfolio/pynamo/)
- Reproducible Jupyter notebooks with recorded package versions, input hashes, and data revision
- Browser-based execution through Binder and Google Colab

The main notebook uses Python 3.12 and portable Matplotlib settings. A separate publication notebook recreates the figures with publication typography.

## Scope and limitations

The results are historical associations rather than causal estimates. The wide-and-opposite pattern is observable only when the return comes back and Shelton attempts a serve+1. Opponent, surface, return quality, execution difficulty, and missing shot annotations may all influence the comparison.

Shelton's serving observations and Alcaraz's returning observations also come from different opponent populations. Their payoffs are therefore separate performance scores, not complementary head-to-head probabilities. The game and its dynamics are an exploratory account of adaptation under stated assumptions; they are not a match forecast.

## Reproducibility and data

The [complete analysis notebook](https://github.com/SlimaneD/Shelton-Alcaraz-USOpen26/blob/main/SheltonAlcaraz.ipynb) contains the parser, feature engineering, descriptive analysis, game construction, checks, and provenance record. It downloads the required data from a pinned revision when a local copy is unavailable.

The analysis uses crowdsourced shot-by-shot professional tennis data from the [Tennis Abstract Match Charting Project](http://www.tennisabstract.com/charting/meta.html). The data are licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/); the repository contains the [complete attribution and reuse notice](https://github.com/SlimaneD/Shelton-Alcaraz-USOpen26/blob/main/DATA_ATTRIBUTION.md).
