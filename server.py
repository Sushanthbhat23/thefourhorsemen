from flask import Flask, request, jsonify
from deep_translator import GoogleTranslator

app = Flask(__name__)

@app.route('/translate', methods=['POST'])
def translate_text():
    try:
        texts = request.json.get('texts', [])
        if not texts:
            raise ValueError("No text provided for translation")
        
        translator = GoogleTranslator(source='auto', target='hi')
        translated_texts = [translator.translate(text) for text in texts]
        
        return jsonify({
            "status": "success",
            "translations": translated_texts
        })
    
    except Exception as e:
        print(f"Error in translation: {str(e)}")
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)


