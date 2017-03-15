/* eslint-disable no-param-reassign */
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const app = express();

const DATA_FILE_METERES = path.join(__dirname, 'data/Parking_Meters.geojson');
const DATA_FILE_BAYS = path.join(__dirname, 'data/Parking_Bays.geojson');

app.set('port', (process.env.PORT || 3001));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.get('/api/meters', (req, res) => {
  fs.readFile(DATA_FILE_METERES, (err, data) => {
    let obj = JSON.parse(data);
    let meterIDs = _.sortBy(_.map(obj.features, 'properties.local_id'));

    res.setHeader('Cache-Control', 'no-cache');
    res.json(meterIDs);
  });
});

app.get('/api/bays/:meter', (req, res) => {
  fs.readFile(DATA_FILE_BAYS, (err, data) => {
    let obj = JSON.parse(data);
    let filteredBays = _.filter(obj.features,
        { properties: { meternumber: req.params.meter }});

    res.setHeader('Cache-Control', 'no-cache');
    res.json(filteredBays);
  });
});

export default app;
