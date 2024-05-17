from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/process_video', methods=['POST'])
def process_video():
    try:
        frame_data = request.data
        # Here you would process the video frame data and return the processed frame
        # For now, let's just echo back the received data
        return jsonify({'processedFrame': frame_data.decode('utf-8')})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
