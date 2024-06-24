import PhosLink from "../components/PhosLink";

export default function Author() {
    return (
        <>
            <div>Author Page</div>
            <PhosLink
                text="Create Post"
                href="/author/create"
                icon=""
            />
        </>
    );
}