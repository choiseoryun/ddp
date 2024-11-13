const mainPage = (req, res) => {
    console.log("df")
    res.status(200).json({
        "model_performance": {
          "rmse": {
            "train": 18686.74596102065,
            "test": 18787.48771856197
          },
          "mape": {
            "train": 0.1769700945896798,
            "test": 0.18429671283457422
          },
          "direction_accuracy": {
            "train": 0.6534802999390583,
            "test": 0.6573760067825349
          }
        },
        "predictions": [
          {
            "symbol": "005930",
            "company_name": "삼성전자",
            "current_price": 53000.0,
            "predicted_price": 77486.6123770416,
            "price_change_pct": 0.4620115542838038,
            "direction": "상승",
            "indicators": {
              "PER": 0.0,
              "ROA": 0.0,
              "ROE": 0.0,
              "DY": 0.0,
              "MACD": "매도",
              "Bollinger": "매수",
              "RSI": {
                "value": 29.530201342281885,
                "signal": "매수"
              }
            }
          },
          {
            "symbol": "000660",
            "company_name": "SK하이닉스",
            "current_price": 185800.0,
            "predicted_price": 194427.17832994476,
            "price_change_pct": 0.04643260672736683,
            "direction": "상승",
            "indicators": {
              "PER": 0.0,
              "ROA": 0.0,
              "ROE": 0.0,
              "DY": 0.0,
              "MACD": "매도",
              "Bollinger": "중립",
              "RSI": {
                "value": 42.47787610619469,
                "signal": "중립"
              }
            }
          },
          {
            "symbol": "373220",
            "company_name": "LG에너지솔루션",
            "current_price": 427000.0,
            "predicted_price": 382070.65320903633,
            "price_change_pct": -0.10522095267204606,
            "direction": "하락",
            "indicators": {
              "PER": 8.7714,
              "ROA": 0.01327,
              "ROE": 0.031489998,
              "DY": 0.0,
              "MACD": "매수",
              "Bollinger": "중립",
              "RSI": {
                "value": 59.44881889763779,
                "signal": "중립"
              }
            }
          },
          {
            "symbol": "207940",
            "company_name": "삼성바이오로직스",
            "current_price": 987000.0,
            "predicted_price": 838539.2338461538,
            "price_change_pct": -0.15041617644766583,
            "direction": "하락",
            "indicators": {
              "PER": 3.2367,
              "ROA": 0.051659998,
              "ROE": 0.104729995,
              "DY": 0.0,
              "MACD": "매도",
              "Bollinger": "중립",
              "RSI": {
                "value": 32.85714285714286,
                "signal": "중립"
              }
            }
          },
          {
            "symbol": "005380",
            "company_name": "현대차",
            "current_price": 207000.0,
            "predicted_price": 204999.5913189039,
            "price_change_pct": -0.009663810053604355,
            "direction": "중립",
            "indicators": {
              "PER": 0.6604,
              "ROA": 0.03258,
              "ROE": 0.13385999,
              "DY": 0.0682,
              "MACD": "매도",
              "Bollinger": "중립",
              "RSI": {
                "value": 21.186440677966104,
                "signal": "매수"
              }
            }
          },
          {
            "symbol": "005935",
            "company_name": "삼성전자우",
            "current_price": 44750.0,
            "predicted_price": 71101.30334707725,
            "price_change_pct": 0.58885594071681,
            "direction": "상승",
            "indicators": {
              "PER": 0.1619,
              "ROA": 0.03841,
              "ROE": 0.088120006,
              "DY": 0.031400003,
              "MACD": "매도",
              "Bollinger": "매수",
              "RSI": {
                "value": 23.47417840375587,
                "signal": "매수"
              }
            }
          },
          {
            "symbol": "035420",
            "company_name": "NAVER",
            "current_price": 181400.0,
            "predicted_price": 181175.11351450544,
            "price_change_pct": -0.0012397270424176232,
            "direction": "중립",
            "indicators": {
              "PER": 1.17,
              "ROA": 0.029860001,
              "ROE": 0.06352,
              "DY": 0.0068,
              "MACD": "매수",
              "Bollinger": "중립",
              "RSI": {
                "value": 60.93366093366093,
                "signal": "중립"
              }
            }
          },
          {
            "symbol": "012330",
            "company_name": "현대모비스",
            "current_price": 255500.0,
            "predicted_price": 239175.50559005124,
            "price_change_pct": -0.06389234602719672,
            "direction": "하락",
            "indicators": {
              "PER": 0.1112,
              "ROA": 0.02471,
              "ROE": 0.08537,
              "DY": 0.0177,
              "MACD": "매도",
              "Bollinger": "중립",
              "RSI": {
                "value": 59.57446808510638,
                "signal": "중립"
              }
            }
          },
          {
            "symbol": "051910",
            "company_name": "LG화학",
            "current_price": 305500.0,
            "predicted_price": 279621.9495213372,
            "price_change_pct": -0.08470720287614655,
            "direction": "하락",
            "indicators": {
              "PER": 0.3859,
              "ROA": 0.01079,
              "ROE": 0.02557,
              "DY": 0.0115,
              "MACD": "매도",
              "Bollinger": "중립",
              "RSI": {
                "value": 39.20454545454545,
                "signal": "중립"
              }
            }
          },
          {
            "symbol": "006400",
            "company_name": "삼성SDI",
            "current_price": 264500.0,
            "predicted_price": 261163.0923382648,
            "price_change_pct": -0.01261590798387598,
            "direction": "중립",
            "indicators": {
              "PER": 12.3848,
              "ROA": 0.023,
              "ROE": 0.08595,
              "DY": 0.0036000002,
              "MACD": "매도",
              "Bollinger": "매수",
              "RSI": {
                "value": 26.334519572953738,
                "signal": "매수"
              }
            }
          }
        ]
      });
}

module.exports = { mainPage }