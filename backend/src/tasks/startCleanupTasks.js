const cleanupUnverifiedUsers = require("../services/cleanupUnverifiedUsers.service");

function startCleanupTasks() {

    setInterval(() => {

        cleanupUnverifiedUsers();

    }, 5 * 60 * 1000);

}

module.exports = startCleanupTasks;