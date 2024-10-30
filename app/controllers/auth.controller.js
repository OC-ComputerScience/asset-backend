const db = require("../models");
const authconfig = require("../config/auth.config");
const UserUserRole = db.userUserRole
const User = db.user;
const UserRole = db.userRole;
const Session = db.session;
const Op = db.Sequelize.Op;

const { google } = require("googleapis");

var jwt = require("jsonwebtoken");

let googleUser = {};

const google_id = process.env.CLIENT_ID;

exports.login = async (req, res) => {
  var googleToken = req.body.credential;

  const { OAuth2Client } = require("google-auth-library");
  const client = new OAuth2Client(google_id);
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: google_id,
    });
    googleUser = ticket.getPayload();
    console.log("Google payload is " + JSON.stringify(googleUser));
  }
  await verify().catch(console.error);

  let email = googleUser.email;
  let firstName = googleUser.given_name;
  let lastName = googleUser.family_name;

  // if we don't have their email or name, we need to make another request
  // this is solely for testing purposes
  if (
    (email === undefined ||
      firstName === undefined ||
      lastName === undefined) &&
    req.body.accessToken !== undefined
  ) {
    let oauth2Client = new OAuth2Client(google_id); // create new auth client
    oauth2Client.setCredentials({ access_token: req.body.accessToken }); // use the new auth client with the access_token
    let oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });
    let { data } = await oauth2.userinfo.get(); // get user info
    email = data.email;
    firstName = data.given_name;
    lastName = data.family_name;
  }

  let user = {};
  let session = {};

  try{
    user = await getUser(email)
    if(user.id === undefined) {
      user = await createUser(email, firstName, lastName)
    }
    else if(user.fName !== firstName || user.lName !== lastName){
      let updatedUser = await updateUser(firstName, lastName, user)
      user.firstName = updatedUser.firstName
      user.lastName = updatedUser.lastName
    }
  }
  catch(err){
    res.status(500).send({message: err.message})
    return
  }

  // try to find session first

  await Session.findOne({
    where: {
      email: email,
      token: { [Op.ne]: "" },
    },
  })
    .then(async (data) => {
      if (data !== null) {
        session = data.dataValues;
        if (session.expirationDate < Date.now()) {
          session.token = "";
          // clear session's token if it's expired
          await Session.update(session, { where: { id: session.id } })
            .then((num) => {
              if (num == 1) {
                console.log("successfully logged out");
              } else {
                console.log("failed");
                res.send({
                  message: `Error logging out user.`,
                });
              }
            })
            .catch((err) => {
              console.log(err);
              res.status(500).send({
                message: "Error logging out user.",
              });
            });
          //reset session to be null since we need to make another one
          session = {};
        } else {
          // if the session is still valid, then send info to the front end
          user.userId = user.id;
          user.token = session.token;
          res.send(user);
        }
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sessions.",
      });
    });

  if (session.id === undefined) {
    // create a new Session with an expiration date and save to database
    let token = jwt.sign({ id: email }, authconfig.secret, {
      expiresIn: 86400,
    });
    let tempExpirationDate = new Date();
    tempExpirationDate.setDate(tempExpirationDate.getDate() + 1);
    const session = {
      token: token,
      email: email,
      userId: user.id,
      expirationDate: tempExpirationDate,
    };

    await Session.create(session)
      .then(() => {
        user.token = token;
        user.userId = user.id;
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
};

async function getUser(email) {
  const data = await User.findOne({
    where: { email: email }
  })
  let user = {}
  if(data != null){
    user = data.dataValues
    let roles = await getUserRoles(user)
    let activeRole = {}
    roles.forEach((role) => {
      if(role.dataValues.active) {
        activeRole = role.dataValues.userRole
      }
    })
    user.roles = roles
    user.canAdd = activeRole.canAdd
    user.canEdit = activeRole.canEdit
    user.canArchive = activeRole.canArchive
    user.canActivate = activeRole.canActivate
    user.canDelete = activeRole.canDelete
    user.viewCheckOutIn = activeRole.viewCheckOutIn
    user.viewServices = activeRole.viewServices
    user.viewMaintenance = activeRole.viewMaintenance
    user.viewWarranties = activeRole.viewWarranties
    user.viewLeases = activeRole.viewLeases
    user.viewReports = activeRole.viewReports
    user.viewManage = activeRole.viewManage
    user.viewAssets = activeRole.viewAssets
    user.viewFacilities = activeRole.viewFacilities
    user.viewPeople = activeRole.viewPeople
    user.viewUsers = activeRole.viewUsers
    user.isAdmin = activeRole.isAdmin
    user.isWorker = activeRole.isWorker
    user.isManager = activeRole.isManager
    user.isUnassigned = activeRole.isUnassigned
    user.categoryId = activeRole.categoryId
    user.userRoleId = activeRole.id
  }
  return user
} 


async function getUserRoles(user) {
  const data = await UserUserRole.findAll({
    where: {userId: user.id},
    include: [{model: UserRole}],
  })
  return data
}

async function createUser(email, firstName, lastName) {
  let user = {
    fName: firstName,
    lName: lastName,
    email: email,
    userRoleId: 2,
    devPermission: false
  }

  const data = await User.create(user)
  user = data.dataValues
  user.canAdd = false
  user.canEdit = false
  user.canArchive = false
  user.canActivate = false
  user.canDelete = false
  user.viewCheckOutIn = false
  user.viewServices = false
  user.viewMaintenance = false
  user.viewWarranties = false
  user.viewLeases = false
  user.viewReports = false
  user.viewManage = false
  user.viewAssets = false
  user.viewFacilities = false
  user.viewPeople = false
  user.viewUsers = false
  user.isAdmin = false
  user.isManager = false
  user.isWorker = false
  user.isUnassigned = true

  const role = {
    userId: user.id,
    userRoleId: 2,
    active: 1
  }
  let newRole = await UserUserRole.create(role)
  user.roles = [newRole.dataValues]

  return user
}

async function updateUser(firstName, lastName, user) {
  let updateData = {
    fName: firstName,
    lName: lastName
  }
  let data = await User.update(updateData, { where: { id: user.id } })
  return data.dataValues
}


exports.authorize = async (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "postmessage"
  );

  // Get access and refresh tokens (if access_type is offline)
  let { tokens } = await oauth2Client.getToken(req.body.code);
  oauth2Client.setCredentials(tokens);

  let user = {};

  await User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (data != null) {
        user = data.dataValues;
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
      return;
    });
  user.refresh_token = tokens.refresh_token;
  let tempExpirationDate = new Date();
  tempExpirationDate.setDate(tempExpirationDate.getDate() + 100);
  user.expiration_date = tempExpirationDate;

  await User.update(user, { where: { id: user.id } })
    .then((num) => {
      if (num == 1) {
        console.log("updated user's google token stuff");
      } else {
        console.log(
          `Cannot update User with id=${user.id}. Maybe User was not found or req.body is empty!`
        );
      }
      let userInfo = {
        refresh_token: user.refresh_token,
        expiration_date: user.expiration_date,
      };
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.logout = async (req, res) => {
  if (req.body === null) {
    res.send({
      message: "User has already been successfully logged out!",
    });
    return;
  }

  // invalidate session -- delete token out of session table
  let session = {};

  await Session.findAll({ where: { token: req.body.token } })
    .then((data) => {
      if (data[0] !== undefined) session = data[0].dataValues;
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sessions.",
      });
      return;
    });

  session.token = "";

  // session won't be null but the id will if no session was found
  if (session.id !== undefined) {
    Session.update(session, { where: { id: session.id } })
      .then((num) => {
        if (num == 1) {
          console.log("successfully logged out");
          res.send({
            message: "User has been successfully logged out!",
          });
        } else {
          console.log("failed");
          res.send({
            message: `Error logging out user.`,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: "Error logging out user.",
        });
      });
  } else {
    console.log("already logged out");
    res.send({
      message: "User has already been successfully logged out!",
    });
  }
};
