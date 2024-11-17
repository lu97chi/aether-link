export class BluetoothService {
    private device: BluetoothDevice | null = null;
    private server: BluetoothRemoteGATTServer | null = null;
    private serviceUUID: string = '12510e72-8093-4883-9400-61cdd138449e'; // Replace with your service UUID
    private characteristicUUID: string = '1e94fdf0-2a4c-4864-b257-e9d4141f1803'; // Replace with your characteristic UUID
    private characteristic: BluetoothRemoteGATTCharacteristic | null = null;
  
    public async connect(): Promise<void> {
      try {
        this.device = await navigator.bluetooth.requestDevice({
          filters: [{ services: [this.serviceUUID] }],
        });
  
        this.server = await this.device.gatt?.connect() || null;
  
        const service = await this.server?.getPrimaryService(this.serviceUUID);
        this.characteristic = await service?.getCharacteristic(this.characteristicUUID) || null;
  
        // Start receiving notifications
        await this.characteristic?.startNotifications();
        this.characteristic?.addEventListener('characteristicvaluechanged', this.handleNotifications.bind(this));
  
        console.log('Connected to Bluetooth device');
      } catch (error) {
        console.error('Bluetooth connection failed', error);
      }
    }
  
    public disconnect(): void {
      if (this.device) {
        this.device.gatt?.disconnect();
        this.device = null;
        console.log('Bluetooth device disconnected');
      }
    }
  
    public async sendMessage(message: string): Promise<void> {
      if (!this.characteristic) {
        console.error('No characteristic available to send message');
        return;
      }
  
      const encoder = new TextEncoder();
      const data = encoder.encode(message);
      await this.characteristic.writeValue(data);
      console.log('Message sent:', message);
    }
  
    private handleNotifications(event: Event): void {
      const target = event.target as BluetoothRemoteGATTCharacteristic;
      const value = target.value;
  
      if (value) {
        const decoder = new TextDecoder();
        const message = decoder.decode(value);
        console.log('Received message:', message);
        // Handle the received message as needed
      }
    }
  }
  