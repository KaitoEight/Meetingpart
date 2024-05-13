'use client';
import { useEffect, useState } from 'react';
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';

import Alert from './Alert';
import { Button } from './ui/button';

// Component MeetingSetup
const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void; // Callback function để đặt trạng thái hoàn thành thiết lập
}) => {
  // Lấy các hooks từ useCallStateHooks để xử lý trạng thái của cuộc gọi
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date(); // Kiểm tra nếu thời gian cuộc gọi chưa đến
  const callHasEnded = !!callEndedAt; // Kiểm tra nếu cuộc gọi đã kết thúc

  // Sử dụng hook useCall để lấy thông tin về cuộc gọi
  const call = useCall();

  // Nếu không có cuộc gọi, thông báo lỗi
  if (!call) {
    throw new Error(
      'useStreamCall must be used within a StreamCall component.',
    );
  }

  // Sử dụng state để lưu trạng thái mic và camera
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  // Sử dụng useEffect để cập nhật trạng thái mic và camera khi thay đổi
  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggled, call.camera, call.microphone]);

  // Nếu thời gian cuộc gọi chưa đến, hiển thị thông báo
  if (callTimeNotArrived)
    return (
      <Alert
        title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
      />
    );

  // Nếu cuộc gọi đã kết thúc, hiển thị thông báo
  if (callHasEnded)
    return (
      <Alert
        title="The call has been ended by the host"
        iconUrl="/icons/call-ended.svg"
      />
    );

  // Nếu không nằm trong các trường hợp trên, hiển thị giao diện thiết lập cuộc gọi
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-center text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        {/* Checkbox để bật/tắt mic và camera */}
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        {/* Cài đặt thiết bị */}
        <DeviceSettings />
      </div>
      {/* Nút để tham gia cuộc gọi */}
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join(); // Tham gia cuộc gọi
          setIsSetupComplete(true); // Đặt trạng thái hoàn thành thiết lập thành true
        }}
      >
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
