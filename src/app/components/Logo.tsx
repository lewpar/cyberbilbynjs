import Image from 'next/image';

export default function Logo() {
    return (
        <a href="/" className="flex flex-col gap-1 items-center">
        <Image 
            src="/images/bilby.png" 
            width={128} height={128} 
            alt="CyberBilby Logo"
        />
        <span className="text-white text-xl">Cyber Bilby</span>
    </a>
    );
}