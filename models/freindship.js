const mongoose = require('mongoose')
const freindshipSchema = new mongoose.Schema({
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},
    {
        timestamps: true

    }

)
const Freindship = mongoose.model('Freindship', freindshipSchema)
module.exports = Freindship