import ApplicationLogo from '@/Components/ApplicationLogo';
import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';
import { Newspaper, Phone, Users } from 'lucide-react';
import { PropsWithChildren } from 'react';

const menus = [
    {
        name: "Home",
        link: "/"
    },
    {
        name: "Catering Harian",
        link: "/catering-harian"
    },
    {
        name: "Budgeting Sendiri",
        link: "/budgeting-sendiri"
    },
    {
        name: "Donate",
        link: "/donasi"
    },
    {
        name: "Happy Food",
        link: "/happy-food"
    },
]

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col items-center">
            <div className="w-full my-6 px-20">
                <div className='grid grid-cols-4 items-center rounded-full bg-[#cee1e3]'>
                    <div className='flex items-center px-4'>
                        <img src="/images/logo2.png" alt="Logo" className='w-[35px] h-[35px]' />
                        <h1 className='font-semibold text-[#159b9e]'>Catering Cedak Kene</h1>
                    </div>
                    <div className='col-span-2 flex items-center justify-center'>
                        {
                            menus.map((menu: any) => (
                                <Button asChild className='text-[#159b9e] bg-transparent rounded-full hover:bg-transparent hover:text-white'>
                                    <Link href={menu.link}>{menu.name}</Link>
                                </Button>
                            ))
                        }
                    </div>
                    <div className='flex justify-end items-center'>
                        <div className="flex gap-2 bg-[#159b9e] rounded-full">
                            <Button variant="ghost" asChild className='text-black hover:bg-transparent hover:text-white'>
                                <Link href='/news'>
                                    <Newspaper />
                                </Link>
                            </Button>
                            <Button variant="ghost" asChild className='text-black hover:bg-transparent hover:text-white'>
                                <Link href='/informasi'>
                                    <Users />
                                </Link>
                            </Button>
                            <Button variant="ghost" asChild className='text-black hover:bg-transparent hover:text-white'>
                                <Link href='/kontak'>
                                    <Phone />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
}
