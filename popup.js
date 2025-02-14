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
      return data;
    } else {
      throw new Error('Failed to get response from server');
    }
  } catch (error) {
    console.error('Error in fetching data:', error);
    throw error;
  }
}

function displaySummary(summaryPoints) {
  const container = document.getElementById('summary-container');
  const status = document.getElementById('status');
  const copyBtn = document.getElementById('copyBtn');
  
  // Clear previous content
  container.innerHTML = '';
  
  // Display each summary point
  summaryPoints.forEach((point, index) => {
    const pointElement = document.createElement('div');
    pointElement.className = 'summary-point';
    pointElement.textContent = `${index + 1}. ${point}`;
    container.appendChild(pointElement);
  });
  
  // Update status and show copy button
  status.textContent = 'Summary generated successfully!';
  copyBtn.style.display = 'block';
}

function displayError(message) {
  const container = document.getElementById('summary-container');
  const status = document.getElementById('status');
  
  status.textContent = 'Error occurred';
  
  const errorElement = document.createElement('div');
  errorElement.className = 'error';
  errorElement.textContent = message;
  container.appendChild(errorElement);
}

async function sendUrlToServer() {
  const status = document.getElementById('status');
  
  try {
    // Get current tab URL
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentUrl = tabs[0].url;
    
    status.textContent = 'Analyzing terms and conditions...';
    
    const response = await getSummary(currentUrl);
    if (response && response.summary) {
      // Use the summary array directly
      displaySummary(response.summary);
    }
  } catch (error) {
    displayError(error.message);
  }
}

// Add copy functionality
document.getElementById('copyBtn').addEventListener('click', () => {
  const summaryText = Array.from(document.querySelectorAll('.summary-point'))
    .map(el => el.textContent)
    .join('\n\n');
  
  navigator.clipboard.writeText(summaryText)
    .then(() => {
      const copyBtn = document.getElementById('copyBtn');
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = 'Copy Summary';
      }, 2000);
    });
});

// Initialize when popup opens
document.addEventListener('DOMContentLoaded', sendUrlToServer);
