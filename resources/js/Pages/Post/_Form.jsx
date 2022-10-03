import { useForm } from "@inertiajs/inertia-react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextAreaInput from "@/Components/TextAreaInput";

export default function PostForm(props) {
    // Cek apakah kita melakukan create atau edit
    const isEditing = props.post ? true : false; // Boolean(props.post)

    // Untuk create inisialisasi data dilakukan manual, untuk
    // edit inisialisasi data dilakukan dengan mengambil
    // data barang dati controller
    const { data, setData, errors, processing, submit } = useForm(
        isEditing
            ? props.post
            : {
                judul: "",
                konten: "",
            }
    );

    function onSubmit(e) {
        e.preventDefault();

        // Untuk create kita menggunakan route store, sedangkan
        // untuk edit kita menggunakan route update
        const submitUrl = isEditing
            ? route("post.update", props.post.id)
            : route("post.store");

        // Untuk create kita lakukan post request, sedangkan
        // untuk edit kita lakukan patch request
        submit(isEditing ? "patch" : "post", submitUrl);
    }

    return (
        <form onSubmit={onSubmit} className="space-y-3">
            <div>
                <InputLabel forInput="judul" value="Judul Post" />
                <TextInput
                    type="text"
                    name="judul"
                    value={data.judul}
                    className="mt-1 block w-full"
                    isFocused={true}
                    handleChange={(e) => setData("judul", e.target.value)}
                />
                <InputError message={errors.judul} className="mt-2" />
            </div>

            <div>
                <InputLabel forInput="konten" value="Konten Post" />
                <TextAreaInput
                    name="konten"
                    value={data.konten}
                    className="mt-1 block w-full"
                    handleChange={(e) => setData("konten", e.target.value)}
                />
                <InputError message={errors.konten} className="mt-2" />
            </div>

            <div className="flex items-center justify-end mt-4">
                <PrimaryButton processing={processing}>simpan</PrimaryButton>
            </div>
        </form>
    );
}
