from flask import Flask, request, jsonify
from flask_cors import CORS  # To handle cross-origin requests

# Set up Flask app and enable CORS
app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from the extension

@app.route('/summarize', methods=['POST'])
def summarize_url():
    # Get the URL from the request data
    url = request.json.get('url')
    print(f"Received URL: {url}")  # Log the URL for debugging

    # Example: You could summarize or process the URL here
    # (for now, we'll return a mock response)
    summary = f"This is a mock summary of the URL: {url}"
    print(url)
    # Send back a response (summary or other data)
    return jsonify({"message": "Server is working", "url_received": url, "summary": summary})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
