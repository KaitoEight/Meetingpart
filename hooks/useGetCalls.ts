import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

// Tùy chỉnh hook để lấy thông tin về các cuộc gọi
export const useGetCalls = () => {
  // Sử dụng hook của Clerk để lấy thông tin người dùng
  const { user } = useUser();
  // Sử dụng client của Stream để thực hiện truy vấn
  const client = useStreamVideoClient();

  // Trạng thái danh sách cuộc gọi và trạng thái tải
  const [calls, setCalls] = useState<Call[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Hàm để tải danh sách cuộc gọi
    const loadCalls = async () => {
      // Kiểm tra xem client và user có tồn tại hay không
      if (!client || !user?.id) return;
      
      // Đặt trạng thái isLoading thành true khi bắt đầu tải
      setIsLoading(true);

      try {
        // Truy vấn danh sách cuộc gọi dựa trên ID của người dùng
        const { calls } = await client.queryCalls({
          sort: [{ field: 'starts_at', direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user.id },
              { members: { $in: [user.id] } },
            ],
          },
        });

        // Thiết lập danh sách cuộc gọi và kết thúc quá trình tải
        setCalls(calls);
      } catch (error) {
        console.error(error);
      } finally {
        // Đặt trạng thái isLoading thành false sau khi tải xong
        setIsLoading(false);
      }
    };

    // Gọi hàm tải cuộc gọi khi có thay đổi trong client hoặc user
    loadCalls();
  }, [client, user?.id]);

  // Lọc các cuộc gọi đã kết thúc và cuộc gọi sắp tới
  const now = new Date();

  const endedCalls = calls?.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt;
  });

  const upcomingCalls = calls?.filter(({ state: { startsAt } }: Call) => {
    return startsAt && new Date(startsAt) > now;
  });

  // Trả về danh sách cuộc gọi đã kết thúc, cuộc gọi sắp tới, và trạng thái tải
  return { endedCalls, upcomingCalls, callRecordings: calls, isLoading };
};
