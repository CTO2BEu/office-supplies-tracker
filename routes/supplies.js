const express = require('express');
const router = express.Router();
const supplies = require('../data/mockData');

// Endpoint to get the list of supplies
router.get('/', (req, res) => {
    res.json(supplies);
});

// Endpoint to request an item (decrease quantity)
router.post('/request/:id', (req, res) => {
    const supplyId = parseInt(req.params.id);
    const supply = supplies.find(s => s.id === supplyId);

    if (supply && supply.quantity > 0) {
        supply.quantity--;
        res.json({ message: `${supply.item} requested successfully!`, supplies });
    } else {
        res.status(400).json({ message: 'Item not available or out of stock.' });
    }
});

module.exports = router;
