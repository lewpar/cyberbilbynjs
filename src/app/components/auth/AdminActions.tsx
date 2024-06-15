import { RouteButton } from "../Buttons";

export default function AdminActions() {
    return (
        <div className="flex flex-col border-2 p-4 items-center">
            <div className="font-bold">
                Administration Actions
            </div>
            <RouteButton 
                text="Create Post"
                href="/author/create"
                icon="ph ph-note-pencil"
            />
        </div>
    );
}