---
title: "pyNamo-EGT"
permalink: /portfolio/pynamo/
layout: single
author_profile: true
excerpt: "Python software for visualising and analysing evolutionary game dynamics."
---

<p class="project-label">SCIENTIFIC SOFTWARE · PYTHON · EVOLUTIONARY GAME THEORY</p>

## Making strategic dynamics visible

pyNamo-EGT is a Python package I developed to plot and analyse replicator dynamics. It turns mathematical models of adaptation and strategic interaction into phase portraits that can be explored, interpreted, and exported for publication.

[View source code](https://github.com/SlimaneD/pynamo){: .btn .btn--primary}
[Launch Binder tutorial](https://mybinder.org/v2/gh/SlimaneD/pynamo/HEAD?urlpath=lab/tree/tutorial.ipynb){: .btn .btn--success}
[Open in Google Colab](https://colab.research.google.com/github/SlimaneD/pynamo/blob/master/tutorial_colab.ipynb){: .btn .btn--info}


## The problem

Evolutionary games describe how the prevalence of competing strategies changes over time under the pressure of natural selection. Evolutionary games offer a variety of dynamical patterns including nonlinear dynamics, boundary equilibria, cycles, and stability patterns that are difficult to understand from equations alone. Researchers and students need a reliable way to connect the underlying model to a clear visual account of its behaviour.

## The approach

pyNamo provides a high-level interface for defining a game, integrating its replicator dynamics, finding equilibria, and producing an interpretable phase portrait. The package supports various kinds of symmetric and asymmetric games whose phase portraits can be represented in one, two, or three dimensions.

The analysis includes linear stability classification, Nash equilibria, strict Nash equilibria, and evolutionarily stable strategies where applicable. Its visualisations combine trajectories with optional speed fields, vector fields, and equilibrium markers.

## Examples

<div class="figure-gallery">
  <figure><img src="/assets/images/pynamo_figures/pynamo_egt_rps.png" alt="Rock-paper-scissors dynamics"></figure>
  <figure><img src="/assets/images/pynamo_figures/pynamo_egt_hawk_dove.png" alt="Hawk-dove dynamics"></figure>
  <figure><img src="/assets/images/pynamo_figures/pynamo_egt_cyclic_mismatching_pennies.png" alt="Cyclic mismatching-pennies dynamics"></figure>
  <figure><img src="/assets/images/pynamo_figures/pynamo_egt_four_strategy.png" alt="Four-strategy evolutionary game dynamics"></figure>
</div>

## What I built

- A reusable Python representation of several classes of evolutionary games
- Numerical replicator dynamics and rest-point computation
- Equilibrium and stability analysis that respects admissible directions at state-space boundaries
- Two- and three-dimensional Matplotlib visualisations with publication-quality export
- A catalogue of documented example games
- An interactive Jupyter interface for changing examples and display parameters
- Automated tests and browser-based tutorials through Binder and Google Colab

The implementation uses NumPy, SciPy, SymPy, pandas, and Matplotlib. It returns ordinary Matplotlib objects, allowing users to customise or export figures for publication and teaching.
