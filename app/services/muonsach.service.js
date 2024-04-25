const { ObjectId } = require("mongodb");

class MuonSachService {
    constructor(client) {
        this.MuonSach = client.db().collection("muonsach");
    }

    extractMuonSachData(payload) {
        const muonsach = {
            name: payload.name,
            reader: payload.reader,
            borrow: payload.borrow,
            returns: payload.returns
        };

        Object.keys(muonsach).forEach(
            (key) => muonsach[key] === undefined && delete muonsach[key]
        );
        return muonsach;
    }
    async create(payload) {
        const muonsach = this.extractMuonSachData(payload);
        const result = await this.MuonSach.findOneAndUpdate(
            muonsach,
            { $set: {} },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.MuonSach.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
           name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.MuonSach.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractMuonSachData(payload);
        const result = await this.MuonSach.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.MuonSach.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAll() {
        const result = await this.MuonSach.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = MuonSachService;