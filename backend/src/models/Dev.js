const { Schema, model } = require('mongoose');

const DevSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    bio: String,
    avatar: {
        type: String,
        required: true,
    },
    likes: [{
        //Schema.Types.ObjectId este é o tipo do id gerado altomaticamente pelo banco nao relacional
        type: Schema.Types.ObjectId,
        //ref é como se estivesse referenciando a uma tabela especifica "FK"
        ref: 'Dev',
    }],
    dislikes: [{
         //Schema.Types.ObjectId este é o tipo do id gerado altomaticamente pelo banco nao relacional
         type: Schema.Types.ObjectId,
         //ref é como se estivesse referenciando a uma tabela especifica "FK"
         ref: 'Dev',
    }],
}, 
{
    timestamps: true,
});
// Usando o timestamps: true ele cria altomaticamente duas colunas para quando o dado foi inserido e atualizado

module.exports = model('Dev', DevSchema);