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
INSERT INTO mugshots VALUES('hashstring','namestring');

GRANT ALL PRIVILEGES ON TABLE mugshots TO policeserver;
