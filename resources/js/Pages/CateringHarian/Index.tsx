import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { NavigationMenuDemo } from '../../Components/NavigationMenuDemo';
import { BoxIcon, DollarSign } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from "@/Components/ui/card"
import GuestLayout from '@/Layouts/GuestLayout';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/ui/carousel"
import React from 'react';
import Autoplay from 'embla-carousel-autoplay';

const menus = [
    {
        name: "Ayam Goreng",
        harga: 10000,
        image: "/images/ayam-goreng.png"
    },
    {
        name: "Ayam Geprek",
        harga: 12000,
        image: "/images/ayam-geprek.png"
    },
    {
        name: "Tempe",
        harga: 2000,
        image: "/images/tempe.png"
    },
    {
        name: "Tahu",
        harga: 2000,
        image: "/images/tahu.png"
    },
    {
        name: "Lele Goreng",
        harga: 9000,
        image: "/images/lele-goreng.png"
    },
    {
        name: "Nasi Putih",
        harga: 3000,
        image: "/images/nasi-putih.png"
    },
    {
        name: "Telur Goreng",
        harga: 9000,
        image: "/images/telur-goreng.png"
    },
];

export default function Index({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: false })
    )

    return (
        <GuestLayout>
            <Head title="Catering Harian" />
            <div className='grid grid-cols-2 gap-8 mx-20'>
                <div className='flex flex-col gap-4 justify-center'>
                    <h1 className='text-5xl font-extrabold'>
                        Catering <span className='text-[#159b9e]'>Harian</span>
                    </h1>
                    <p className='text-2xl mb-4'>
                        Kamu langsung dapat paket makan 2 kali sehari,dalam seminggu, dengan menu yang sudah disediakan oleh catering cedak kene.
                    </p>
                    <div className='flex items-center justify-center mb-4'>
                        <div className='w-[250px] h-[250px] bg-[#d6ebeb] rounded-2xl flex justify-center items-center'>
                            <img src="/ayam-geprek.png" alt="Ayam Geprek" />
                        </div>
                        <div className='w-[250px] h-[250px] bg-[#f46146] rounded-2xl flex justify-center items-center -ml-8 z-10'>
                            <img src="/ayam-goreng.png" alt="Ayam Goreng" />
                        </div>
                        <div className='w-[250px] h-[250px] bg-[#d6ebeb] rounded-2xl flex justify-center items-center -ml-8'>
                            <img src="/lele-goreng.png" alt="Lele Goreng" />
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <Button size='lg' className='rounded-full bg-[#14a637] hover:bg-[#14a636d4] text-white' asChild><Link href="/catering-harian/form">Order Sekarang</Link></Button>
                        <Button
                            size="lg"
                            className="rounded-full border-2 border-[#f46146] text-[#f46146] hover:bg-[#f46146] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#f46146]"
                            variant="outline"
                            asChild
                        >
                            <Link href='/budgeting-sendiri'>
                                Lihat Menu
                            </Link>
                        </Button>
                    </div>
                </div>
                <div>
                    <Carousel
                        plugins={[plugin.current]}
                        className="w-full"
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                    >
                        <CarouselContent>
                            {menus.map((menu: any, index) => (
                                <CarouselItem key={index}>
                                    <div className="p-1 w-full h-full overflow-hidden">
                                        <img src={menu.image} alt={menu.name}
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </GuestLayout>
    );
}
