import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PostForm from "./_Form";
export default function PostEdit(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Post
                </h2>
            }
        >
            <div className="py-12">
                <div className="bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <PostForm post={props.post} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
