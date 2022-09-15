const { v4: uuidv4 } = require('uuid')
class Campaign {
    constructor(
        owner = "",
        title = "", description = "", img = "",
        targetAlgo = -1,
        state = "deactivated",
        endingDate = -1) {

        this.id = uuidv4();
        this.owner = owner;

        this.title = title;
        this.description = description;
        this.img = img;

        this.collectedAlgo = 0;
        this.targetAlgo = targetAlgo;
        this.totalDonators = 0;

        this.transactions = {};

        this.state = state;

        this.endingDate = endingDate;
        this.created = new Date;
    }

    get getId() {
        return this.id;
    }

    set setTotalDonators(totalDonators) {
        this.totalDonators = totalDonators;
    }

    incrementTotalDonators() {
        this.totalDonators = ++this.totalDonators;
    }
}

module.exports = Campaign