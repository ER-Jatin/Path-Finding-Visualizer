export function aStar(grid, startNode, endNode) {
    const visitedNodesInOrder = [];
    const priorityQueue = [];
  
    startNode.distance = 0;
    startNode.heuristic = heuristic(startNode, endNode);
    priorityQueue.push(startNode);
  
    while (priorityQueue.length > 0) {
      sortNodesByDistance(priorityQueue);
      const currentNode = priorityQueue.shift();
  
      if (currentNode.isWall) continue;
      if (currentNode.visited) continue;
  
      currentNode.visited = true;
      visitedNodesInOrder.push(currentNode);
  
      if (currentNode === endNode) return visitedNodesInOrder;
  
      updateUnvisitedNeighbors(currentNode, endNode, grid, priorityQueue);
    }
  
    return visitedNodesInOrder; // No path found
  }
  
  function heuristic(node, endNode) {
    // Manhattan distance heuristic
    return Math.abs(node.row - endNode.row) + Math.abs(node.col - endNode.col);
  }
  
  function sortNodesByDistance(nodes) {
    nodes.sort((nodeA, nodeB) => (nodeA.distance + nodeA.heuristic) - (nodeB.distance + nodeB.heuristic));
  }
  
  function updateUnvisitedNeighbors(node, endNode, grid, priorityQueue) {
    const unvisitedNeighbors = getUnvisitedNeighborsAStar(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.heuristic = heuristic(neighbor, endNode);
      neighbor.previousNode = node;
      if (!priorityQueue.includes(neighbor)) {
        priorityQueue.push(neighbor);
      }
    }
  }
  
  function getUnvisitedNeighborsAStar(node, grid) {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]); // up
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // down
    if (col > 0) neighbors.push(grid[row][col - 1]); // left
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // right
    return neighbors.filter(neighbor => !neighbor.visited);
  }