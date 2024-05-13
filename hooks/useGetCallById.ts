import { useEffect, useState } from 'react';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

// Tùy chỉnh hook để lấy cuộc gọi bằng ID
export const useGetCallById = (id: string | string[]) => {
  // Trạng thái của cuộc gọi và trạng thái tải
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);

  // Sử dụng client của Stream để thực hiện truy vấn
  const client = useStreamVideoClient();

  useEffect(() => {
    // Kiểm tra xem client có tồn tại hay không
    if (!client) return;
    
    // Hàm để tải cuộc gọi
    const loadCall = async () => {
      try {
        // Truy vấn cuộc gọi bằng ID
        const { calls } = await client.queryCalls({ filter_conditions: { id } });

        // Nếu có cuộc gọi trả về, thiết lập cuộc gọi đầu tiên
        if (calls.length > 0) setCall(calls[0]);

        // Đã tải xong, đặt trạng thái isLoading thành false
        setIsCallLoading(false);
      } catch (error) {
        console.error(error);
        // Nếu có lỗi, cũng đặt trạng thái isLoading thành false
        setIsCallLoading(false);
      }
    };

    // Gọi hàm tải cuộc gọi khi có thay đổi trong client hoặc ID
    loadCall();
  }, [client, id]);

  // Trả về cuộc gọi và trạng thái tải
  return { call, isCallLoading };
};
