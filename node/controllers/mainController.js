const axios = require('axios');

let predictData = null;

const mainPage = async(req, res) => {
  const response = await axios.get('http://127.0.0.1:5000/predict');
  const data = response.data.predictions
  const updateDate = data.map(item=>{
    return {
    name: item.company_name,           
    currentPrice: item.currentPrice,       
    expectedReturn: item.predicted_price,
    roe: item.ROE,           
    per: item.PER,      
    macdSignal: item.MACD,        
    bollingerStatus: item.Bollinger, 
    volume: "item.volume",  
    dividendYield: item.DY}
  })
  predictData = updateDate;
  res.send(predictData)
}

const detailPage = async(req, res) =>{
  console.log(req.params)
  const param = req.params.id
  let detail = -1;
  console.log(param)
  for (i = 0; i<=10 ;i++){
    console.log("durl")
    console.log(predictData[i].name)
    if (param == predictData[i].name){
      detail = i+1;
      break;
    }
  }
  res.json({ imagePath: `../../dataAnalysis/image/myimage${detail}.jpg` });
}

module.exports = { mainPage, detailPage }