import { CardHead } from "@/components/layout/manageAdmin/cardHead"
import { FormAdd } from "./form"
import SideBar from "@/components/layout/sidebar"
import HeaderAdmin from "@/components/layout/header"
import { FormAddAdmin } from "./formAdd"


export const AddAdmin = () => {
    return(
        <main className="bg-neutral-50">
            <HeaderAdmin></HeaderAdmin>
            <SideBar></SideBar>
            <section className="bg-primary-50 sm:ml-[240px] mt-[80px] rounded-t-2xl" 
            style={{minHeight: "calc(100vh - 80px)"}}
            >
            <div className="container mx-auto " >
                <div className="flex flex-col gap-10 py-6 " >
                <CardHead
                title="Tambah Admin"
                desc="Tambah data admin baru disini."
                ></CardHead>
                <FormAddAdmin></FormAddAdmin>
                </div>
            </div>
        </section>
        </main>
    )
}