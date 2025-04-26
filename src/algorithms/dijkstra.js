export function dijkstra(grid, startNode, endNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
  
    while (!!unvisitedNodes.length) {
      // Sort unvisited nodes by distance
      unvisitedNodes.sort((a, b) => a.distance - b.distance);
      const closestNode = unvisitedNodes.shift();
  
      // If we encounter a wall, we skip it
      if (closestNode.isWall) continue;
  
      // If the smallest distance among unvisited nodes is Infinity,
      // then we must be trapped and should stop
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
  
      closestNode.visited = true;
      visitedNodesInOrder.push(closestNode);
  
      if (closestNode === endNode) return visitedNodesInOrder;
  
      updateUnvisitedNeighbors(closestNode, grid);
    }
  
    return visitedNodesInOrder;
  }
  
  function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  }
  
  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;
  
    if (row > 0) neighbors.push(grid[row - 1][col]); // up
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // down
    if (col > 0) neighbors.push(grid[row][col - 1]); // left
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // right
  
    return neighbors.filter(neighbor => !neighbor.visited);
  }
  
  function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }
  