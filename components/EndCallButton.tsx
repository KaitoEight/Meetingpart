'use client';

import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';

import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

// Component EndCallButton dùng để kết thúc cuộc gọi cho tất cả mọi người.
const EndCallButton = () => {
  // Sử dụng hook useCall để lấy thông tin về cuộc gọi hiện tại.
  const call = useCall();
  const router = useRouter();

  // Nếu không có cuộc gọi, throw một lỗi.
  if (!call)
    throw new Error(
      'useStreamCall must be used within a StreamCall component.',
    );

  // Sử dụng hook useCallStateHooks để lấy thông tin về người tham gia cục bộ.
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  // Kiểm tra xem người tham gia là chủ cuộc họp hay không.
  const isMeetingOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  // Nếu không phải là chủ cuộc họp, không hiển thị nút kết thúc cuộc gọi.
  if (!isMeetingOwner) return null;

  // Hàm endCall để kết thúc cuộc gọi và điều hướng người dùng đến trang chủ.
  const endCall = async () => {
    await call.endCall();
    router.push('/');
  };

  return (
    // Nút kết thúc cuộc gọi
    <Button onClick={endCall} className="bg-red-500">
      End call for everyone
    </Button>
  );
};

export default EndCallButton;
