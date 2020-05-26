const express = require('express');
const axios = require('axios');
var fs = require('fs')

const app = express()

app.get('/:quant', async (req, res) => {
    
    for (let index = 0; index <= req.params.quant; index++) {
            axios({
                method: "get",
                url: "https://picsum.photos/200/300?grayscale",
                responseType: "stream"
            }).then(async function (response) {
                try {
                    await response.data.pipe(fs.createWriteStream(index+"."+response.headers['content-type'].split('/')[1]));
                    console.log("o item "+(index+1)+ " foi baixado")
                } catch (error) {
                    console.log(error)
                }
            });
            if(index == req.params.quant){
                res.end('Imagens baixadas')
                break;
            }
    }
});

app.listen('3333')