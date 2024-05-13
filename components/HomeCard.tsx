'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';

// Interface HomeCardProps mô tả các props mà component HomeCard nhận vào.
interface HomeCardProps {
  className?: string; // Class name để tùy chỉnh CSS
  img: string; // URL của hình ảnh
  title: string; // Tiêu đề của thẻ
  description: string; // Mô tả của thẻ
  handleClick?: () => void; // Hàm xử lý sự kiện click (tùy chọn)
}

// Component HomeCard hiển thị một thẻ trên trang chính.
const HomeCard = ({ className, img, title, description, handleClick }: HomeCardProps) => {
  return (
    <section
      // Sử dụng hàm cn để kết hợp class name từ props và các class name cố định
      className={cn(
        'bg-orange-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer',
        className
      )}
      onClick={handleClick} // Gọi hàm xử lý sự kiện click nếu được cung cấp
    >
      {/* Phần hình ảnh */}
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <Image src={img} alt="meeting" width={27} height={27} />
      </div>
      
      {/* Phần tiêu đề và mô tả */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </section>
  );
};

export default HomeCard;
