
import Add from "@/assets/ImgModal/Ilustrasi-add.svg";
import { AlertConfirm } from "@/components/features/alert/alertConfirm";

export const ModalAdd = () => {
  return (
    <div>
      <AlertConfirm
        textBtn="Modal Add"
        img={Add}
        title="Tambah Admin?"
        desc="Sebelum menambahkan admin, pastikan informasi yang dimasukkan
        benar dan sesuai. Apakah Anda yakin ingin menambahkan data ini?"
        textDialogCancel="Batal"
        textDialogSubmit="Tambah"
      ></AlertConfirm>
    </div>
  );
};
