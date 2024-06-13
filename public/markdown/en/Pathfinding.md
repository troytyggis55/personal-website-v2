---
title: Pathfinding algorithms
date: 2023-11-20
category: IDATT2101 - Algorithms and Data Structures
---
Our last assignment in our algorithms and data structures class was to implement and compare 
both the Dijkstra and ALT(A* with landmarks) pathfinding algorithms. Algorithms and data 
structures was already my favorite class of the autumn 2023 semester and this assignment was a 
big part of it.

Road-networks can be represented as a graph, where the nodes are intersections and the edges are 
the roads connecting each intersection roads. This is what this assignment was based on. After 
successfully implementing each algorithm we could visualize the search by drawing each all the 
visited nodes. 

![Pathfinding](../images/Pathfinding.png)

Above you can see the result from finding the shortest path from Orkanger to Trondheim. In Red 
we can dijkstra's algorithm(Red) and ALT(Green) with both finding the same path(Yellow).
In the image we can only see 1% of all searched nodes to not clutter the image. Here we can 
clearly see how dijkstra has searched in a circular pattern around the start node, while ALT in 
this specific case has searched a fifth of the nodes dijkstra has.