const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    img: { type: String, default:"n/a"},
    year:  { type: String, required: true },
    make:  { type: String, required: true },
    model:  { type: String, required: true },
    hp: { type: String, required: true },
    description: { type: String, required: true}
});

const carCollection = mongoose.model('Car', carSchema);

module.exports = carCollection;