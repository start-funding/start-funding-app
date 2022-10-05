const { v4: uuidv4 } = require('uuid')
class Campaign {
    constructor(
        owner = "",
        name = "",
        description = "",
        image = "",
        target = -1,
        state = "active",
        endingDate = -1, 
        appId="", 
        appAddress="") {

        this.id = uuidv4();
        this.owner = owner;

        this.name = name;
        this.description = description;
        this.image = image;

        this.collectedFunds = 0;
        this.target = target;
        this.donatorsNumber = 0;

        this.transactions = {};

        this.state = state;

        this.endingDate = endingDate;
        this.created = new Date;
        this.appId = appId;
        this.appAddress = appAddress;
    }

    get getId() {
        return this.id;
    }

    set setDonatorsNumber(donatorsNumber) {
        this.donatorsNumber = donatorsNumber;
    }

    incrementTotalDonators() {
        this.donatorsNumber = ++this.donatorsNumber;
    }
}

module.exports = Campaign