CREATE DATABASE energy_monitor_logs;

CREATE TABLE tuya_devices (
  "id" serial primary key,
  "device_id" character varying,
  "dps_1" boolean DEFAULT 'f' NOT NULL,
  "dps_2" integer,
  "dps_3" integer,
  "dps_4" integer,
  "dps_5" integer,
  "dps_6" integer,
  "dps_7" integer,
  "dps_8" integer,
  "dps_9" integer,
  "dps_10" integer,
  "dps_11" integer,
  "dps_12" integer,
  "dps_13" integer,
  "dps_14" integer,
  "dps_15" integer,
  "dps_16" integer,
  "dps_17" integer,
  "dps_18" integer,
  "dps_19" integer,
  "dps_20" integer,
  "dps_21" integer,
  "dps_22" integer,
  "dps_23" integer,
  "dps_24" integer,
  "dps_25" integer,
  "created_at" timestamp NOT NULL
);

CREATE TABLE devices (
  "id" serial primary key,
  "name" character varying,
  "device_id" character varying NOT NULL,
  "device_key" character varying NOT NULL,
  "device_ip" character varying NOT NULL,
  "created_at" timestamp NOT NULL
);
