const cron = require('node-cron');
const sinon = require('sinon');
const { expect } = require('chai');
const scheduleCronJob = require('./cronMail');
const personAsset = require("../controllers/personAsset.controller")
const person = require("../controllers/person.controller")
const emailSender = require("./emailSender")

const mockData = [
    {
        personAssetId: 4,
        serializedAssetId: 13,
        personId: 2,
        checkoutDate: new Date("2024-03-01T20:20:00.000Z"),
        expectedCheckinDate: new Date("2024-04-18T10:00:00.000Z"),
        checkinDate: null,
        checkoutStatus: true,
        checkedOutBy: "Justin Davis",
        checkedInBy: null,
        person: {
            personId: 2,
            fName: "Zane",
            lName: "Fike",
            email: "z.fike@eagles.oc.edu",
            idNumber: "1000002",
            activeStatus: true
        },
        serializedAsset: {
            serializedAssetName: "MacBook Pro 16 (100013)",
            serializedAssetId: 13,
            serialNumber: "100013",
            profileId: 4,
            notes: "Apple laptop with M1 Pro chip.",
            activeStatus: true,
            assetProfile: {
                profileId: 4,
                profileName: "MacBook Pro 16",
                typeId: 2
            }
        }
    }
];

describe('Cron Job', () => {
    let cronStub;
  
    beforeEach(() => {
      cronStub = sinon.stub(cron, 'schedule');
    });
  
    afterEach(() => {
      cronStub.restore();
    });
  
    it('should run cron job and call necessary functions', async () => {
      // Stub necessary functions
      const getPersonAssetForReminderStub = sinon.stub(personAsset, 'getPersonAssetForReminder').resolves([mockData]);
      const getPersonByIdStub = sinon.stub(person, 'getPersonById').resolves({ email: 'z.fike@eagles.oc.edu', fullName: 'Test User' });
      const checkinReminderEmailStub = sinon.stub(emailSender, 'checkinReminderEmail').resolves();
  
      // Call the cron job function
      await scheduleCronJob();
  
      // Assertions
      expect(cronStub.calledOnce).to.be.true;
      expect(getPersonAssetForReminderStub.calledOnce).to.be.true;
      expect(getPersonByIdStub.calledOnce).to.be.true;
      expect(checkinReminderEmailStub.calledOnce).to.be.true;
  
      // Restore stubs
      getPersonAssetForReminderStub.restore();
      getPersonByIdStub.restore();
      checkinReminderEmailStub.restore();
    });
  });