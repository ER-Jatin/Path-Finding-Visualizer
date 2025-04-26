<<<<<<< HEAD

# Pathfinder Visualizer
A web-based application built with React to visualize various pathfinding algorithms in action on a customizable grid. Witness how algorithms like Breadth-First Search (BFS), Depth-First Search (DFS), Dijkstra's Algorithm, and A* Search explore and find the shortest path between a start and an end node.


## Demo

[**[Live Demo Link Here]**](https://ER-Jatin.github.io/Path-Finding-Visualizer/)

**Demo Instructions:**

1.  Visit the [Live Demo Link Here](https://ER-Jatin.github.io/Path-Finding-Visualizer/).
2.  **Create Walls:** Click and drag your mouse on the grid to draw obstacles.
3.  **Select Algorithm:** Choose an algorithm from the left panel (e.g., BFS, A*).
4.  **Click "Visualize"**: Observe the algorithm find a path (or explore).
5.  **Use Controls:** Experiment with clearing the grid, resetting walls, and trying different algorithms.

## Features
* **Interactive Grid:** Create and customize the grid by drawing walls to simulate obstacles.
* **Algorithm Selection:** Choose from four popular pathfinding algorithms:
    * **Breadth-First Search (BFS):** Explores layer by layer.
    * **Depth-First Search (DFS):** Explores as far as possible along each branch before backtracking.
    * **Dijkstra's Algorithm:** Finds the shortest path in a weighted graph (currently unweighted in this project, so behaves similarly to BFS).
    * **A* Search:** An informed search algorithm that uses a heuristic to guide its search towards the goal, often finding the shortest path efficiently.
* **Visualization:** Watch the step-by-step process of each algorithm as it explores the grid.
* **Metrics:** Displays key metrics after visualization, including:
    * Algorithm name
    * Time taken for visualization
    * Number of visited nodes
    * Length of the shortest path found (if any)
* **Clear and Reset:** Easily clear the grid, reset walls, or run a new visualization.
* **Stop Visualization:** Interrupt the visualization at any point.


## Technologies Used
* **React:** A JavaScript library for building user interfaces.
* **HTML**
* **CSS**
* **JavaScript (ES6+)**
* **Potentially other libraries (list them here if you used any specific UI or animation libraries).**


## How to Use:
1.  **Create Walls:** Click and drag your mouse over the grid to draw walls (obstacles).
2.  **Select Algorithm:** Choose an algorithm from the left-side controls (BFS, DFS, Dijkstra, A-Star).
3.  **Visualize:** Click the "Visualize" button for your chosen algorithm. Observe the algorithm's exploration on the grid.
4.  **View Metrics:** After the visualization is complete, the metrics box on the right will display information about the process.
5.  **Clear and Reset:** Use the "Clear" button to remove all walls and visited nodes, or the "Reset" button to completely reset the grid to its initial state.
6.  **Stop:** Use the "Stop" button to halt the ongoing visualization.



## File and Folder Structure:
Here's a brief overview of the key files and folders in this project:

.
├── public/
│   ├── index.html        - The main HTML file that serves as the entry point for the React application.
│   ├── manifest.json     - Provides metadata used when your web app is added to the homescreen of a user's device.
│   └── robots.txt        - A standard file used to communicate with web crawler bots.
├── src/
│   ├── algorithms/       - Contains the JavaScript files implementing the pathfinding algorithms (e.g., bfs.js, dfs.js, dijkstra.js, aStar.js).
│   ├── components/       - Holds the reusable React components that make up the user interface (e.g., Grid.js, Cell.js, Controls.js, Metrics.js).
│   ├── App.css           - Styles for the main App component.
│   ├── App.js            - The main application component that sets up the grid and manages the visualization.
│   ├── App.test.js       - Unit tests for the App component.
│   ├── index.css         - Global styles for the application.
│   ├── index.js          - The entry point for the React application, rendering the App component into the DOM.
│   ├── logo.svg          - The React logo (you might have your own).
│   ├── setupTests.js     - Configuration for the Jest testing environment.
│   └── ... (other component or utility folders/files)
├── .gitattributes       - Specifies how Git should handle line endings and other attributes for files.
├── .gitignore           - Specifies intentionally untracked files that Git should ignore.
├── README.md            - The file you are currently reading, providing an overview of the project.
├── package-lock.json    - Records the exact versions of dependencies used in the project.
└── package.json         - Contains metadata about the project, including dependencies and scripts.


=======


>>>>>>> origin/main