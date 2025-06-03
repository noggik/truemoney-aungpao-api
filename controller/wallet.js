const { wallet } = require("../utils/wallet")
require('dotenv').config()

// Example data
// aungPaoCode = "https://gift.truemoney.com/campaign/?v=018f87a62de97634b9322cf45**********"

module.exports.TrueWalletAungPao = async (req, res) => {
    const { aungPaoCode, RECEIVER } = req.body
    const receiver = RECEIVER || process.env.RECEIVER

    if (!aungPaoCode) {
        return res.status(400).json({
            message: "please provide aungpao code"
        })
    }

    console.log(aungPaoCode)

    try {
        const response = await wallet(receiver, aungPaoCode)

        // AMOUNT FROM AUNGPAO
        const amount = response.amount
        const owner = response.owner_full_name
        const code = response.code

        console.log(`AUNGPAO TOPUP SUCCESS: ${amount} BATH | FROM ${owner} | CODE: ${code}`)
        return res.status(200).json({
            message: "aungpao topup success",
            amount: amount
        })
    } catch (error) {
        if (error.message === "VOUCHER_OUT_OF_STOCK") {
            console.warn("Voucher out of stock. Retrying...");
            return res.status(400).json({
                message: "the voucher is out of date or out of stock please try again later",
            })
        } else {
            console.error("Error in AUNGPAO TOPUP:", error)
            return res.status(500).json({ message: "the voucher is already used or invalid"})
        }
    }
}
