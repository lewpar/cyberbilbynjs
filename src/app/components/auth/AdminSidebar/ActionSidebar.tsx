import UserDetails from "../UserDetails";
import Actions from "./Actions";

export default function ActionSidebar() {
    return (
        <div className={`flex flex-col text-white bg-slate-800 rounded-sm`}>
            <UserDetails/>
            <Actions/>
        </div>
    );
}