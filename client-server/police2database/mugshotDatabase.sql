--sudo -u postgres -i
--psql

--create database
CREATE DATABASE police_database;

-- \c police_database

--create table
CREATE TABLE mugshots(
    hash VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255)
);

--insert values
INSERT INTO mugshots VALUES('8743b52063cd84097a65d1633f5c74f5','Case Murder 23243535: John Smith, Age 35');

GRANT ALL PRIVILEGES ON TABLE mugshots TO policeserver;
