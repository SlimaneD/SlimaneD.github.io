---
title: "What makes pressing succeed?"
permalink: /portfolio/pressing-ml/
layout: single
author_profile: true
excerpt: "Animation-driven feature exploration, logistic regression and DeepSets on A-League tracking data. A home advantage in pressing that pressing style cannot explain."
---

<p class="project-label">SPORTS ANALYTICS · FOOTBALL · MACHINE LEARNING · TRACKING DATA</p>

[View source code](https://github.com/SlimaneD/football-aggression-index){: .btn .btn--primary}

*Part 2 of a two-part investigation. [Part 1](/portfolio/territorial/) showed that 94% of European teams press more aggressively at home than away, a pattern consistent with the "Bourgeois" strategy from evolutionary game theory. Here we ask a different question: does pressing work better at home, and what actually makes a pressing attempt succeed?*


## Introduction

Part 1 measured pressing aggressiveness as the frequency of pressing attempts in the opponent's half. But pressing aggressiveness has another dimension: the *style* of the press. Do home teams close in faster on the ball holder? Do they outnumber the holding team near the ball more often? And do these stylistic choices actually predict success?

To answer this we needed tracking data (recordings of every player's exact position on the pitch many times per second) rather than discrete match events. We used the [SkillCorner open dataset](https://github.com/SkillCorner/opendata): broadcast tracking data for 20 Australian A-League matches from the 2024/25 season, yielding 1,410 labelled pressing chains. Each chain ends in a binary outcome: the pressing team wins the ball back (through a clean recovery or by forcing a turnover), or the holding team retains possession.

## Data exploration and visualization

<video style="width:100%; border-radius:0.4rem; margin:1.5rem 0;" controls>
  <source src="/assets/videos/pressing_linkedin.mp4" type="video/mp4">
</video>


Before building any features, we generated frame-by-frame animations of individual pressing sequences from the raw tracking coordinates. Each animation shows the positions of all outfield players, their velocity arrows, and the ball as the pressing sequence unfolds in real time. Watching those clips, three patterns stood out, each suggesting a feature worth measuring. First, it looked as though the speed with which the pressing team closes in on the ball holder increased the success probability of a pressing attempt. Second, when the pressing team had more players near the ball than the holding team, the pressing seemed to succeed more often. Finally, pressing close to the touchline or goal line gives fewer degrees of freedom to the ball holder and should increase the recovery probability. Our intuition is partially confirmed by a simple t-test: the effect of closing speed and pitch zone is significant, though numerical superiority does not reach significance on its own.

<iframe src="/assets/images/outcome_bar_aggressiveness.html"
        width="120%" height="500px" frameborder="0">
</iframe>

Example 3 in the video also teaches us something important: even when the pressing effort is well coordinated, aggressive and sustained, the holding team may keep control of the ball thanks to the technical skills of its players. In other words, the success of a pressing attempt does not depend only on the pressing team but also on the holding team. This is beyond the scope of our models, but worth keeping in mind when interpreting the results.


## Logistic regression

Based on the above exploration, we designed features that we thought had an effect on recovery probability at the end of a pressing chain. Two of the dimensions we hand-crafted captured pressing aggressiveness (closing speed of the nearest pressers, numerical superiority of the pressing team near the ball holder) while others were contextual (pitch zone, home/away status). A logistic regression on these features serves as an interpretable baseline.


After training, the logistic regression shows that **numerical superiority and closing speed have an effect on pressing success**. Having more players around the ball than the holding team is the strongest and most robust predictor. Closing speed's main effect is less stable across cross-validation folds.


The home/away coefficient is positive: home teams recover the ball more often (42.8% vs 37.4%). But here is the unexpected result. When we compare home and away teams on the features that predict success (closing speed and numerical superiority), we find no significant difference. Home teams do not press in a stylistically more aggressive way. Yet their pressing is more effective. The plot below reveals an additional pattern: there is an interaction between closing speed and home status, with home teams benefiting more from increasing their closing speed. This could be due to the holding team being more susceptible to pressure when the home team closes in fast on them. We discuss this further in the conclusion.


<iframe src="/assets/images/home_away_pdp.html"
        width="120%" height="500px" frameborder="0">
</iframe>



## Deep learning

The logistic regression can only see what its hand-crafted features encode. A natural question is whether there are geometric properties of pressing organisation not captured by those summaries.

We tested this with **DeepSets**, a permutation-invariant deep learning architecture that takes the raw spatial configuration of all outfield players as input and learns its own representation from scratch. The permutation-invariance is important: the model's prediction is identical regardless of which player is listed first, which is the right inductive bias when there is no natural player ordering. We also tested a temporal extension using five keyframes per pressing chain.

<iframe src="/assets/images/roc_pressing_outcome.html"
        width="100%" height="500px" frameborder="0">
</iframe>


Under repeated cross-validation (10-fold, 5 repeats), the DeepSets model reaches an AUC of 0.66 +/- 0.04, comparable to the logistic regression's 0.62 +/- 0.05. The temporal extension underperformed (not shown here), likely because 1,410 pressing chains are too few for it to learn that early keyframes add little predictive signal beyond the end-of-chain snapshot. The conclusion is that our hand-crafted features capture the geometrically relevant information relatively well; there is no large residual signal left in the raw spatial data.

## Limitations

Effect sizes are small throughout: the strongest logistic regression predictor (numerical superiority) has an odds ratio of 1.3 per standard deviation, and the models' AUC of 0.62--0.66 means most of the variance in pressing outcomes remains unexplained. The 1,410 pressing chains come from only 20 matches involving 13 teams, so chains within the same match are not independent; a proper grouped evaluation would likely widen confidence intervals. Our results identify real patterns, but they are subtle ones.

Another limitation is that we ignored one important dimension throughout the analysis: the risk associated with a pressing strategy. We found that numerical supriority near the ball holder was a relatively good predictor of pressing success, but committing players to pressing means leaving open spaces behind them. One way to measure this risk dimension would be to try and relate the number of players exerting pressure to opportunities created for the holding team. This is a natural next step: in sequences where the press fails, do opponents exploit the space left behind? 




## Wrap up

<div class="result-grid">
  <div>
    <strong>42.8 %</strong>
    <span>Home pressing success</span>
    <small>vs 37.4 % away</small>
  </div>
  <div>
    <strong>0</strong>
    <span>Style difference</span>
    <small>home and away teams press with indistinguishable intensity</small>
  </div>
</div>

Combined with Part 1, the home advantage in pressing now operates along two independently documented dimensions: home teams press more often and more effectively. The effectiveness gap is not explained by pressing style: home and away teams close in at the same speed and commit similar numbers of players. But the interaction between home status and closing speed reveals that the same pressing intensity yields a higher recovery probability for home teams. Since the pressing team's behavior is indistinguishable, the asymmetry likely operates through the holding team's response: away ball holders may be more prone to losing composure under high closing speed, whether through crowd pressure, unfamiliarity, or lower confidence in tight spaces. Our models cannot isolate the mechanism, but the interaction points clearly to a defender-side rather than presser-side explanation.


The Bourgeois pattern from evolutionary game theory runs deeper than Part 1 suggested. It is not just that home teams are more willing to contest the ball; their contests are more likely to succeed, and we have yet to find what explains this difference.

---

*Part 1: [Territorial behavior in football: the Bourgeois strategy in European leagues](/portfolio/territorial/)*
