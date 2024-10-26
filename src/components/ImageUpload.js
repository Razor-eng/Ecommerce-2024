import { ImageIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRef, useState } from "react";

const ImageUpload = ({ isPending, title, setImage, image, initialImage = null }) => {
    const inputRef = useRef(null);
    const [viewImage, setViewImage] = useState(initialImage);

    const handleImageChange = (e) => {
        setViewImage(null);
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    }

    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center gap-x-5">
                {viewImage ? (
                    <div className="size-[72px] relative rounded-md overflow-hidden">
                        <Image
                            src={viewImage}
                            alt="Image"
                            height={1000}
                            width={1000}
                            className="object-cover"
                            priority={true}
                            blurDataURL="/orders.png"
                        />
                    </div>
                ) : (
                    image ? (
                        <div className="size-[72px] relative rounded-md overflow-hidden">
                            <Image
                                src={image ? URL.createObjectURL(image) : image}
                                alt="Image"
                                height={1000}
                                width={1000}
                                className="object-cover"
                                priority={true}
                                blurDataURL="/orders.png"
                            />
                        </div>
                    ) : (
                        <Avatar className="size-[72px] rounded-md">
                            <AvatarFallback className="rounded-md">
                                <ImageIcon className="size-[36px] text-neutral-400" />
                            </AvatarFallback>
                        </Avatar>
                    )
                )}
                <div className="flex flex-col">
                    <p className="text-sm">{title}</p>
                    <p className="text-xs font-semibold text-muted-foreground">
                        JPG, PNG, SVG OR JPEG, max 1mb
                    </p>
                    <input
                        type="file"
                        className="hidden"
                        accept=".jpg, .png, .jpeg, .svg"
                        ref={inputRef}
                        onChange={handleImageChange}
                        disabled={isPending}
                    />
                    {viewImage ? (
                        <Button
                            type="button"
                            disabled={isPending}
                            variant={"destructive"}
                            size={"xs"}
                            className="w-fit mt-2"
                            onClick={() => {
                                setViewImage(null)
                            }}
                        >
                            Remove Image
                        </Button>
                    ) : (
                        image ? (
                            <Button
                                type="button"
                                disabled={isPending}
                                variant={"destructive"}
                                size={"xs"}
                                className="w-fit mt-2"
                                onClick={() => {
                                    setImage(null)
                                }}
                            >
                                Remove Image
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                disabled={isPending}
                                variant={"teritary"}
                                size={"xs"}
                                className="w-fit mt-2"
                                onClick={() => inputRef.current?.click()}
                            >
                                Upload Image
                            </Button>
                        )
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default ImageUpload