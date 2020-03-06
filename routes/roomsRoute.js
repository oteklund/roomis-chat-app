const { Router } = require('express');
const router = Router();
const getAllRooms = require('../services/roomService').getAllRooms;
const createRoom = require('../services/roomService').createRoom;
// Get All Rooms
router.get('/', async (req, res) => {
  try {
    const roomData = await getAllRooms();
    if (!roomData) {
      res.status(404);
    }
    res.status(200).json(roomData);
  } catch (err) {
    console.error(err.message);
    res.status(400);
  }
});
// Create One Rooms
router.post('/', async (req, res) => {
  try {
    const newRoom = await createRoom(req.body);
    if (!newRoom) {
      res.status(404);
    }
    res.status(200).json(newRoom);
  } catch (err) {
    console.error(err.message);
    res.status(400);
  }
});

module.exports = router;
