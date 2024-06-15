export default function ActionHeader({ text }: { text: string }) {
    return (
        <div className="text-gray-400 bg-slate-800 px-4 pt-4">
        {text}
        </div>
    );
}