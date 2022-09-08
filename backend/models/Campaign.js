const { v4: uuidv4 } = require('uuid');
class Campaign {

    constructor(
        title = "", description = "", img = "",
        min_algo = -1, obj_algo = -1,
        state = false,
        date_start = -1, date_end = -1, created = new Date) {

        this.id = uuidv4();
        this.title = title;
        this.description = description;
        this.img = img;

        this.min_algo = min_algo;
        this.obj_algo = obj_algo;

        this.state = state;

        this.date_start = date_start;
        this.date_end = date_end;
        this.created = created;
    }
}

module.exports = Campaign