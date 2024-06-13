---
title: Fluid simulation
date: 2023-10-24
repo: https://github.com/troytyggis55/coding-adventures/tree/main/FluidSims
category: coding-adventures
---
After watching [Sebastian Lagues video on fluid simulation](https://www.youtube.com/watch?v=rSKMYc1CQHE&list=PLFt_AvWsXl0ehjAfLFsp1PGaatzAwo0uK)
I, as always, got heavily inspired to try a simple version myself. I had the basic understanding 
of how simple vector math could be used to simulate such a system as I had earlier tried similar 
projects.

![FluidSim](../images/FluidSim.gif)

Each particle has a position, velocity and acceleration. The acceleration is calculated by the 
particles proximity to other particles. To avoid θ(n^2) complexity, the screen is divided into a 
grid where each square has the size of the particles search radius. Each particle then only 
needs to search for other particles in the same square and the 8 surrounding squares. This 
greatly optimizes performance without sacrificing any accuracy.