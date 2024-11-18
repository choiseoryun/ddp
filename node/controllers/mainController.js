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
  predictData = data;
  res.send(updateDate)
}

const detailPage = async(req, res) =>{
  const response = await axios.get('http://127.0.0.1:5000/predict');
  const predictData = response.data.predictions
  const param = req.params.id
  let detail = -1;
  console.log(param)
  for (i = 0; i<=10 ;i++){
    console.log("durl")
    console.log(predictData[i].company_name)
    if (param == predictData[i].company_name){
      detail = i;
      break;
    }
  }
  console.log(__dirname); 
  const detailData = predictData[detail]
  res.json({  
    symbol: detailData.symbol,
    currentPrice: detailData.currentPrice,
    priceChange: detailData.priceChange,
    percentageChange: detailData.percentageChange,
    previousClose: detailData.previousClose,
    highPrice: detailData.highPrice,
    lowPrice: detailData.lowPrice,
    openPrice: detailData.openPrice,
    transactionAmount: "",
    upperLimit: detailData.upperLimit,
    lowerLimit: detailData.lowerLimit,
    imagePath: `http://localhost:3002/images/graph${detail+1}.png`,
  });
}

module.exports = { mainPage, detailPage }