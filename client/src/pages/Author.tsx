import AuthorLayout from "../components/layout/AuthorLayout";
import PhosLink from "../components/PhosLink";

export default function Author() {
    return (
        <AuthorLayout>
            <div>Author Page</div>
            <PhosLink
                text="Create Post"
                href="/author/create"
                icon=""
            />
        </AuthorLayout>
    );
}