const TuyAPI = require('tuyapi');
const device1 = new TuyAPI({
  id: process.env.DEVICE1_ID,
  key: process.env.DEVICE1_KEY,
  ip: process.env.DEVICE1_IP,
  persistentConnection: true
});
const device2 = new TuyAPI({
  id: process.env.DEVICE2_ID,
  key: process.env.DEVICE2_KEY,
  ip: process.env.DEVICE2_IP,
  persistentConnection: true
});

const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT
});

device1.on('connected',() => {
  console.log('Connected to device1.');
});
device1.on('disconnected',() => {
  console.log('Disconnected from device1.');
});
device2.on('connected',() => {
  console.log('Connected to device2.');
});
device2.on('disconnected',() => {
  console.log('Disconnected from device2.');
});

device1.on('data', data => {
  console.log('Data from device1:', data);

  var text = 'INSERT INTO smart_plugs( \
    device_id, \
    dps_1, \
    dps_2, \
    dps_3, \
    dps_4, \
    dps_5, \
    dps_6, \
    dps_7, \
    dps_8, \
    dps_9, \
    dps_10, \
    dps_11, \
    dps_12, \
    dps_13, \
    dps_14, \
    dps_15, \
    dps_16, \
    dps_17, \
    dps_18, \
    dps_19, \
    dps_20, \
    dps_21, \
    dps_22, \
    dps_23, \
    dps_24, \
    dps_25, \
    created_at \
  ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27) RETURNING id';

  var values = [data.devId];

  for(var i=1; i <= 25; i++){
    values.push(data.dps[i.toString()]);
  }
  values.push(new Date());

  pool.query(text, values).then(res => {
    console.log(res.rows[0]);
  }).catch(e => console.error(e.stack));
});
device2.on('data', data => {
  console.log('Data from device2:', data);

  var text = 'INSERT INTO smart_plugs( \
    device_id, \
    dps_1, \
    dps_2, \
    dps_3, \
    dps_4, \
    dps_5, \
    dps_6, \
    dps_7, \
    dps_8, \
    dps_9, \
    dps_10, \
    dps_11, \
    dps_12, \
    dps_13, \
    dps_14, \
    dps_15, \
    dps_16, \
    dps_17, \
    dps_18, \
    dps_19, \
    dps_20, \
    dps_21, \
    dps_22, \
    dps_23, \
    dps_24, \
    dps_25, \
    created_at \
  ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27) RETURNING id';

  var values = [data.devId];

  for(var i=1; i <= 25; i++) {
    values.push(data.dps[i.toString()]);
  }
  values.push(new Date());

  pool.query(text, values).then(res => {
    console.log(res.rows[0]);
  }).catch(e => console.error(e.stack));
});

device1.on('error',(err) => {
  console.log('Error1: ' + err);
});
device2.on('error',(err) => {
  console.log('Error2: ' + err);
});

device1.connect();
device2.connect();
