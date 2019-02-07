const TuyAPI = require('tuyapi');

const { Pool } = require('pg');
const pool = new Pool({
  user:     process.env.PG_USER,
  host:     process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port:     process.env.PG_PORT
});

pool.query('SELECT device_id, device_key, device_ip FROM devices').then(res => {
  res.rows.forEach(function (row) {
    var device = new TuyAPI({
      id:  row['device_id'],
      key: row['device_key'],
      ip:  row['device_ip'],
      persistentConnection: true
    });

    device.on('connected',() => {
      console.log('Connected to device ' + row['device_id']);
    });
    device.on('disconnected',() => {
      console.log('Disconnected from device ' + row['device_id']);
    });
    device.on('data', data => {
      console.log('Data from device ' + row['device_id'] + ': ', data);

      if(data && data.devId && data.dps) {
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

        pool.query(text, values).then(insert_res => {
          console.log(insert_res.rows[0]);
        }).catch(e => console.error(e.stack));
      }
    });
    device.on('error',(err) => {
      console.log('Error from device ' + row['device_id'] + ': ' + err);
    });
    device.connect();
  })
}).catch(e => console.error(e.stack));
