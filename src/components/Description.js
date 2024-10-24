import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const modules = {
    toolbar: {
        container: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ size: ['extra-small', 'small', 'medium', 'large'] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
            [{ color: [] }, { background: [] }],
            ['clean'],
        ],
    },
};

export default function Description({ data, handleData }) {
    const handleChange = (value) => {
        handleData('longDescription', value);
    };

    return (
        <div className="max-h-60 min-h-40 overflow-y-scroll overflow-x-hidden border [&::-webkit-scrollbar]:w-[2px]">
            <ReactQuill
                theme="snow"
                value={data?.longDescription}
                onChange={handleChange}
                modules={modules}
                placeholder="Enter your description here..."
                className="h-full"
            />
        </div>
    );
}