class Campaign {

    constructor(name = "", date_end = -1, min_algo = -1, state = false) {
        this.name = name;
        this.date_end = date_end;
        this.min_algo = min_algo;
        this.state = state;
    }
}

module.exports = Campaign