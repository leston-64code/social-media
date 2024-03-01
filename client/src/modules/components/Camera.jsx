import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';

const Camera = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const webcamRef = useRef(null);

  useEffect(() => {
    // Fetch the available media devices (cameras)
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setDevices(videoDevices);
      // Automatically select the first available camera
      if (videoDevices.length > 0) {
        setSelectedDeviceId(videoDevices[0].deviceId);
      }
    });
  }, []);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
  };

  const handleDeviceChange = (event) => {
    setSelectedDeviceId(event.target.value);
  };

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ deviceId: selectedDeviceId }}
        mirrored={true}
      />
      <button onClick={capture}>Capture</button>
      <select value={selectedDeviceId} onChange={handleDeviceChange}>
        {devices.map(device => (
          <option key={device.deviceId} value={device.deviceId}>{device.label}</option>
        ))}
      </select>
    </>
  );
};

export default Camera;
