const express = require('express')
const app = express();
const cors = require('cors')
const port = 5000

app.use(cors());
app.use(express.json());

const {providers, Wallet, utils} = require('ethers')
require('dotenv').config()
const ALCHEMY_URL = process.env.ALCHEMY_RINKEBY_URL

const provider = new providers.JsonRpcProvider(ALCHEMY_URL);

app.get('/current-block', async (req, res) => {
    let currentBlock = await provider.getBlockNumber()
    res.send(currentBlock.toString())
})

app.post('/get-balance', async (req, res) => {
    let balance = await provider.getBalance(req.body.address, "latest")
    res.send(utils.parseEther(balance.toString()).toString())
    // https://docs.ethers.io/v5/api/providers/provider/#Provider-getCode - determine if smart contract address or external account
})

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});