let mongoose = require('mongoose')

const server='ds263107.mlab.com'
const port='63107'
const database='github'
const username=encodeURIComponent('github1')
const password=encodeURIComponent('github1')

mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb://${username}:${password}@${server}:${port}/${database}`, {useNewUrlParser: true,  useUnifiedTopology: true})

let customerSchema = mongoose.Schema({ 
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Customer', customerSchema)