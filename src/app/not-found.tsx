export default function NotFoundPage() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center gap-4 p-8">
            <p className="font-bold text-9xl text-slate-900">404</p>
            <p className="text-xl text-center">Whoops. It looks like the resource you requested does not exist.</p>
            <div className="flex flex-row gap-1">
                <p>How about visiting the</p>
                <a href="/" className="text-blue-500">Home</a>
                <p>page instead?</p>
            </div>
        </div>
    );
}