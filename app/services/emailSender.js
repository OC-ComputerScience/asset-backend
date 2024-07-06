const nodemailer = require("nodemailer")
const googlePass = process.env.GOOGLE_APP_PASS
// Create a nodemailer transporter with your email service credentials
const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., 'Gmail'
  auth: {
    user: 'z.fike@eagles.oc.edu', // Your email address
    pass: googlePass // Your email password
  }
})
// Function to send a test email
async function sendEmail(recipient) {
  try {
    // Configure the email data
    const mailOptions = {
      from: 'z.fike@eagles.oc.edu',
      to: 'z.fike@eagles.oc.edu',
      subject: 'No Subject, Test Email',
      text: 'Test' // Include your test content
    }

    // Send the email
   // const info = await transporter.sendMail(mailOptions)
    console.log('Email sent: ' + info.response)
    return 'Email sent successfully.'
  } catch (error) {
    console.error(error)
    throw 'Email could not be sent.'
  }
}

// Function to send an admin notification email
async function adminNotification(workerDetails, userDetails, assetDetails) {
  try {
    let emailContent = `<p> ${assetDetails.serializedAssetName} has been checked-out to ${userDetails.fullName}</p>
    <p>Item checked-out by ${workerDetails.checkOutBy}</p>`
    
    // Include expectedCheckinDate only if it exists
    if (assetDetails.expectedCheckinDate) {
      emailContent += `<p>Item has an expected check-in date of: ${assetDetails.expectedCheckinDate}</p>`
    }

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

// Function to send an admin notification email
async function checkinNotification(workerDetails, userDetails, assetDetails) {
  try {
    let emailContent = `<p>${userDetails.fullName} has returned: ${assetDetails.serializedAssetName}</p>
    <p>Item checked-in by ${workerDetails.checkedInBy}</p>`
    
    // Include expectedCheckinDate only if it exists
    // if (assetDetails.expectedCheckinDate) {
    //   emailContent += `<p>Check-in date: ${assetDetails.expectedCheckinDate}</p>`
    // }

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
      emailContent += `<p>Please return your item by ${assetDetails.expectedCheckinDate}.</p>`
    }

    const mailOptions = {
      from:'z.fike@eagles.oc.edu',
      to: emailDetails.to,
      subject: 'Item Check-out Confirmation',
      html: emailContent
    }

   // const info = await transporter.sendMail(mailOptions)
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
      from:'z.fike@eagles.oc.edu',
      to: emailDetails.to,
      subject: 'Item Check-in Receipt',
      html: `<p>Hello ${emailDetails.fullName},</p>
      <p>Receipt for check-in of ${assetDetails.serializedAssetName}</p>`
    }

  //  const info = await transporter.sendMail(mailOptions)
    console.log('Confirm CheckIn email: ' + info.response)
    return 'Email sent successfully.'

  } catch (error) {
    console.error(error)
    throw 'Email could not be sent.'
  }
}

// Function to send a test email
async function apologyEmail(recipient) {
  try {
    // Configure the email data
    const mailOptions = {
      from: 'z.fike@eagles.oc.edu',
      to: recipient.to,
      subject: 'I apologize for being a crockpot',
      text: 'Look I got the service running again' // Include your test content
    }

    // Send the email
  //  const info = await transporter.sendMail(mailOptions)
    console.log('Email sent: ' + info.response)
    return 'Email sent successfully.'
  } catch (error) {
    console.error(error)
    throw 'Email could not be sent.'
  }
}

// Function to send a test email
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
      from: 'z.fike@eagles.oc.edu',
      to: emailDetails.to,
      subject: `${assetDetails.serializedAssetName} is due soon`,
      html: `<p>Hello, ${emailDetails.fullName}</p>
      <p>Your item, ${assetDetails.serializedAssetName}, is due soon: ${formattedDate}</p>`
    }

    // Send the email
 //   const info = await transporter.sendMail(mailOptions)
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
  apologyEmail,
  checkinReminderEmail,
  confirmCheckInEmail,
  checkinNotification
}

// Love, Zane