const cron = require('node-cron')
const { Sequelize } = require('sequelize')
const personAsset = require("../controllers/personAsset.controller.js")
const person = require('../controllers/person.controller.js')
const emailSender = require('./emailSender')
// const getPersonAssetForReminder = personAsset.getPersonAssetForReminder

function scheduleCronJob() {
    // Schedule cron job to run at the start of every day
    cron.schedule('15 7 * * *', async function() {
        console.log('---------------------')
        console.log('Running Cron Job')
        try {
            // Get all personAssets with expectedCheckinDate 2-3 days away from today
            const assetsToRemind = await personAsset.getPersonAssetForReminder()
            const overdueAssets = await personAsset.getOverdueAssets();
    
            if ((!assetsToRemind || assetsToRemind.length == 0) && (!overdueAssets || overdueAssets.length == 0)) {
                console.log("No assets are due in the next 3 days")
                return
            }
    
            // Send reminder email for each asset
            for (const asset of assetsToRemind) {
                console.log('Asset:', asset.serializedAsset.serializedAssetName)

                // Construct person object
                const emailDetails = {
                    fullName: asset.person.fName + ' ' + asset.person.lName +
                    ' (' + asset.person.idNumber + ')',
                    to: asset.person.email
                }

                const assetDetails = {
                    expectedCheckinDate: asset.expectedCheckinDate,
                    serializedAssetName: asset.serializedAsset?.serializedAssetName
                }

                // Send reminder email
                await emailSender.checkinReminderEmail(emailDetails, assetDetails)

                console.log(`Reminder email sent for personAssetId: ${asset.personAssetId}`)
            }

            for (const asset of overdueAssets) {
                console.log('Asset:', asset.serializedAsset.serializedAssetName)

                // Construct person object
                const emailDetails = {
                    fullName: asset.person.fName + ' ' + asset.person.lName +
                    ' (' + asset.person.idNumber + ')',
                    to: asset.person.email
                }

                const assetDetails = {
                    expectedCheckinDate: asset.expectedCheckinDate,
                    serializedAssetName: asset.serializedAsset?.serializedAssetName
                }

                // Send reminder email
                await emailSender.overdueAssetEmail(emailDetails, assetDetails)

                console.log(`Reminder email sent for personAssetId: ${asset.personAssetId}`)
            }
    
            console.log('Reminder emails sent successfully!')
        } catch (error) {
            console.error('Error occurred while sending reminder emails:', error)
        }    
    })
}

module.exports = scheduleCronJob

// Love, Zane
