export function dfs(grid, startNode, endNode) {
  const visitedNodesInOrder = [];
  const stack = [];
  stack.push(startNode);

  while (stack.length) {
    const currentNode = stack.pop();

    if (currentNode.isWall || currentNode.visited) continue;

    currentNode.visited = true; // Mark as visited immediately
    visitedNodesInOrder.push(currentNode);

    if (currentNode === endNode) return visitedNodesInOrder; // Stop when end node is found

    // Get neighbors in a standard order (up, down, left, right)
    const neighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      neighbor.previousNode = currentNode; // Set the previous node to trace path later
      stack.push(neighbor);
    }
  }

  return visitedNodesInOrder; // No path found
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;

  // Check all possible neighbors (up, down, left, right)
  if (row > 0) neighbors.push(grid[row - 1][col]); // up
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // down
  if (col > 0) neighbors.push(grid[row][col - 1]); // left
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // right

  // Filter out visited nodes
  return neighbors.filter(neighbor => !neighbor.visited);
}
