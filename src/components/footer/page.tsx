import Link from "next/link";

export function Footer (){
    return (
        <section className="py-10 bg-indigo-600 text-white">
            <div className="container mx-auto flex items-center justify-between">
                <h4 className="uppercase font-semibold">Simple code academy</h4>
                <div className="flex flex-col gap-4 font-semibold">
                    <Link href="">Үйлчилгээний нөхцөл</Link>
                    <Link href="">Нууцлалын бодлого</Link>
                </div>
            </div>
        </section>
    )
}