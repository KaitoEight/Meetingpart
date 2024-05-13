"use client";
import { ReactNode } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Image from "next/image";

// Interface MeetingModalProps mô tả các props mà component MeetingModal nhận vào.
interface MeetingModalProps {
  isOpen: boolean; // Biến đánh dấu trạng thái mở/closed của modal
  onClose: () => void; // Hàm được gọi khi modal đóng
  title: string; // Tiêu đề của modal
  className?: string; // Class name để tùy chỉnh CSS
  children?: ReactNode; // Nội dung bên trong modal
  handleClick?: () => void; // Hàm xử lý sự kiện click cho nút
  buttonText?: string; // Text cho nút (tùy chọn)
  instantMeeting?: boolean; // Biến đánh dấu nếu là cuộc họp tức thì
  image?: string; // URL của hình ảnh (tùy chọn)
  buttonClassName?: string; // Class name để tùy chỉnh CSS của nút (tùy chọn)
  buttonIcon?: string; // URL của biểu tượng cho nút (tùy chọn)
}

// Component MeetingModal hiển thị một modal cho cuộc họp.
const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,
  instantMeeting,
  image,
  buttonClassName,
  buttonIcon,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
          {/* Hiển thị hình ảnh (nếu có) */}
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="checked" width={72} height={72} />
            </div>
          )}
          {/* Tiêu đề của modal */}
          <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>
            {title}
          </h1>
          {/* Nội dung bên trong modal */}
          {children}
          {/* Nút để bắt đầu cuộc họp hoặc lập kế hoạch */}
          <Button
            className={
              "bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"
            }
            onClick={handleClick}
          >
            {/* Biểu tượng cho nút (nếu có) */}
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="button icon"
                width={13}
                height={13}
              />
            )}{" "}
            &nbsp;
            {buttonText || "Schedule Meeting"} {/* Text cho nút (mặc định là "Schedule Meeting") */}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
