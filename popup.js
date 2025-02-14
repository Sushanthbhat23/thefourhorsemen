async function getSummary(url) {
  try {
    const response = await fetch('http://localhost:5000/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: url })
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Received response:", data);
      return data;
    } else {
      console.error('Failed to get response from server');
      return null;
    }
  } catch (error) {
    console.error('Error in fetching data:', error);
    return null;
  }
}

async function sendUrlToServer() {
  chrome.tabs.query({ active: true, currentWindow: true }, async function(tabs) {
    const currentUrl = tabs[0].url;
    console.log('Current URL:', currentUrl);

    const response = await getSummary(currentUrl);

    if (response) {
      console.log("Server response:", response);
    } else {
      console.log("Failed to fetch data from server.");
    }
  });
}

sendUrlToServer();
