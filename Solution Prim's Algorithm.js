
/**
 * @param {number[][]} points
 * @return {number}
 */
var minCostConnectPoints = function (points) {
    if (points.length < 2) {
        return 0;
    }

    const totalPoints = points.length;
    const pointsInMinSpanningTree = new Array(totalPoints).fill(false);
    const minCostConnect = new Array(totalPoints).fill(Number.MAX_SAFE_INTEGER);

    let countPointsInMinSpanningTree = 0;
    let minCostConnectAllPoints = 0;
    minCostConnect[0] = 0;

    while (countPointsInMinSpanningTree < totalPoints) {

        let nextPoint = findNextPoint(minCostConnect, pointsInMinSpanningTree);

        ++countPointsInMinSpanningTree;
        pointsInMinSpanningTree[nextPoint] = true;
        minCostConnectAllPoints += minCostConnect[nextPoint];
        updateMinCostConnect(points, minCostConnect, pointsInMinSpanningTree, nextPoint);
    }
    return minCostConnectAllPoints;
};

/**
 * @param {number[]} minCostConnect 
 * @param {number[]} pointsInMinSpanningTree 
 * @return {number}
 */
function findNextPoint(minCostConnect, pointsInMinSpanningTree) {
    let currentCost = Number.MAX_SAFE_INTEGER;
    let currentPoint = 0;
    for (let i = 0; i < minCostConnect.length; ++i) {
        if (!pointsInMinSpanningTree[i] && currentCost > minCostConnect[i]) {
            currentCost = minCostConnect[i];
            currentPoint = i;
        }
    }
    return currentPoint;
}

/**
 * @param {number[][]} points 
 * @param {number[]} minCostConnect 
 * @param {number[]} pointsInMinSpanningTree 
 * @param {number} nextPoint 
 * @return {void}
 */
function updateMinCostConnect(points, minCostConnect, pointsInMinSpanningTree, nextPoint) {
    for (let i = 0; i < minCostConnect.length; ++i) {
        let cost = manhattanDistance(points[nextPoint], points[i]);
        if (!pointsInMinSpanningTree[i] && minCostConnect[i] > cost) {
            minCostConnect[i] = cost;
        }
    }
}

/**
 * @param {number} firstPoint 
 * @param {number} secondPoint 
 * @return {number}
 */
function  manhattanDistance(firstPoint, secondPoint) {
    return Math.abs(firstPoint[0] - secondPoint[0]) + Math.abs(firstPoint[1] - secondPoint[1]);
}
