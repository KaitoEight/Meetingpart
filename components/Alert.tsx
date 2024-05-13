import Link from 'next/link';
import Image from 'next/image';

import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface PermissionCardProps {
  title: string; // Tiêu đề của thẻ cảnh báo
  iconUrl?: string; // URL của biểu tượng (tùy chọn)
}

// Component Alert nhận vào các props và hiển thị một thẻ cảnh báo trên màn hình.
const Alert = ({ title, iconUrl }: PermissionCardProps) => {
  return (
    <section className="flex-center h-screen w-full">
      {/* Thẻ Card được sử dụng để bao bọc nội dung chính của component */}
      <Card className="w-full max-w-[520px] border-none bg-dark-1 p-6 py-9 text-white">
        <CardContent>
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-3.5">
              {/* Nếu tồn tại iconUrl, hiển thị biểu tượng */}
              {iconUrl && (
                <div className="flex-center">
                  {/* Sử dụng thẻ Image từ thư viện Next.js để hiển thị hình ảnh */}
                  <Image src={iconUrl} width={72} height={72} alt="icon" />
                </div>
              )}
              {/* Hiển thị tiêu đề */}
              <p className="text-center text-xl font-semibold">{title}</p>
            </div>

            {/* Nút "Back to Home" dẫn đến trang chủ */}
            <Button asChild className="bg-blue-1">
              {/* Sử dụng thẻ Link từ thư viện Next.js để điều hướng đến trang chủ */}
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Alert;
