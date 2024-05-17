import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";

export const Project = () => {
  const [processedFrame, setProcessedFrame] = useState(null);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
/*   useEffect(() => {
    const captureAndProcessFrame = async () => {
      try {
        const videoBlob = new Blob([videoRef.current.src], { type: videoRef.current.type });
        const response = await fetch('http://localhost:5000/api/process_video', {
          method: 'POST',
          body: videoBlob,
        });
    
        if (response.ok) {
          const processedFrameBlob = await response.blob();
          const url = URL.createObjectURL(processedFrameBlob);
          setProcessedFrame(url);
          console.log(url); // Print the URL to verify
        } else {
          setError('Failed to process video: ' + response.statusText);
        }
      } catch (error) {
        setError('Error processing video: ' + error.message);
      }
    }; 
    

    const intervalId = setInterval(captureAndProcessFrame, 10000);

    return () => clearInterval(intervalId);
  }, []);*/
  useEffect(() => {
    const getVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError("Webcam erişiminde bir hata oluştu: " + err.message);
      }
    };

    getVideoStream();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        let tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <Container className="About-header">
      <Row className="mb-5 mt-3 pt-md-3">
        <Col lg="8">
          <h1 className="display-4 mb-4">Projects</h1>
          <hr className="t_border my-4 ml-0 text-left" />
        </Col>
      </Row>
      <Row className="sec_sp">
        <h1 className="display-4 mb-4"></h1>
        <Col lg="7" className="d-flex align-items-center">
          <div>
            <video ref={videoRef} autoPlay style={{ display: 'block', width: '100%' }} />
            {error && <Alert variant="danger">{error}</Alert>}
            {processedFrame && <video src={processedFrame} autoPlay controls style={{ display: 'block', width: '100%' }} />}
          </div>
        </Col>
      </Row>
      <Row className="sec_sp">
        <h2>Emotion Detection</h2>
        <Col>
          <pre>
            <code>
              {`
import cv2
from deepface import DeepFace

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    rgb_frame = cv2.cvtColor(gray_frame, cv2.COLOR_GRAY2RGB)
    faces = face_cascade.detectMultiScale(gray_frame, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    for (x, y, w, h) in faces:
        face_roi = rgb_frame[y:y + h, x:x + w]
        result = DeepFace.analyze(face_roi, actions=['emotion'], enforce_detection=False)
        emotion = result[0]['dominant_emotion']
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 2)
        cv2.putText(frame, emotion, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)

    cv2.imshow('Real-time Emotion Detection', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
cap.release()
cv2.destroyAllWindows()
              `}
            </code>
          </pre>
          <p>This script captures video from the webcam and uses the DeepFace library to detect and display the dominant emotion on each detected face in real-time.</p>
        </Col>
      </Row>
      <Row className="sec_sp">
        <h2>Face and Eye Detection</h2>
        <Col>
          <pre>
            <code>
              {`
from __future__ import print_function
import cv2

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eyes_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye_tree_eyeglasses.xml')
capture = cv2.VideoCapture(0)

while True:
    _, frame = capture.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)
    for (x, y, w, h) in faces:
        cv2.ellipse(frame, ((x+(w//2), y+(h//2))), (w//2, (h//2)+15), 0, 0, 360, (0, 0, 0), 1)
        face_roi = gray[y:y+h, x:x+w]
        eyes = eyes_cascade.detectMultiScale(face_roi)
        for (ex, ey, ew, eh) in eyes:
            cv2.ellipse(frame, (x+(ex+ew//2), y+(ey+eh//2)), (30, 25), 0, 0, 360, (0, 0, 0), 1)
    cv2.imshow('Face and Eye Recognition', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

capture.release()
cv2.destroyAllWindows()
              `}
            </code>
          </pre>
          <p>This script detects faces and eyes from the webcam feed and draws ellipses around them in real-time using OpenCV.</p>
        </Col>
      </Row>
      <Row className="sec_sp">
        <h2>General Object Detection</h2>
        <Col>
          <pre>
            <code>
              {`
import torch
from PIL import Image, ImageDraw, ImageFont
import torchvision.transforms as transforms
import numpy as np
import cv2
import json
import requests
import matplotlib.pyplot as plt
import warnings
warnings.filterwarnings('ignore')

device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
print(f'Using {device} for inference')

efficientnet = torch.hub.load('NVIDIA/DeepLearningExamples:torchhub', 'nvidia_efficientnet_b0', pretrained=True)
utils = torch.hub.load('NVIDIA/DeepLearningExamples:torchhub', 'nvidia_convnets_processing_utils')

efficientnet.eval().to(device)

with open("imagenet_classes.json") as f:
    class_labels = json.load(f)

def preprocess_frame(frame):
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    frame = cv2.resize(frame, (256, 256))
    frame = Image.fromarray(frame)
    transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    frame = transform(frame)
    return frame.unsqueeze(0).to(device)

capture = cv2.VideoCapture(0)

while True:
    _, frame = capture.read()
    input_tensor = preprocess_frame(frame)

    with torch.no_grad():
        output = efficientnet(input_tensor)

    top_probs, top_labels = torch.topk(torch.nn.functional.softmax(output, dim=1), 5, 1)
    top_probs = top_probs.squeeze().tolist()
    top_labels = top_labels.squeeze().tolist()
    class_names = [class_labels[str(label)] for label in top_labels]

    print("Top predictions:")
    for prob, label in zip(top_probs, class_names):
        print(f"Class: {label}, Probability: {prob:.4f}")

    img_pil = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    draw = ImageDraw.Draw(img_pil)
    font = ImageFont.truetype("arial.ttf", 35)

    label = f"Class: {class_names[0]}, Probability: {top_probs[0]:.4f}"
    draw.text((15, 15), label, fill="red", font=font)

    frame_with_bb = cv2.cvtColor(np.array(img_pil), cv2.COLOR_RGB2BGR)
    cv2.imshow('Camera Feed', frame_with_bb)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

capture.release()
cv2.destroyAllWindows()
              `}
            </code>
          </pre>
          <p>This script uses EfficientNet for real-time object detection from the webcam feed, displaying the top predictions with their probabilities.</p>
        </Col>
      </Row>
      <Row className="sec_sp">
        <h2>Hand Tracking</h2>
        <Col>
          <pre>
            <code>
              {`
import cv2
import time
import mediapipe as mp

class handDetector():
    def __init__(self, mode=False, maxHands=2, modelC=1, detectionCon=0.5, trackCon=0.5):
        self.mode = mode
        self.maxHands = maxHands
        self.modelC = modelC
        self.detectionCon = detectionCon
        self.trackCon = trackCon

        self.mpHands = mp.solutions.hands
        self.hands = self.mpHands.Hands(self.mode, self.maxHands, self.modelC, self.detectionCon, self.trackCon)
        self.mpDraw = mp.solutions.drawing_utils

    def findHands(self, img, draw=True):
        imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        self.result = self.hands.process(imgRGB)

        if self.result.multi_hand_landmarks:
            for handLand in self.result.multi_hand_landmarks:
                if draw:
                    self.mpDraw.draw_landmarks(img, handLand, self.mpHands.HAND_CONNECTIONS)

        return img

    def findPosition(self, img, handNo=0, draw=True):
        PosList = []
        if self.result.multi_hand_landmarks:
            myHand = self.result.multi_hand_landmarks[handNo]
            for id, lm in enumerate(myHand.landmark):
                h, w, c = img.shape
                cx, cy = int(lm.x * w), int(lm.y * h)
                PosList.append([id, cx, cy])

                if draw:
                    cv2.circle(img, (cx, cy), 10, (255, 255, 255), cv2.FILLED)

        return PosList

def main():
    pTime = 0
    cTime = 0
    cap = cv2.VideoCapture(0)
    detector = handDetector()

    while True:
        success, img = cap.read()
        img = detector.findHands(img)
        PosList = detector.findPosition(img)

        if len(PosList) != 0:
            print(PosList[4])

        cTime = time.time()
        fps = 1 / (cTime - pTime)
        pTime = cTime

        cv2.putText(img, str(int(fps)), (10, 70), cv2.FONT_HERSHEY_DUPLEX, 3, (255, 0, 0), 3)

        cv2.imshow("Webcam", img)
        cv2.waitKey(1)

if __name__ == "__main__":
    main()
              `}
            </code>
          </pre>
          <p>This script uses the Mediapipe library to track hands in real-time from the webcam feed, drawing landmarks and calculating FPS.</p>
        </Col>
      </Row>
      <Row className="sec_sp">
        <h2>Basic Face Detection</h2>
        <Col>
          <pre>
            <code>
              {`
from __future__ import print_function
import cv2 
import time

def detectAndDisplay(frame):
    frame_gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    frame_gray = cv2.equalizeHist(frame_gray)

    face = face_classifier.detectMultiScale(frame_gray)
    for (x, y, w, h) in face:
        cv2.rectangle(frame_gray, (x, y), (x + w, y + h), (0, 255, 0), 4)
def detect_bounding_box(vid):
    gray_image = cv2.cvtColor(vid, cv2.COLOR_BGR2GRAY)
    faces = face_classifier.detectMultiScale(gray_image, 1.1, 5, minSize=(40, 40))
    for (x, y, w, h) in faces:
        cv2.rectangle(vid, (x, y), (x + w, y + h), (0, 255, 0), 4)
    return faces

face_classifier = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)

pTime = 0
cTime = 0
cap = cv2.VideoCapture(0)

while True:
    result, video_frame = cap.read() 
    if result is False:
        break  
    faces = detect_bounding_box(video_frame) 

    cv2.imshow("My Face Detection Project", video_frame) 

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()
              `}
            </code>
          </pre>
          <p>This script performs basic face detection using OpenCV's Haar Cascade classifier and displays the detected faces in real-time.</p>
        </Col>
      </Row>
    </Container>
  );
};
