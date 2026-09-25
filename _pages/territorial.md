---
title: "Territorial behavior in football"
permalink: /portfolio/territorial/
layout: single
author_profile: true
excerpt: "A reproducible analysis of the comparison between territorial behavior in European football and animal contests."
---

<p class="project-label">SPORTS ANALYTICS · FOOTBALL · EVOLUTIONARY GAME THEORY</p>

[View source code](https://github.com/SlimaneD/football-aggression-index){: .btn .btn--primary}
[Launch in Binder](https://mybinder.org/v2/gh/SlimaneD/football-aggression-index/master?labpath=territorial_behavior_in_football.ipynb){: .btn .btn--success}
[Open in Google Colab](https://colab.research.google.com/github/SlimaneD/football-aggression-index/blob/master/territorial_behavior_in_football.ipynb){: .btn .btn--info}
[Original LinkedIn post](https://www.linkedin.com/feed/update/urn:li:share:7509329504947859456/){: .btn .btn--inverse}

## Do football teams defend their home turf like animals defend territory?

Football teams notoriously behave differently at home and away. The common wisdom is that teams tend to dominate the game and employ higher pressing when they are receiving. The exact reason why is not really clear. After all, per football association rules, football pitches have standardized dimensions and playing surface. The preferred explanations I've heard are psychological, related to crowd support. For anyone who has been to a stadium for a professional game, this is very real, especially when considering the hostility displayed against visitors by some of the most zealous fans. But to me this doesn't explain the positioning of players on the field or their decisions, which should rather be a tactical choice dictated by the coach. This should not stem from how many people chant your name in the stands.

This question can actually be linked to a celebrated model for understanding the evolution of strategies in animal contests, the Hawk-Dove game. In trying to answer the question of why animals rarely engage in deadly fights, John Maynard Smith and George Price devised an evolutionary game capturing the situation of two animals contesting ownership of the same territory. In their most advanced variant, they considered four strategies depending on whether the individual owns the territory or not:

| Strategy | As owner | As invader |
|---|---|---|
| Hawk | Escalate | Escalate |
| Dove | Retreat | Retreat |
| Bourgeois | Escalate | Retreat |
| Anti-bourgeois | Retreat | Escalate |


![Animal fight](/assets/images/animalFight.png){: .align-center}


The Bourgeois strategy is of particular interest here because it matches the home/away asymmetry just described. It is also an evolutionarily stable strategy (ESS): in a population of animals playing this game, if every individual adopted Bourgeois, no individual could gain an advantage by switching to one of the other three strategies — an uninvadable state. Interestingly, this also solves the question of why violent contests are so rare. In a population of Bourgeois players, no fight would never occur because of the asymmetry of territory ownership.

## Translating it to football

Football has an obvious candidate for "ownership": home advantage. A team playing at home is playing on ground that is, in every meaningful sense, *theirs* — their stadium, their crowd, their turf. A team playing away is the intruder.

If the same logic that governs animal contests shows up in football, you'd expect something very specific: teams should be more willing to *contest* the ball — to press, chase, and fight for it — at home than away. Not because they're physically different players, but because the situation itself changes what's worth risking.

That's a testable claim. So I tested it.


## What I actually measured

I used publicly available match data from four of Europe's top leagues across the 2015/16 season — around 1,500 matches in total. For every team, in every match, I measured how often they contested the ball high up the pitch, in the opponent's own half, regardless of whether the attempt actually won the ball back. I cared about *willingness to contest*, not skill at winning the ball — those are different things, and conflating them would have quietly broken the whole comparison (a team that's simply better at tackling isn't the same as a team that's more willing to go looking for the ball in the first place). So concretely, what I measured is the number of defensive actions of a focal team that occurred in the opponent's half when the opponent had the ball, per total opponent possessions. Let's call that measure the raw aggression score.

Below I show the European ranking with respect to the raw aggression score, for all the teams in following four leagues: Premier League, La Liga, Serie A, and Ligue 1.

<iframe src="/assets/images/european_ranking_table.html"
        width="100%" height="500px" frameborder="0">
</iframe>


## Comparing home vs away behavior per team

The real answer to our initial question can only come from the comparison of home aggression vs away aggression scores. **75 of the 80 teams in the dataset — 93.8% of them — contested the ball more aggressively at home than away.** That's not a slight tilt. It's close to universal, and it holds up individually within every league in the sample, not just on average across all of them.

<iframe src="/assets/images/bourgeois_gap_histogram.html"
        width="115%" height="540px" frameborder="0">
</iframe>

It's a genuinely close match to what the animal-contest theory predicts, transplanted into a completely different setting — professional football.

This is a general tendency but we can refine the analysis by representing every team on the two-dimensional (home vs away aggression score) strategic map. Below I show this plot for La Liga 2015/16.

<iframe src="/assets/images/la_liga_strategic_map.html"
        width="100%" height="700px" frameborder="0">
</iframe>

## The twist: Barcelona weren't where I expected

I wanted a hard test case, so I picked the toughest one available: Barcelona's 2015/16 side, one of the most feared attacking teams in football history, built around Messi, Suárez, and Neymar. If any team was going to top the aggression rankings, reputation said it should be them. 

The above plot shows that they are not the most aggressive at home nor away (they are even topped by a team like Eibar). In the European ranking I showed above, they came in 22nd out of 80.

My first instinct was that something in the measurement had gone wrong. It hadn't — the explanation turned out to be genuinely interesting rather than a flaw, and it's really one fact seen from two angles. Teams that play Barcelona don't get to keep the ball much: their opponents average around 84 possessions a match, home or away, against a league average closer to 100 for everyone else — roughly 15–17% fewer chances for Barcelona to press against, because there's less to press against. Flip that around and it's the same story: a team whose opponents barely touch the ball is, by definition, a team that's dominating it themselves — which was exactly Barcelona's identity under Luis Enrique, control before confrontation. Their score, 0.913, still sits comfortably above the league median (0.841); 22nd of 80 doesn't mean passive, it means less extreme than teams like Eibar (0.971), who pressed hard out of necessity rather than choice. Barcelona's lower rank wasn't a measurement error. It was an accurate reflection of a team that won matches by starving opponents of the ball rather than fighting them for it.



## A second twist, from tracking data

Match events — passes, tackles, shots — are one way to see a game. Player tracking data, which records every player's exact position on the pitch many times per second, is another, and it's a fundamentally different lens: instead of counting discrete actions, it shows you where players actually stand and move, continuously, throughout the match.

To make this comparable to the event-data metric, I built a positional analogue of forward press rate: the share of a team's own outfield players standing in the opponent's half at moments when the opponent actually has the ball there. Same underlying idea — is a team choosing to contest space deep in enemy territory — just read from where players stand rather than from logged defensive actions.

I ran the same home-versus-away comparison using this measure as an independent check — and initially got the *opposite* result. The away team looked, by this measure, more territorially present than the home team. That's exactly the kind of finding you should be suspicious of rather than either dismissing or blindly trusting, so I went looking for why.

The explanation, once I found it, was more interesting than either result on its own: it came down to the scoreline, not to home or away status at all. A team that's ahead in a match tends to relax and circulate the ball calmly, often deep in its own half — perfectly sensible, low-risk game management. But from a tracking-data point of view, that calm circulation can make the *trailing* team look like it's occupying more territory, simply because the leading team has retreated into a comfortable holding pattern, not because the trailing team is actually pressing harder. Once I controlled for the score at the time — comparing only moments where neither team was protecting a lead — the tracking data swung back into agreement with the original finding, and by a wider margin than the raw numbers first suggested.

<iframe src="/assets/images/territorial_occupancy_by_game_state.html" width="115%" height="560" style="border:none;" loading="lazy"></iframe>

This is not the whole story though because in the event data analysis we ignored those within-match variations and home teams almost systematically pressed more in the opponent's half than away teams. We need more data to understand what is going on (I only have access to one match of tracking data), but I suspect this could mean that the "passive" positions provided by tracking data are not enough to paint the full picture of a pressing strategy.

## So, do they?

Mostly, yes. Bourgeois — aggressive at home, passive away — isn't just the majority pattern in European football, it's close to the default one. Ninety-four percent of eighty teams doesn't happen by accident, and it happens in a sport that has nothing to do with the fitness costs or injury risk the original animal-contest model was built around. Something about "this is our ground" changes what a team is willing to fight for, and it shows up in the data the same way it shows up in a stadium.

But the two detours — Barcelona, and the tracking-data match — matter as much as the headline number, maybe more. Neither one broke the finding. Both of them made it sharper. Barcelona forced me to separate "aggressive" from "good", a distinction the raw ranking doesn't make on its own. The tracking data forced me to separate "where a team's players are standing" from "what a team is actually trying to do," which turned out not to be the same question at all.

A question I could not treat but is a natural follow up: If Bourgeois is such a widespread tendency in European football, is it a cultural norm or is it because it is a winning strategy? Answering such a question would require constructing what game theorists call the *payoff matrix* of our ownership *game* in football, that is understanding the probability to win a match given the pressing strategy of both teams in a match, a far more involved (and exciting) task than what we achieved here.

But all in all, apparently territory is territory,  whether you're defending a nest or a penalty box.
