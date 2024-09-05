// Function to list all supplies
function listSupplies() {
    fetch('/api/supplies')
        .then(response => response.json())
        .then(data => {
            const suppliesList = document.getElementById('supplies-list');
            suppliesList.innerHTML = '<ul class="list-group">' + data.map(item =>
                `<li class="list-group-item">ID: ${item.id} - ${item.item} - Quantity: ${item.quantity}</li>`
            ).join('') + '</ul>';
        });
}

// Function to request an item
function requestItem() {
    const itemId = document.getElementById('item-id').value;
    fetch(`/api/supplies/request/${itemId}`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        const requestResponse = document.getElementById('request-response');
        if (data.message) {
            requestResponse.innerHTML = `<div class="alert alert-info">${data.message}</div>`;
            listSupplies();  // Update the supplies list
        } else {
            requestResponse.innerHTML = `<div class="alert alert-danger">Error: ${data.message}</div>`;
        }
    });
}
