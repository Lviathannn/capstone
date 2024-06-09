
import Delete from "@/assets/ImgModal/Ilustrasi-delete.svg";
import { AlertConfirm } from "@/components/layout/manageAdmin/alertConfirm";

export const ModalDelete = () => {
  return (
    <div>
      <AlertConfirm
        textBtn="Modal Delete"
        img={Delete}
        title="Hapus Admin?"
        desc="Anda akan menghapus admin ini. Tindakan ini tidak dapat
        dibatalkan. Apakah Anda yakin ingin menghapus data ini?"
        textDialogCancel="Batal"
        textDialogSubmit="Hapus"
        bgBtn="True"
      ></AlertConfirm>
    </div>
  );
};
