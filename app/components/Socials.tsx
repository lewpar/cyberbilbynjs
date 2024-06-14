import Image from 'next/image';

export default function Socials() {
    return (
        <div>
            <div>
                <a href="https://github.com/lewpar/" className="flex flex-row gap-1 bg-white p-1 rounded-3xl">
                    <Image 
                        src="/images/github-mark.png" 
                        width={20} height={20} 
                        alt="GitHub Profile"
                    />
                </a>
            </div>
        </div>
    );
}