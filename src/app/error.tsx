"use client";

export default function Error() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center gap-4 p-8">
            <p className="font-bold text-9xl text-slate-900">500</p>
            <p className="text-xl text-center">Whoops. It looks like an internal error occured.</p>
        </div>
    );
}