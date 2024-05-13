'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useOrganization, useOrganizationList } from "@clerk/nextjs"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';

// Component MobileNav
const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      {/* Bảng điều hướng di động */}
      <Sheet>
        {/* Nút kích hoạt để mở bảng điều hướng */}
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            width={36}
            height={36}
            alt="biểu tượng hamburger"
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        {/* Nội dung bảng điều hướng */}
        <SheetContent side="left" className="border-none bg-dark-1">
          {/* Logo và tiêu đề */}
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/icons/logo.svg"
              width={32}
              height={32}
              alt="logo notecommeet"
            />
            <p className="text-[26px] font-extrabold text-white">Notecomeet</p>
          </Link>
          {/* Các liên kết điều hướng */}
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            {/* Nút đóng cho bảng điều hướng */}
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-6 pt-16 text-white">
                {/* Lặp qua các liên kết thanh bên */}
                {sidebarLinks.map((item) => {
                  const isActive = pathname === item.route;

                  return (
                    <SheetClose asChild key={item.route}>
                      <div key={item.label}>
                        {/* Hiển thị liên kết dựa trên loại mục */}
                        {item.label === "Note" ? (
                          <Link 
                          // Để href trống có gì chỉnh sau
                            href=""
                            className={cn(
                              'flex gap-4 items-center p-4 rounded-lg justify-start',
                            )}
                          >
                            <Image
                              src='/icons/notebook.svg'
                              className='bg-white'
                              alt='ghi chú'
                              width={24}
                              height={24}
                            />
                            <p className="text-lg font-semibold max-lg:hidden">
                              Ghi chú
                            </p>
                          </Link>
                        ) : item.route ? (
                          <Link
                            href={item.route}
                            className={cn(
                              'flex gap-4 items-center p-4 rounded-lg justify-start',
                              {
                                'bg-blue-1': isActive,
                              }
                            )}
                          >
                            <Image
                              src={item.imgURL}
                              alt={item.label}
                              width={24}
                              height={24}
                            />
                            <p className="text-lg font-semibold max-lg:hidden">
                              {item.label}
                            </p>
                          </Link>
                        ) : (
                          <div
                            className={cn(
                              'flex gap-4 items-center p-4 rounded-lg justify-start',
                              {
                                'bg-blue-1': isActive,
                              }
                            )}
                          >
                            <Image
                              src={item.imgURL}
                              alt={item.label}
                              width={24}
                              height={24}
                            />
                            <p className="text-lg font-semibold max-lg:hidden">
                              {item.label}
                            </p>
                          </div>
                        )}
                      </div>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
