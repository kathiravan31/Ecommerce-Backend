const stripe = require('stripe')(process.env.STRIPE_KEY)

async function postPayment(req,res){
    let response = {};   
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "inr",
        shipping: {
            name: 'kathir',
            address: {
              line1: '510 Townsend St',
              postal_code: '98140',
              city: 'San Francisco',
              state: 'CA',
              country: 'US',
            },
        },
        description: 'Software development services'
    },(stripeErr,stripeRes)=>{
        if(stripeErr){
            res.status(500).json(stripeErr);
        }
        else{
            res.status(200).json(stripeRes);
        }
    })
}

module.exports = {
    postPayment
}