import React, { useState, useEffect, useRef } from 'react';
import './Grid.css';
import './Metrics.css';
import { bfs } from '../algorithms/bfs';
import { dfs } from '../algorithms/dfs';
import { dijkstra } from '../algorithms/dijkstra';
import { aStar } from '../algorithms/aStar';

const numRows = 20;
const numCols = 40;
const createNode = (row, col) => {
  return {
    row,
    col,
    isStart: row === 5 && col === 5,
    isEnd: row === 10 && col === 30,
    isWall: false,
    visited: false,
    distance: Infinity,
    previousNode: null,
  };
};

const initialGrid = () => {
  const grid = [];
  for (let row = 0; row < numRows; row++) {
    const currentRow = [];
    for (let col = 0; col < numCols; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

const Grid = () => 
  {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [metrics, setMetrics] = useState({ time: 0, visitedNodes: 0, shortestPathNodes: 0, algorithmName: '' });
  const animationTimeouts = useRef([]);

  useEffect(() => {
    setGrid(initialGrid());
  }, []);

  const handleMouseDown = (row, col) => {
    const newGrid = toggleWall(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = toggleWall(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const resetGrid = () => {
    clearAnimations();
    const newGrid = initialGrid();
    setGrid(newGrid);
    setMetrics({ time: 0, visitedNodes: 0, shortestPathNodes: 0, algorithmName: '' });
  };

  const clearAnimations = () => {
    animationTimeouts.current.forEach(timeout => clearTimeout(timeout));
    animationTimeouts.current = [];

    const newGrid = grid.map(row =>
      row.map(node => ({
        ...node,
        visited: false,
        distance: Infinity,
        previousNode: null,
      }))
    );

    setGrid(newGrid);

    for (let row of newGrid) {
      for (let node of row) {
        const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
        if (nodeElement) {
          if (node.isStart) nodeElement.className = 'cell start';
          else if (node.isEnd) nodeElement.className = 'cell end';
          else if (node.isWall) nodeElement.className = 'cell wall';
          else nodeElement.className = 'cell';
        }
      }
    }
  };

  const stopVisualization = () => {
    clearAnimations();
    setIsRunning(false);
  };

  const visualizeBFS = () => {
    if (isRunning) return;
    clearAnimations();
    setIsRunning(true);
    const startNode = grid[5][5];
    const endNode = grid[10][30];
    const visitedNodesInOrder = bfs(grid, startNode, endNode);
    animateTraversal(visitedNodesInOrder, "BFS");
  };

  const visualizeDFS = () => {
    if (isRunning) return;
    clearAnimations();
    setIsRunning(true);
    const startNode = grid[5][5];
    const endNode = grid[10][30];
    const visitedNodesInOrder = dfs(grid, startNode, endNode);
    animateTraversal(visitedNodesInOrder, "DFS");
  };

  const visualizeDijkstra = () => {
    if (isRunning) return;
    clearAnimations();
    setIsRunning(true);
    const startNode = grid[5][5];
    const endNode = grid[10][30];
    const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
    animateTraversal(visitedNodesInOrder, "Dijkstra");
  };

  const visualizeaStar = () => {
    if (isRunning) return;
    clearAnimations();
    setIsRunning(true);
    const startNode = grid[5][5];
    const endNode = grid[10][30];
    const visitedNodesInOrder = aStar(grid, startNode, endNode);
    animateTraversal(visitedNodesInOrder, "A_Star");
  };



  const animateTraversal = (visitedNodesInOrder, algorithmName) => {
    const startTime = Date.now();
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      const timeout = setTimeout(() => {
        if (i === visitedNodesInOrder.length) {
          animateShortestPath(grid[10][30]);
          setMetrics({
            time: ((Date.now() - startTime) / 1000).toFixed(2),
            visitedNodes: visitedNodesInOrder.length,
            shortestPathNodes: calculateShortestPathLength(grid[10][30]),
            algorithmName: algorithmName
          });
          setIsRunning(false);
          return;
        }
        const node = visitedNodesInOrder[i];
        const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
        if (nodeElement && !node.isStart && !node.isEnd) {
          nodeElement.className = 'cell visited';
        }
      }, 10 * i);
      animationTimeouts.current.push(timeout);
    }
  };

  const animateShortestPath = (endNode) => {
    const nodesInShortestPathOrder = [];
    let currentNode = endNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      const timeout = setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
        if (nodeElement && !node.isStart && !node.isEnd) {
          nodeElement.className = 'cell shortest-path';
        }
      }, 50 * i);
      animationTimeouts.current.push(timeout);
    }
  };

  const calculateShortestPathLength = (endNode) => {
    let length = 0;
    let currentNode = endNode;
    while (currentNode !== null) {
      length++;
      currentNode = currentNode.previousNode;
    }
    return length > 0 ? length - 1 : 0; // exclude start node
  };

  return (
    <div className="main-grid-container">
      <div className="pathfinder-container">
        <h1 className="pathfinder-heading">Pathfinder Visualizer</h1>
      </div>

      <div className="left-controls">
        <button className="visualize-btn" onClick={visualizeBFS}>Visualize BFS</button>
        <button className="visualize-btn" onClick={visualizeDFS}>Visualize DFS</button>
        <button className="visualize-btn" onClick={visualizeDijkstra}>Visualize Dijkstra</button>
        <button className="visualize-btn" onClick={visualizeaStar}>Visualize A-Star</button>
        <button className="stop-btn" onClick={stopVisualization}>Stop</button>
        <button className="clear-btn" onClick={resetGrid}>Clear</button>
      </div>

      <div className="grid" onMouseLeave={handleMouseUp}>
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="row">
            {row.map((node, nodeIdx) => {
              const { row, col, isStart, isEnd, isWall } = node;
              let extraClass = '';
              if (isStart) extraClass = 'start';
              else if (isEnd) extraClass = 'end';
              else if (isWall) extraClass = 'wall';

              return (
                <div
                  key={nodeIdx}
                  id={`node-${row}-${col}`}
                  className={`cell ${extraClass}`}
                  onMouseDown={() => handleMouseDown(row, col)}
                  onMouseEnter={() => handleMouseEnter(row, col)}
                  onMouseUp={handleMouseUp}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="metrics-box">
        <h2 className="metrics-header">Metrics</h2>
        <div className="metrics-content">
          <div><span>Algorithm:</span> {metrics.algorithmName}</div>
          <div><span>Time:</span> {metrics.time} seconds</div>
          <div><span>Visited Nodes:</span> {metrics.visitedNodes}</div>
          <div><span>Shortest Path Nodes:</span> {metrics.shortestPathNodes}</div>
        </div>
      </div>
    </div>
  );
};

const toggleWall = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  if (node.isStart || node.isEnd) return newGrid;
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export default Grid;
