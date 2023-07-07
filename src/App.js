import React from "react";
import "./App.css";
import ReactJson from 'react-json-view'; // Import the react-json-view

function App() {
  const [data, setData] = React.useState(null);

  const URL = 'https://young-palpable-star.solana-mainnet.discover.quiknode.pro/d3587e7029006fee1c6d79bb3fed098a82493298';

  React.useEffect(() => {
    fetch("/get_token")
      .then((res) => {
        const clonedRes = res.clone();
        clonedRes.json().then(body => console.log('THE JWT RESPONSE BODY IS:', JSON.stringify(body)));
        return res.json();
      }) // Removed logging statements for clarity
      .then((t) => {

        fetch(URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${t.token}`
          },
          body: JSON.stringify({
            method: "getTransaction",
            params: ["b1zNg2YcUosH1s3r7Bi8NpoPyyyJw9ZUakeTWVCbaama6ZNWv43xaxwCNoeCHCJH5YF4B3vi75i8P4WqwqF5q6b", "jsonParsed"],
            id: 1,
            jsonrpc: "2.0"
          })
        }).then(res => {

          const clonedRes = res.clone();

          // Parse the cloned response and log it
          clonedRes.json().then(body => console.log('THE RESPONSE BODY IS:', JSON.stringify(body)));

          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        }).then(content => {
          setData(content.result);
        }).catch(error => {
          console.error('Error:', error);
        });

      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>JWT enabled JSON-RPC call to quicknode sol rpc server. Transaction Details:</p>
      </header>
      <body>
      {!data ? <p>Loading...</p> :
        <ReactJson
          src={data}
          theme="twilight"
          style={{textAlign: "left"}}
          className="json-viewer"
        />
      }
      </body>
    </div>
  );
}

export default App;
