export function bfs(grid, startNode, endNode) {
    const visitedNodesInOrder = [];
    const queue = [];
    queue.push(startNode);
  
    while (queue.length) {
      const currentNode = queue.shift();
  
      if (currentNode.isWall) continue;
      if (currentNode.visited) continue;
  
      currentNode.visited = true;
      visitedNodesInOrder.push(currentNode);
  
      if (currentNode === endNode) return visitedNodesInOrder;
  
      const neighbors = getUnvisitedNeighbors(currentNode, grid);
      for (const neighbor of neighbors) {
        neighbor.previousNode = currentNode;
        queue.push(neighbor);
      }
    }
  
    return visitedNodesInOrder; // no path found
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
  