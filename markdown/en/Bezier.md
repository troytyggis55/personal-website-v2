---
title: Bezier curves
date: 2022-12-22
repo: https://github.com/troytyggis55/coding-adventures/tree/main/Bezier
category: coding-adventures
---

[Freya Holmérs video on the beauty of bezier curves](https://www.youtube.com/watch?v=aVwxzDHniEw)
is a video I really recommend watching if you have any interest in the visualisation of math. I 
figured I'd try to develop a simple bezier curve editor myself.

![Bezier curves](../images/BezierCurves.gif)

This simple editor lets the user place and drag points to create their own n'th degree bezier 
curve. By using [de Casteljau's algorithm](https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm)
one can recursively calculate any curve of any degree which I have chosen to visualize by 
drawing each recursive step.
