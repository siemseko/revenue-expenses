'use client';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import { useState, useEffect, ReactNode } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { usePathname } from 'next/navigation'
import { FaRegUser, FaSearch } from 'react-icons/fa';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineVideoLibrary } from 'react-icons/md';
import { GoGraph } from 'react-icons/go';
interface MyComponentProps {
  children: ReactNode;
}
const Sidebar: React.FC<MyComponentProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const pathname = usePathname()
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <Transition
        show={isOpen || isDesktop}
        enter="transition ease-out duration-300"
        enterFrom="-translate-x-full opacity-0"
        enterTo="translate-x-0 opacity-100"
        leave="transition ease-in duration-300"
        leaveFrom="translate-x-0 opacity-100"
        leaveTo="-translate-x-full opacity-0"
      >
        <div className={`fixed inset-y-0 left-0 w-64 bg-white border-dashed border-r-2 border-gray-300 z-50 transform md:translate-x-0 ${isOpen ? '' : '-translate-x-full'} md:block`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 bg-white text-[#000]">
              <h1 className="text-lg font-semibold">ប្រព័ន្ធកក់ត្រាចំណាយ&ចំណូល</h1>
              <button onClick={() => setIsOpen(false)} className="md:hidden">
                <FiX size={24} />
              </button>
            </div>
            <nav className="flex-grow">
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/" className={`flex items-center space-x-2 px-4 py-2 bg-[#cbcbcb2f] mx-5 rounded-xl`}>
                    <div className='flex items-center gap-3'>
                      <img src="/images/seko.jpg" width={37} className='rounded-full' alt="" />
                      <div>
                        <div className='text-[#000000be] font-bold'>SIEM Seko</div>
                        <div className='text-[#00000027]'>Admin</div>
                      </div>
                    </div>
                  </Link>
                </li>
                <div className='px-2 pt-5 text-[#000000be] font-bold'>ផ្ទាំងគ្រប់គ្រង</div>
                <li>
                  <Link href="/" className={`flex items-center space-x-2 mx-5 rounded-md px-6 py-3 hover:bg-gray-300 ${pathname === '/' ? 'bg-[#d6f1e4] text-[#00ab55] font-bold' : ''}`}>
                    <span className='flex items-center gap-2' onClick={() => setIsOpen(false)} ><IoHomeOutline />ទំព័រដើម</span>
                  </Link>
                </li>
                <li>
                  <Link href="/about" className={`flex items-center space-x-2 mx-5 rounded-md  px-6 py-3 hover:bg-gray-300 ${pathname === '/about' ? 'bg-[#d6f1e4] text-[#00ab55] font-bold' : ''}`}>
                    <span className='flex items-center gap-2' onClick={() => setIsOpen(false)} ><GoGraph />របាយការណ៍</span>
                  </Link>
                </li>
                <div className='px-2 pt-5 text-[#000000be] font-bold'>គ្រប់គ្រងប្រព័ន្ធ</div>
                <li>
                  <Link href="/manage-user" className={`flex items-center space-x-2 mx-5 rounded-md  px-6 py-3 hover:bg-gray-300 ${pathname === '/manage-user'? 'bg-[#d6f1e4] text-[#00ab55] font-bold' : ''}`}>
                    <span className='flex items-center gap-2' onClick={() => setIsOpen(false)} ><FaRegUser />អ្នកប្រើប្រាស់</span>
                  </Link>
                </li>
                <li>
                  <Link href="/video" className={`flex items-center space-x-2 mx-5 rounded-md  px-6 py-3 hover:bg-gray-300 ${pathname === '/video'? 'bg-[#d6f1e4] text-[#00ab55] font-bold' : ''}`}>
                    <span className='flex items-center gap-2' onClick={() => setIsOpen(false)} ><MdOutlineVideoLibrary />វីដេអូ</span>
                  </Link>
                </li>
                <li>
                  <Link href="/manage-user" className={`flex items-center space-x-2 mx-5 rounded-md  px-6 py-3 hover:bg-gray-300 ${pathname === '/manag'? 'bg-[#d6f1e4] text-[#00ab55] font-bold' : ''}`}>
                    <span className='flex items-center gap-2' onClick={() => setIsOpen(false)} ><IoSettingsOutline />ការកំណត់</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </Transition>
      {/* Main Content */}
      <div className={`flex-grow bg-gray-100 ${isDesktop ? 'md:pl-[250px]' : ''}`}>
        <header className="flex items-center justify-between px-10 py-4 bg-white ">
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FiMenu size={24} />
          </button>
          <div className='hidden md:block'><FaSearch /></div>
          <div className='flex items-center gap-5'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Cambodia.svg/1200px-Flag_of_Cambodia.svg.png" width={30} className='rounded-sm' alt="" />
            <img src="/images/seko.jpg" width={37} className='rounded-full' alt="" />
          </div>
        </header>
        <main className='container mx-auto h-screen' onClick={() => setIsOpen(false)} >
          <div className='px-5'>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
export default Sidebar;