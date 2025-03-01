"use strict";

let currentPage = 1;
const DEVICES_PER_PAGE = 5;

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
    localeStorage.setItem("device", JSON.stringify(devices));
    renderDevices();
});

function renderDevices() {
    const allDevices = JSON.parse(localStorage.getItem("devices")) || [];
    const searchTerm = document.getElementById("search-input").value.toLowerCase();

    const filteredDevices = allDevices.filter(devices =>
        device.id.toLowerCase().includes(searchTerm) ||
        device.location?.toLowerCase().includes(searchTerm)
    );

    const startIndex = (currentPage - 1) * DEVICES_PER_PAGE;
    const paginatedDevices = filteredDevices.slice(startIndex, startIndex + DEVICES_PER_PAGE);

    document.getElementById("devices-list").innerHTML = paginatedDevices.map(devices => `
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