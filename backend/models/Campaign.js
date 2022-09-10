class Campaign {
    static count = 0;

    constructor(
        owner = "",
        title = "", description = "", img = "",
        targetAlgo = -1,
        state = "deactivated",
        endingDate = -1) {

        this.id = ++this.constructor.count;
        this.owner = owner;

        this.title = title;
        this.description = description;
        this.img = img;

        this.collectedAlgo = 0;
        this.targetAlgo = targetAlgo;
        this.totalDonators = 0;

        this.state = state;

        this.endingDate = endingDate;
        this.created = new Date;
    }

    set setTotalDonators(totalDonators) {
        this.totalDonators = totalDonators;
    }

    incrementTotalDonators() {
        this.totalDonators = ++this.totalDonators;
    }
}

module.exports = Campaign