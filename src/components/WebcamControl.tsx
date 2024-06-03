// src/components/WebcamControl.tsx
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";


const WebcamControl: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [isWebcamOn, setIsWebcamOn] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  

  const handleStart = () => {
    setIsWebcamOn(true);
    console.log("help");
  };

  const handleStop = () => {
    setIsWebcamOn(false);
    setCapturedImage(null); // Clear the captured image when webcam stops
  };

  const handleCapture = async () => {
    console.log("please work");
    const imageSrc = webcamRef.current?.getScreenshot();
    console.log("hererreererere");
    if (imageSrc) {
      const image = new Image();
      image.src = imageSrc;
      console.log("did i get here");
      image.onload = () => {
        // Run face detection on the captured image
        console.log("running face detect");
        runFaceDetect(image);
      };
    }
  };

 
  const runFaceDetect = async (image: HTMLImageElement) => {
    const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
    const detectorConfig: faceLandmarksDetection.MediaPipeFaceMeshTfjsModelConfig = {
      runtime: 'tfjs', // Using 'tfjs' runtime
      refineLandmarks: true, // Optional but recommended
    };
    const detector = await faceLandmarksDetection.createDetector(model, detectorConfig);
    console.log("ran face detect, running detect");
    detect(detector, image);
  };

  const detect = async (detector: faceLandmarksDetection.FaceLandmarksDetector, image: HTMLImageElement) => {
    const predictions = await detector.estimateFaces(image); // Pass the captured image
    if (predictions.length) {
      console.log("here");
      console.log(predictions);
    }
  };

  return (
    <div>
      <h2>Webcam Control</h2>
      {isWebcamOn && (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width="100%"
          videoConstraints={{ facingMode: 'user' }}
        />
      )}
      <div className="button-container">
        {!isWebcamOn ? (
          <button onClick={handleStart}>Start Webcam</button>
        ) : (
          <>
            <button onClick={handleStop}>Stop Webcam</button>
            <button onClick={handleCapture}>Capture Image</button>
          </>
        )}
      </div>
      {capturedImage && (
        <div>
          <h3>Captured Image</h3>
          <img src={capturedImage} alt="Captured" />
        </div>
      )}
    </div>
  );
};

export default WebcamControl;
