from flask import Flask, request, jsonify
from flask_cors import CORS
from terms_parser import setup_nltk, parse_terms_and_conditions

# Set up Flask app and enable CORS
app = Flask(__name__)
CORS(app)

# Initialize NLTK when server starts
setup_nltk()

@app.route('/summarize', methods=['POST'])
def summarize_url():
    try:
        # Get the URL from the request data
        url = request.json.get('url')
        if not url:
            raise ValueError("No URL provided")
            
        print(f"Processing URL: {url}")  # Debug log
        
        # Use the terms parser to get the summary
        summary = parse_terms_and_conditions(url)
        
        # Ensure summary is a list and has content
        if not summary:
            return jsonify({
                "status": "error",
                "message": "No content found to summarize"
            }), 404
            
        if not isinstance(summary, list):
            summary = [summary]
            
        print(f"Generated {len(summary)} summary points")  # Debug log
        
        return jsonify({
            "status": "success",
            "url_received": url,
            "summary": summary
        })
        
    except Exception as e:
        print(f"Error processing request: {str(e)}")  # Debug log
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
