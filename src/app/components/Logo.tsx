import Image from 'next/image';

export default function Logo({ width, height }: { width: number, height: number }) {
    return (
        <a href="/" className="flex flex-col gap-1 items-center justify-center p-4">
            <Image 
                src="/images/bilby.png" 
                width={width} height={height} 
                alt="CyberBilby Logo"
            />
        </a>
    );
}