module.exports = (app) => {
    const express = require('express')
    const router = express.Router()
    const emailSender = require('../services/emailSender.js')

    //Generic (can be used to test the email service)
    router.post('/standard', emailSender.sendEmail)

    router.post('/sorry', async (req, res) => {
        try {
            const emailDetails = {
                // to: "jaxen.mcray@eagles.oc.edu"
                to: "solomon.granger@eagles.oc.edu"
                // to: "z.fike@eagles.oc.edu"
            }
            const result = await emailSender.apologyEmail(emailDetails)
            res.status(200).send(result)
        } catch (error) {
            console.error(error)
            res.status(500).send("error saying sorry")
        }
    })

    //Confirmation email
    router.post('/confirm', async (req, res) => {
        try {
            const emailDetails = {
                to: req.body.to,
                fullName: req.body.fullName,
            }
            const assetDetails = {
                expectedCheckinDate: req.body.expectedCheckinDate,
                serializedAssetName: req.body.serializedAssetName
            }

            const result = await emailSender.confirmCheckOutEmail(emailDetails, assetDetails)
            res.status(200).send(result)
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    })

    //Receipt email
    router.post('/receipt', async (req, res) => {
        try {
            const emailDetails = {
                to: req.body.to,
                fullName: req.body.fullName,
            }
            const assetDetails = {
                checkinDate: req.body.checkinDate,
                serializedAssetName: req.body.serializedAssetName
            }

            const result = await emailSender.confirmCheckInEmail(emailDetails, assetDetails)
            res.status(200).send(result)
        } catch (error) {
            console.log(error)
            res.status(500).send("error sending confirmation email")
        }
    })

    //Amin notification email
    router.post('/notify', async (req, res) => {
        try {
            const workerDetails = {
                checkOutBy: req.body.checkOutBy
            }
            const userDetails = {
                fullName: req.body.fullName
            }
            const assetDetails = {
                expectedCheckinDate: req.body.expectedCheckinDate,
                serializedAssetName: req.body.serializedAssetName
            }

            const result = await emailSender.adminNotification(workerDetails, userDetails, assetDetails)
            res.status(200).send(result)
        } catch (error) {
            console.error(error)
            res.status(500).send("error sending notification email")
        }
    })

    // Admin check in notification email
    router.post('/checkinNotify', async (req, res) => {
        try {
            const workerDetails ={
                checkedInBy: req.body.checkedInBy
            }
            const userDetails = {
                fullName: req.body.fullName
            }
            const assetDetails = {
                // expectedCheckinDate: req.body.expectedCheckinDate,
                serializedAssetName: req.body.serializedAssetName
            }

            const result = await emailSender.checkinNotification(workerDetails, userDetails, assetDetails)
            res.status(200).send(result)
        } catch (error) {
            console.error(error)
            res.status(500).send("error sending notification email")
        }
    })

    app.use("/asset-t1/sendEmail", router)
}

// Love, Zane