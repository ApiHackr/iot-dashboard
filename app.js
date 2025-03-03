"use strict";

let currentPage = 1;
const DEVICES_PER_PAGE = 5;

// Save device
document.getElementById("device-form").addEventListener("submit", e => {
    e.preventDefault();
    const device = {
        id: document.getElementById("device-id").value,
        type: document.getElementById("sensor-type").value,
        location: document.getElementById("location").value,
        apiEndpoint: document.getElementById("api-endpoint").value,
        isActive: true
    };
    const devices = JSON.parse(localStorage.getItem("device")) || [];
    devices.push(device);
    localStorage.setItem("device", JSON.stringify(devices));
    renderDevices();
});

// render list of devices
function renderDevices() {
    const allDevices = JSON.parse(localStorage.getItem("devices")) || [];
    const searchTerm = document.getElementById("search-input").value.toLowerCase();

    // Filtering
    const filteredDevices = allDevices.filter(devices =>
        device.id.toLowerCase().includes(searchTerm) ||
        device.location?.toLowerCase().includes(searchTerm)
    );

    // Pagination
    const startIndex = (currentPage - 1) * DEVICES_PER_PAGE;
    const paginatedDevices = filteredDevices.slice(startIndex, startIndex + DEVICES_PER_PAGE);

    // Update UI
    document.getElementById("device-list").innerHTML = paginatedDevices.map(devices => `
        <div class="device-card">
            <h3>${device.id}</h3>
            <p>Typ: ${device.type}</p>
            <p>Standort: ${device.location || "Nicht angegeben"}</p>
            <button onclick="toggleDevice('${device.id}')">
                ${device.isActive ? 'Deaktivieren' : 'Aktivieren'}
            </button>
        </div>
    `).join("");
    renderPaginationControls(filteredDevices.length);
}

// Pagination buttons
function renderPaginationControls(totalDevices) {
    const totalPages = Math.ceil(totalDevices / DEVICES_PER_PAGE);
    let buttons = '';
    for (let i = 1; i <= totalPages; i++) {
        buttons += `
            <button ${i === currentPage ? 'class="active"' : ''} 
                onclick="currentPage = ${i}; renderDevices()">
                ${i}
            </button>
        `;
    }
    document.getElementById('pagination-controls').innerHTML = buttons;
}

// Gerät aktivieren/deaktivieren
function toggleDevice(deviceId) {
    const devices = JSON.parse(localStorage.getItem('devices'));
    const device = devices.find(d => d.id === deviceId);
    device.isActive = !device.isActive;
    localStorage.setItem('devices', JSON.stringify(devices));
    renderDevices();
}

// Initiale Darstellung
renderDevices();