import { CardHead } from "@/components/layout/manageAdmin/cardHead"
import { FormAdd } from "./form"


export const AddAdmin = () => {
    return(
        <section className="bg-primary-50">
            <div className="container mx-auto">
                <div className="flex flex-col gap-10">
                <CardHead
                title="Tambah Admin"
                desc="Tambah data admin baru disini."
                ></CardHead>
                <FormAdd></FormAdd>
                </div>
            </div>
        </section>
    )
}