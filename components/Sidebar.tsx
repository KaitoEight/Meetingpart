'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col  justify-between  bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6">
      <>
  {sidebarLinks.map((item) => {
    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);

    return (
      <div key={item.label}>
        {item.label === "Note" ? (
          <Link
            href="http://:3001/organization/org_2g4mq3PD5c0vJ556CswZpXc5LWx"
            className={cn(
              'flex gap-4 items-center p-4 rounded-lg justify-start',
            )}
          >
            <Image
              src='/icons/notebook.svg'
              className='bg-white'
              alt='note'
              width={24}
              height={24}
            />
            <p className="text-lg font-semibold max-lg:hidden">
              Note
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
    );
  })}
</>

      </div>
    </section>
  );
};

export default Sidebar;
