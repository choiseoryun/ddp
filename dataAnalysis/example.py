import json
import pandas as pd
import json
import FinanceDataReader as fdr
from datetime import datetime, timedelta

def update_stock_info(file_path):
    # 기존 JSON 파일 읽기
    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)

    # 예측 결과에 주식 정보 추가
    for prediction in data:  # 'predictions' 키를 제거
        symbol = prediction['symbol']

        # 현재 날짜와 10일 전 날짜 계산
        end_date = datetime.now()
        start_date = end_date - timedelta(days=10)

        # FinanceDataReader를 사용하여 주식 데이터 가져오기
        df = fdr.DataReader(symbol, start_date.strftime('%Y-%m-%d'), end_date.strftime('%Y-%m-%d'))

        if not df.empty:
            latest_data = df.iloc[-1]
            previous_data = df.iloc[0]

            # 주식 정보 업데이트
            prediction.update({
                'currentPrice': f"{latest_data['Close']:,.0f}",
                'priceChange': f"{latest_data['Close'] - previous_data['Close']:,.0f}",
                'percentageChange': f"{((latest_data['Close'] - previous_data['Close']) / previous_data['Close'] * 100):.2f}%",
                'previousClose': f"{previous_data['Close']:,.0f}",
                'highPrice': f"{latest_data['High']:,.0f}",
                'lowPrice': f"{latest_data['Low']:,.0f}",
                'openPrice': f"{latest_data['Open']:,.0f}",
                'upperLimit': f"{latest_data['High'] * 1.3:,.0f}",
                'lowerLimit': f"{latest_data['Low'] * 0.7:,.0f}"
            })

    # 업데이트된 데이터를 JSON 파일로 저장
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=2)

    print(f"데이터가 {file_path}에 업데이트되었습니다.")

# JSON 파일 불러오기
file_path = './drive/stock_predictions_1114.json'
with open(file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)

# 조건에 맞는 데이터 필터링
filtered_data = [
    {
        'symbol': pred['symbol'],
        'company_name': pred['company_name'],
        'current_price': pred['current_price'],
        'predicted_price': pred['predicted_price'],
        'price_change_pct': pred['price_change_pct'],
        'direction': pred['direction'],
        'PER': pred['indicators']['PER'],
        'ROA': pred['indicators']['ROA'],
        'ROE': pred['indicators']['ROE'],
        'DY': pred['indicators']['DY'],
        'MACD': pred['indicators']['MACD'],
        'Bollinger': pred['indicators']['Bollinger'],
        'RSI_signal': pred['indicators']['RSI']['signal']
    }
    for pred in data['predictions']
    if (
        # 1. MACD, Bollinger, RSI 중 최소 하나가 매수이고 매도는 하나도 없어야 함
        ('매수' in [pred['indicators']['MACD'], pred['indicators']['Bollinger'], pred['indicators']['RSI']['signal']] and
         '매도' not in [pred['indicators']['MACD'], pred['indicators']['Bollinger'], pred['indicators']['RSI']['signal']]) and

        # 2. ROE > 0.1, ROA > 0.05, DY > 0.02 중 하나 이상 달성
        sum([
            pred['indicators']['ROE'] > 0.1,
            pred['indicators']['ROA'] > 0.05,
            pred['indicators']['DY'] > 0.02
        ]) >= 1 and

        # 기존 조건 유지
        pred['direction'] != '하락'
    )
]


# DataFrame 생성 및 상위 10개 선택
df = pd.DataFrame(filtered_data)
df = df.drop('PER', axis=1)
df = df[df['price_change_pct'] <= 0.3].sort_values('price_change_pct')
df = df.sort_values('price_change_pct', ascending=False).head(10)

# JSON으로 저장
json_data = df.to_json(orient='records')
output_file_path = './drive/filtered_stock_predictions.json'
with open(output_file_path, 'w', encoding='utf-8') as file:
    file.write(json_data)

print(f"데이터가 {output_file_path}에 저장되었습니다.")



file_path = './drive/filtered_stock_predictions.json'
update_stock_info(file_path)

import FinanceDataReader as fdr
import pandas as pd
import mplfinance as mpf
from datetime import datetime, timedelta
import matplotlib.pyplot as plt
from matplotlib.lines import Line2D
import numpy as np
import json
import os

# JSON file path
file_path = './drive/filtered_stock_predictions.json'
save_dir = './drive/images'

# Create save directory if it does not exist
os.makedirs(save_dir, exist_ok=True)

# Load JSON file
with open(file_path, 'r', encoding='utf-8') as f:
    stock_data = json.load(f)

# Set date range (1 year from today)
end_date = datetime.now()
start_date = end_date - timedelta(days=365)

# Function to plot stock chart
def plot_stock_chart(symbol, company_name, graph_num):
    # Fetch stock data
    df = fdr.DataReader(symbol, start_date, end_date)

    # Calculate moving averages
    df['MA5'] = df['Close'].rolling(window=5).mean()
    df['MA20'] = df['Close'].rolling(window=20).mean()
    df['MA60'] = df['Close'].rolling(window=60).mean()
    df['MA120'] = df['Close'].rolling(window=120).mean()

    # Calculate Bollinger Bands (20-day, 3 standard deviations)
    df['BB_middle'] = df['Close'].rolling(window=20).mean()
    df['BB_std'] = df['Close'].rolling(window=20).std()
    df['BB_upper'] = df['BB_middle'] + 3 * df['BB_std']
    df['BB_lower'] = df['BB_middle'] - 3 * df['BB_std']

    # Select last month of data
    last_month = df.last('30D')

    # Set candlestick chart style
    mc = mpf.make_marketcolors(up='#ff3333', down='#3333ff', inherit=True)
    s = mpf.make_mpf_style(marketcolors=mc)

    # Define colors for moving averages and Bollinger Bands
    line_colors = {
        'MA5': 'purple', 'MA20': 'orange', 'MA60': 'green', 'MA120': 'brown',
        'BB_upper': 'yellow', 'BB_lower': 'yellow'
    }

    # Set up additional plots for moving averages and Bollinger Bands
    add_plots = [
        mpf.make_addplot(last_month[ma], color=color, width=0.5)
        for ma, color in line_colors.items() if ma.startswith('MA')
    ] + [
        mpf.make_addplot(last_month['BB_upper'], color='yellow', width=0.5),
        mpf.make_addplot(last_month['BB_lower'], color='yellow', width=0.5)
    ]

    # Set fill area between Bollinger Bands
    fill_between = dict(y1=last_month['BB_lower'].values, y2=last_month['BB_upper'].values, color='yellow', alpha=0.1)

    # Plot candlestick chart
    fig, axes = mpf.plot(last_month, type='candle', style=s,
                         addplot=add_plots, volume=True, figsize=(12, 8),
                         returnfig=True, panel_ratios=(3,1), fill_between=fill_between)

    # Manually create legend
    legend_elements = [
        Line2D([0], [0], color=color, lw=0.5, label=ma.replace('MA', 'Moving Average '))
        for ma, color in line_colors.items() if ma.startswith('MA')
    ] + [Line2D([0], [0], color='yellow', lw=0.5, label='Bollinger Bands (3σ)')]

    # Add legend
    axes[0].legend(handles=legend_elements, loc='upper left')

    # Save the chart to file
    save_path = os.path.join(save_dir, f'graph{graph_num}.png')
    plt.savefig(save_path, format='png', dpi=300)


# Plot and save charts for the top 10 stocks
for i, stock in enumerate(stock_data[:10]):  # 'predictions' 키를 사용
    symbol = stock["symbol"]
    company_name = stock["company_name"]
    plot_stock_chart(symbol, company_name, i + 1)

