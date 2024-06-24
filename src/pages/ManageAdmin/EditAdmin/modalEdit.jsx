import Edit from "@/assets/ImgModal/Ilustrasi-edit.svg";
import { AlertConfirm } from "@/components/features/alert/alertConfirm";

export const ModalEdit = () => {
  return (
    <div>
      <AlertConfirm
        textBtn="Modal Edit"
        img={Edit}
        title="Edit Admin?"
        desc="Sebelum mengedit admin, pastikan informasi yang dimasukkan benar
        dan sesuai. Apakah Anda yakin ingin mengedit data ini?"
        textDialogCancel="Periksa Kembali"
        textDialogSubmit="Simpan"
      ></AlertConfirm>
    </div>
  );
};
