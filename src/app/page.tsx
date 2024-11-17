"use client"
import React, { useEffect, useState } from 'react';
import { BluetoothService } from '../utils/bluetoothService';

const HomePage: React.FC = () => {
  const [bluetoothService, setBluetoothService] = useState<BluetoothService | null>(null);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const service = new BluetoothService();
    setBluetoothService(service);

    return () => {
      service.disconnect();
    };
  }, []);

  const handleConnect = async () => {
    if (bluetoothService) {
      await bluetoothService.connect();
    }
  };

  const handleSendMessage = async () => {
    if (bluetoothService) {
      await bluetoothService.sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Bluetooth PWA</h1>
      <button onClick={handleConnect}>Connect to Raspberry Pi</button>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
          placeholder="Enter message"
        />
        <button onClick={handleSendMessage} disabled={!message}>
          Send Message
        </button>
      </div>
    </div>
  );
};

export default HomePage;
