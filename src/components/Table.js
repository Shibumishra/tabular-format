import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Api = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=51AAPKLWCVW8YVDP'

const Table = () => {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState([]);

    useEffect(() => {
        async function getResults() {
            try {
                const response = await axios.get(Api);
                const data = response.data["Time Series (5min)"]
                for (var key in data) {
                    result.push({
                        dateTime: key,
                        open: data[key]['1. open'],
                        high: data[key]['2. high'],
                        low: data[key]['3. low'],
                        close: data[key]['4. close'],
                        volume: data[key]['5. volume'],
                    })
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        getResults()
    }, [])


    if (loading) {
        return (
            <main>
                <div>Loading...</div>
            </main>
        );
    }


    console.log(result)

    return (
        <div>
            <table className="fixed_headers">
                <thead>
                    <tr>
                        <th>Date Time</th>
                        <th>Open</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Close</th>
                        <th>Volume</th>
                    </tr>
                </thead>
                <tbody>
                    {result.length && result?.slice(0, 100).map((item, key) => (
                        <tr key={key}>
                            <td>{(item.dateTime)}</td>
                            <td>{item.open}</td>
                            <td>{item.high}</td>
                            <td>{item.low}</td>
                            <td>{item.close}</td>
                            <td>{item.volume}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;