// ==============================
// NETWORK FAILURE VISUALIZER
// ==============================

let netA = {
    latency: 10,
    loss: 0
};

let netB = {
    latency: 10,
    loss: 0
};

// ==============================
// UPDATE UI
// ==============================

function updateUI() {

    document.getElementById("latencyA").innerText = netA.latency;
    document.getElementById("lossA").innerText = netA.loss;

    document.getElementById("latencyB").innerText = netB.latency;
    document.getElementById("lossB").innerText = netB.loss;
}

// ==============================
// PACKET GENERATION
// ==============================

function generatePackets(containerId, net) {

    const container = document.getElementById(containerId);

    setInterval(() => {

        let packet = document.createElement("div");
        packet.className = "packet-dot";

        // Packet speed based on latency
        let speed = Math.max(2, 10 - net.latency / 20);
        packet.style.animationDuration = speed + "s";

        container.appendChild(packet);

        // Simulate packet drop
        if (Math.random() < net.loss / 100) {

            setTimeout(() => {
                packet.classList.add("packet-drop");
            }, 500);
        }

        // Remove packet after animation
        setTimeout(() => {
            packet.remove();
        }, 8000);

    }, 800);
}

// Start packet animations
generatePackets("packetA", netA);
generatePackets("packetB", netB);

// ==============================
// NETWORK A FUNCTIONS
// ==============================

function addLatencyA() {

    netA.latency += 20;

    const router = document.getElementById("routerA");

    router.classList.add("latency-effect");

    setTimeout(() => {
        router.classList.remove("latency-effect");
    }, 600);

    updateUI();
    updateChart();
}

function addCongestionA() {

    netA.loss += 20;

    const router = document.getElementById("routerA");

    router.classList.add("router-danger", "congestion-effect");

    setTimeout(() => {
        router.classList.remove("congestion-effect");
    }, 500);

    updateUI();
    updateChart();
}

// ==============================
// NETWORK B FUNCTIONS
// ==============================

function addLatencyB() {

    netB.latency += 20;

    const router = document.getElementById("routerB");

    router.classList.add("latency-effect");

    setTimeout(() => {
        router.classList.remove("latency-effect");
    }, 600);

    updateUI();
    updateChart();
}

function addCongestionB() {

    netB.loss += 20;

    const router = document.getElementById("routerB");

    router.classList.add("router-danger", "congestion-effect");

    setTimeout(() => {
        router.classList.remove("congestion-effect");
    }, 500);

    updateUI();
    updateChart();
}

// ==============================
// COMPARE NETWORKS
// ==============================

function compareNetworks() {

    let scoreA = netA.latency + netA.loss;
    let scoreB = netB.latency + netB.loss;

    const result = document.getElementById("result");

    if (scoreA < scoreB) {
        result.innerText = "✅ Network A is Better";
    }
    else if (scoreB < scoreA) {
        result.innerText = "✅ Network B is Better";
    }
    else {
        result.innerText = "⚖️ Both Networks are Equal";
    }
}

// ==============================
// RESET ALL
// ==============================

function resetAll() {

    netA = {
        latency: 10,
        loss: 0
    };

    netB = {
        latency: 10,
        loss: 0
    };

    document.getElementById("packetA").innerHTML = "";
    document.getElementById("packetB").innerHTML = "";

    document.getElementById("routerA")
        .classList.remove("router-danger");

    document.getElementById("routerB")
        .classList.remove("router-danger");

    updateUI();
}

// ==============================
// CHART.JS GRAPH
// ==============================

const chart = new Chart(
    document.getElementById("chart"),
    {
        type: "line",

        data: {
            labels: [],

            datasets: [
                {
                    label: "Network A Loss",
                    data: [],
                    borderColor: "orange",
                    fill: false
                },
                {
                    label: "Network B Loss",
                    data: [],
                    borderColor: "cyan",
                    fill: false
                }
            ]
        },

        options: {
            responsive: true,

            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    }
);

// ==============================
// UPDATE GRAPH
// ==============================

function updateChart() {

    chart.data.labels.push(
        chart.data.labels.length + 1
    );

    chart.data.datasets[0].data.push(netA.loss);
    chart.data.datasets[1].data.push(netB.loss);

    chart.update();
}

// Initial UI load
updateUI();