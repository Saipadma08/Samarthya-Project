const Report =
    require("../models/report.model");

const User =
    require("../models/user.model");


// create report

const createReport =
    async (req, res) => {

        try {

            if (
                req.user.id ===
                req.body.reportedUserId
            ) {

                return res
                    .status(400)
                    .json({

                        message:
                            "Cannot report yourself"

                    });

            }


            const existing =

                await Report.findOne({

                    reporter:
                        req.user.id,

                    reportedUser:
                        req.body.reportedUserId,

                    targetId:
                        req.body.targetId

                });


            if (existing) {

                return res
                    .status(400)
                    .json({

                        message:
                            "Already reported"

                    });

            }


            const report =

                await Report.create({

                    reporter:
                        req.user.id,

                    reportedUser:
                        req.body.reportedUserId,

                    targetType:
                        req.body.targetType,

                    targetId:
                        req.body.targetId,

                    targetModel:
                        req.body.targetModel,

                    category:
                        req.body.category,

                    description:
                        req.body.description

                });


            res.status(201)
                .json(report);

        }

        catch (err) {

            console.log(err);

            res.status(500)
                .json({

                    message:
                        err.message

                });

        }

    };




// reports by me

const getMyReports =
    async (req, res) => {

        try {

            const reports =

                await Report.find({

                    reporter: req.user.id

                })

                    .populate(
                        "reportedUser",
                        "name profileImage"
                    )

                    .populate(
                        "targetId"
                    );


            res.json(
                reports
            );

        }

        catch (err) {

            res.status(500)
                .json({

                    message:
                        err.message

                });

        }

    };




// reports against me

const getComplaints =
    async (req, res) => {

        try {

            const reports =

                await Report.find({

                    reportedUser:
                        req.user.id

                })

                    .populate(
                        "reporter",
                        "name profileImage"
                    )

                    .populate(
                        "targetId"
                    );


            res.json(
                reports
            );

        }

        catch (err) {

            res.status(500)
                .json({

                    message:
                        err.message

                });

        }

    };




// admin all reports

const getAllReports =
    async (req, res) => {

        try {

            const reports =

                await Report.find()

                    .populate(
                        "reporter",
                        "name profileImage"
                    )

                    .populate(
                        "reportedUser",
                        "name profileImage"
                    )

                    .populate(
                        "targetId"
                    );


            res.json(
                reports
            );

        }

        catch (err) {

            res.status(500)
                .json({

                    message:
                        err.message

                });

        }

    };




// clear report

const clearReport =
    async (req, res) => {

        try {

            await Report.findByIdAndUpdate(

                req.params.id,

                {
                    status: "cleared"
                }

            );

            res.json({

                message:
                    "Cleared"

            });

        }

        catch (err) {

            res.status(500)
                .json({

                    message:
                        err.message

                });

        }

    };




// block user

const blockUser =
    async (req, res) => {

        try {

            const report =

                await Report.findById(
                    req.params.id
                );

            if (!report) {

                return res
                    .status(404)
                    .json({

                        message:
                            "Report not found"

                    });

            }


            await User.findByIdAndUpdate(

                report.reportedUser,

                {

                    isBlocked: true,

                    blockReason:
                        report.category,

                    blockedAt:
                        new Date(),

                    blockedBy:
                        req.user.id,

                    deactivationAppealStatus:
                        "none"

                }

            );


            await Report.findByIdAndUpdate(

                req.params.id,

                {
                    status: "blocked"
                }

            );


            res.json({

                message:
                    "Blocked"

            });

        }

        catch (err) {

            res.status(500)
                .json({

                    message:
                        err.message

                });

        }

    };




// suspend user

const suspendUser =
    async (req, res) => {

        try {

            const { days } = req.body;

            const report =

                await Report.findById(
                    req.params.id
                );

            if (!report) {

                return res
                    .status(404)
                    .json({

                        message:
                            "Report not found"

                    });

            }


            const endDate =
                new Date();

            endDate.setDate(
                endDate.getDate() + days
            );


            await User.findByIdAndUpdate(

                report.reportedUser,

                {

                    isSuspended: true,

                    suspensionEndsAt:
                        endDate,

                    suspensionReason:
                        report.category,

                    deactivationAppealStatus:
                        "none"

                }

            );


            await Report.findByIdAndUpdate(

                req.params.id,

                {

                    status:
                        "suspended",

                    suspensionEndsAt:
                        endDate

                }

            );


            res.json({

                message:
                    "Suspended"

            });

        }

        catch (err) {

            res.status(500)
                .json({

                    message:
                        err.message

                });

        }

    };

const unblockUser =
    async (req, res) => {

        try {

            const report =

                await Report.findById(
                    req.params.id
                );

            if (!report) {

                return res
                    .status(404)
                    .json({

                        message:
                            "Report not found"

                    });

            }

            await User.findByIdAndUpdate(

                report.reportedUser,

                {

                    isBlocked: false,

                    blockReason: null,

                    blockedAt: null,

                    blockedBy: null,

                    deactivationAppealStatus:
                        "none"


                }

            );


            await Report.findByIdAndUpdate(

                req.params.id,

                {

                    status: "cleared"

                }

            );


            res.json({

                message:
                    "User unblocked"

            });

        }

        catch (err) {

            res.status(500)
                .json({

                    message:
                        err.message

                });

        }

    };



const removeSuspension =
    async (req, res) => {

        try {

            const report =

                await Report.findById(
                    req.params.id
                );

            if (!report) {

                return res
                    .status(404)
                    .json({

                        message:
                            "Report not found"

                    });

            }


            await User.findByIdAndUpdate(

                report.reportedUser,

                {

                    isSuspended: false,

                    suspensionEndsAt: null,

                    suspensionReason: null,

                    deactivationAppealStatus:
                        "none"

                }

            );


            await Report.findByIdAndUpdate(

                req.params.id,

                {

                    status: "cleared",

                    suspensionEndsAt: null

                }

            );


            res.json({

                message:
                    "Suspension removed"

            });

        }

        catch (err) {

            res.status(500)
                .json({

                    message:
                        err.message

                });

        }

    };




module.exports = {

    createReport,

    getMyReports,

    getComplaints,

    getAllReports,

    clearReport,

    blockUser,

    suspendUser,

    unblockUser,

    removeSuspension

};