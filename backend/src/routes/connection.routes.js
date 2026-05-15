const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
    connectionController, 
    sendRequest, 
    acceptRequest, 
    rejectRequest, 
    getConnectionStatus,
    getMyConnections,
    getPendingRequests,
    removeConnection,
    blockUser,
    cancelRequest,
    getSentRequests,
    getConnectionsCount} = require("../controllers/connection.controller");

const router = express.Router();

router.get("/",authMiddleware,connectionController);

router.post(
  "/send/:userId",
  authMiddleware,
  sendRequest
);

router.put(
  "/accept/:connectionId",
  authMiddleware,
  acceptRequest
);

router.delete(
  "/reject/:connectionId",
  authMiddleware,
  rejectRequest
);

router.get(
  "/status/:userId",
  authMiddleware,
  getConnectionStatus
);

router.get(
  "/my-connections",
  authMiddleware,
  getMyConnections
);

router.get(
  "/pending",
  authMiddleware,
  getPendingRequests
);

router.delete(
    "/remove/:userId",
    authMiddleware,
    removeConnection
);

router.put(
    "/block/:connectionId",
    authMiddleware,
    blockUser
);

router.delete(
    "/cancel/:userId",
    authMiddleware,
    cancelRequest
);

router.get(
"/sent",
authMiddleware,
getSentRequests
);

router.get(
    "/count/:userId",
    authMiddleware,
    getConnectionsCount
);

module.exports = router;