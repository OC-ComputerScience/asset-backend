const nodemailer = require("nodemailer")
const googlePass = process.env.GOOGLE_APP_PASS
// Create a nodemailer transporter with your email service credentials
const transporter = nodemailer.createTransport({
  host: "SMTP.oc.edu",
  port: 25,
  secure: false,
  debug: true,
  logger: true
})

// Function to send an admin notification email
async function checkinNotification(workerDetails, userDetails, assetDetails) {
  try {
    let emailContent = `<p>${userDetails.fullName} has returned: ${assetDetails.serializedAssetName}</p>
    <p>Item checked-in by ${workerDetails.checkedInBy}</p>`

    // Configure the email data
    const mailOptions = {
      from: 'jaxen.mcray@eagles.oc.edu',
      to: 'jaxen.mcray@eagles.oc.edu',
      subject: 'Equipment Has Been Checked-out',
      html: emailContent,
    }

    // Send the email

    //const info = await transporter.sendMail(mailOptions)
    console.log('Admin Notification email sent: ' + info.response)

    return 'Email sent successfully.'
  } catch (error) {
    console.error(error)
    throw 'Email could not be sent to admin.'
  }
}


async function confirmCheckOutEmail(emailDetails, assetDetails) {
  try {
    let emailContent = `<p>Hello ${emailDetails.fullName},</p>
      <p>Receipt for check-out of ${assetDetails.serializedAssetName}</p>`
    
    // Include expectedCheckinDate only if it exists
    if (assetDetails.expectedCheckinDate) {
      emailContent += `<p>Please return your item to Support Central by ${assetDetails.expectedCheckinDate}.</p>`
    }

    emailContent += `<img src="https://ddtjogezxr16i.cloudfront.net/images/email/oc-logo-email-75.png" alt="Oklahoma Christian University" width="150" height="150" style="font-family:sofia-pro;font-size:17px;font-weight:600;margin:0px;padding:0px;display:block;width:150px;height:150px">`

    const mailOptions = {
      from:'supportcentral@oc.edu',
      to: emailDetails.to,
      subject: 'Item Check-out Confirmation',
      html: emailContent
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Confirm CheckOut email sent: ' + info.response)

    return 'Email sent successfully.'

  } catch (error) {
    console.error(error)
    throw 'Email could not be sent.'
  }
}

async function confirmCheckInEmail(emailDetails, assetDetails) {
  try {
    const mailOptions = {
      from:'supportcentral@oc.edu',
      to: emailDetails.to,
      subject: 'Item Check-in Receipt',
      html: `<p>Hello ${emailDetails.fullName},</p>
      <p>Receipt for check-in of ${assetDetails.serializedAssetName}</p>
      <img src="https://ddtjogezxr16i.cloudfront.net/images/email/oc-logo-email-75.png" alt="Oklahoma Christian University" width="150" height="150" style="font-family:sofia-pro;font-size:17px;font-weight:600;margin:0px;padding:0px;display:block;width:150px;height:150px">
      `
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Confirm CheckIn email: ' + info.response)

    return 'Email sent successfully.'

  } catch (error) {
    console.error(error)
    throw 'Email could not be sent.'
  }
}

async function checkinReminderEmail(emailDetails, assetDetails) {
  const checkInDate = assetDetails.expectedCheckinDate

  if (checkInDate.getDay() == 0) {
    checkInDate.setDate(checkInDate.getDate() + 1)
  } else if (checkInDate.getDay() == 6) {
    checkInDate.setDate(checkInDate.getDate() + 2)
  }

  const formattedDate = checkInDate.toDateString()

  try {
    // Configure the email data
    const mailOptions = {
      from: 'supportcentral@oc.edu',
      to: emailDetails.to,
      subject: `${assetDetails.serializedAssetName} is due soon`,
      html: `<p>Hello, ${emailDetails.fullName}</p>
      <p>This is a reminder that an item checked out to you - ${assetDetails.serializedAssetName} - is due soon: ${formattedDate}</p>
      <p>Please bring this item to Support Central by the due date to get it checked in</p>
      <img src="https://ddtjogezxr16i.cloudfront.net/images/email/oc-logo-email-75.png" alt="Oklahoma Christian University" width="150" height="150" style="font-family:sofia-pro;font-size:17px;font-weight:600;margin:0px;padding:0px;display:block;width:150px;height:150px">
      `
    }


   const info = await transporter.sendMail(mailOptions)
    console.log('Email sent: ' + info.response)

    return 'Reminder email sent successfully.'
  } catch (error) {
    console.error(error)
    throw 'Email could not be sent.'
  }
}

module.exports = {
  sendEmail,
  adminNotification,
  confirmCheckOutEmail,
  checkinReminderEmail,
  confirmCheckInEmail,
  checkinNotification
}