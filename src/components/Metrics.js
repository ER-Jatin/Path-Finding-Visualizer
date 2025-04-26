import React from 'react';
import './Metrics.css';

const Metrics = ({ algorithm, visitedNodesCount, shortestPathLength, timeTaken, pathFound }) => {
  const timeInSeconds = (timeTaken / 1000).toFixed(2);
  return (
    <div className="metrics-box">
      <h2>Metrics</h2>
      <p><strong>Algorithm:</strong> {algorithm}</p>
      <p><strong>Visited Nodes:</strong> {visitedNodesCount} nodes</p>
      <p><strong>Shortest Path Length:</strong> {shortestPathLength} nodes</p>
      <p><strong>Time Taken:</strong> {timeTaken} ms</p>
      <p><strong>Path Found:</strong> {pathFound ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default Metrics;
