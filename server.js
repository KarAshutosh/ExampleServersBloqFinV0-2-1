const express = require("express")
const app = express()
const fetch = require('node-fetch');

const cors = require("cors")
app.use(express.json())

app.use(
  cors({
    origin: "*",
  })
)

app.get("/", (req, res) => {
   res.redirect("http://bloqfin.com")
})

app.post("/1/create-checkout-session", async (req, res) => {
    

    fetch("http://payment-api.bloqfin.com/payment/62fa188609190a14ff23e798", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
        items: 
            { 
                contractID: '62fa188609190a14ff23e798',
                priceInEth: 0.0001,
                gasLimit: 0.001,
                slippageLimit: 0.05,
                successURL: 'https://bloqfin-example.000webhostapp.com/success.html',
                cancelURL: 'https://bloqfin-example.000webhostapp.com/cancel.html',
                name: "Rare in-App Item",
                input0: "",
                input1: "",
                input2: "",
                input3: "",
                input4: "",
                input5: "",
                input6: "",
                input7: "",
                input8: "",
                input9: "",
            }
        ,
        }),
    })
    .then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
    })
    .then(({ url }) => {
        var stripeURL = url
        res.json({ url: stripeURL }) 
       
    })
    .catch(e => {
      console.error(e.error)
    })
})


console.log("Server 5000 ON")

app.listen(5000)
