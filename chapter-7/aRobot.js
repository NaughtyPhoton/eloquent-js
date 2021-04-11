function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function average(numbers) {
    return numbers.reduce((a, b) => a + b) / numbers.length;
}

const roads = [
    "Alice's House-Bob's House",
    "Alice's House-Cabin",
    "Alice's House-Post Office",
    "Bob's House-Town Hall",
    "Daria's House-Ernie's House",
    "Daria's House-Town Hall",
    "Ernie's House-Grete's House",
    "Grete's House-Farm",
    "Grete's House-Shop",
    "Marketplace-Farm",
    "Marketplace-Post Office",
    "Marketplace-Shop",
    "Marketplace-Town Hall",
    "Shop-Town Hall",
];

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

function buildGraph(edges) {
    let graph = Object.create(null);

    function addEdge(from, to) {
        graph[from] = graph[from] ? [...graph[from], to] : [to]
    }

    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

const roadGraph = buildGraph(roads);

class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        }

        // Update parcels belonging to current place to be at the current place
        this.parcels.forEach((p, index) => {
            if (p.place === this.place) this.parcels[index] = {place: destination, address: p.address}
        })

        // Remove delivered parcels
        let parcels = this.parcels.filter(p => p.place !== p.address);
        return new VillageState(destination, parcels)
    }

    static random(parcelCount = 5) {
        let parcels = [];
        for (let i = 0; i < parcelCount; i++) {
            let address = randomPick(Object.keys(roadGraph));
            let place;
            do {
                place = randomPick(Object.keys(roadGraph));
            } while (place === address);
            parcels.push({place, address});
        }
        return new VillageState("Post Office", parcels)
    }
}

// let first = new VillageState(
//     "Post Office",
//     [{place: "Post Office", address: "Alice's House"}]
// );
// console.log(first)
// let next = first.move("Alice's House");
// console.log(next)

function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for (let place of graph[at]) {
            if (place === to) return route.concat(place);
            if (!work.some(w => w.at === place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}

function runRobot(state, robot, memory) {
    for (let turn = 0; ; turn++) {
        if (state.parcels.length === 0) {
            // console.log(`Done in ${turn} turns.`);
            return turn
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        // console.log(`Moved to ${action.direction} - Packages left: ${state.parcels.length}`);
    }
}

function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}

function routeRobot(state, memory = mailRoute) {
    if (!memory.length) {
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};

}

function goalOrientedRobot({place, parcels}, route) {
    if (!route || route.length === 0) {
        let parcel = parcels[0];
        if (parcel.place !== place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address)
        }
    }
    return {direction: route[0], memory: route.slice(1)};
}

function measureRobots(robots, attempts = 10000, parcels = 5) {
    const robotDataArray = robots.map(robot => {
        const name = robot.name
        return {name, turnArray: [], robot}
    })

    for (let i = 0; i < attempts; i++) {
        const randomState = VillageState.random(parcels)
        for (let robotData of robotDataArray) {
            robotData.turnArray.push(runRobot(randomState, robotData.robot))
        }
    }
    robotDataArray.forEach(robotData => console.log(`${robotData.name} average turns: ${average(robotData.turnArray)}`))
}

measureRobots([randomRobot, routeRobot, goalOrientedRobot])
