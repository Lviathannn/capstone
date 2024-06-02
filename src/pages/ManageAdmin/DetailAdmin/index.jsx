import { CardDetail } from "./cardDetail";
import { FormDetail } from "./formDetail";


export const DetailAdmin  = () => {
    return (
        <section className="py-10 bg-primary-50">
            <div className="container mx-auto ">
                <div className="flex flex-col gap-10 ">
                <CardDetail></CardDetail>
                <FormDetail></FormDetail>
                </div>
            </div>
        </section>
    );
}