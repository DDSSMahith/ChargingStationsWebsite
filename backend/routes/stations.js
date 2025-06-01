const express = require('express');
const router = express.Router();
const ChargingStation = require('../models/ChargingStation');

// GET /api/stations (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { status, minPower, maxPower, connectorType } = req.query;

    let filter = {};
    if (status) filter.status = status;
    if (minPower || maxPower) {
      filter.powerOutput = {}; // Updated key to match model
      if (minPower) filter.powerOutput.$gte = parseFloat(minPower);
      if (maxPower) filter.powerOutput.$lte = parseFloat(maxPower);
    }
    if (connectorType) filter.connectorType = connectorType;

    const stations = await ChargingStation.find(filter);
    res.json(stations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching charging stations' });
  }
});

// POST /api/stations (Create new charger)
router.post('/', async (req, res) => {
  try {
    const { name, location, status, powerOutput, connectorType } = req.body;

    const newStation = new ChargingStation({
      name,
      location,
      status,
      powerOutput,
      connectorType
    });

    await newStation.save();
    res.status(201).json(newStation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating charging station' });
  }
});

module.exports = router;
