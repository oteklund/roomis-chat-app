require('dotenv').config();
const mongoose = require('mongoose');
const Room = require('../db/schemat/roomSchema');

const getAllRooms = () => {
  return Room.find();
};
const createRoom = r => {
  return Room.create(r);
};

module.exports = { getAllRooms, createRoom };
